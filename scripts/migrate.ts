/**
 * Разовая миграция данных из TS-файлов в Sanity.
 *
 * Запускать НА ВАШЕЙ машине (нужен интернет к api.sanity.io):
 *   1) создайте .env.local с NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *      SANITY_API_TOKEN (см. инструкцию);
 *   2) npm run migrate
 *
 * Скрипт идемпотентный: повторный запуск перезапишет документы (createOrReplace),
 * но каждый раз заново загружает картинки — не гоняйте его без нужды.
 */
import fs from "node:fs";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";
import { catalog, productPathSegments } from "../lib/catalog";
import { products } from "../lib/products";

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Нет NEXT_PUBLIC_SANITY_PROJECT_ID или SANITY_API_TOKEN в .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const key = (...parts: (string | number)[]) =>
  parts.join("-").replace(/[^a-zA-Z0-9_-]/g, "");

async function main() {
  // 1) Сегменты
  console.log("→ Сегменты…");
  for (let i = 0; i < catalog.length; i++) {
    const seg = catalog[i];
    await client.createOrReplace({
      _id: `segment.${seg.slug}`,
      _type: "segment",
      title: seg.title,
      slug: { _type: "slug", current: seg.slug },
      order: i,
      promoTitle: seg.promo?.title,
    });
  }

  // 2) Подкатегории (агрегируем сегменты и группу)
  console.log("→ Подкатегории…");
  type SubAgg = {
    title: string;
    group: string;
    segments: Set<string>;
  };
  const subs = new Map<string, SubAgg>();
  for (const seg of catalog) {
    for (const group of seg.groups) {
      for (const link of group.links) {
        const parts = productPathSegments(link.slug);
        const subSlug = parts[parts.length - 1];
        const agg = subs.get(subSlug) ?? {
          title: link.title,
          group: group.title,
          segments: new Set<string>(),
        };
        agg.segments.add(seg.slug);
        subs.set(subSlug, agg);
      }
    }
  }
  for (const [subSlug, agg] of subs) {
    await client.createOrReplace({
      _id: `subcategory.${subSlug}`,
      _type: "subcategory",
      title: agg.title,
      slug: { _type: "slug", current: subSlug },
      group: agg.group,
      segments: [...agg.segments].map((s) => ({
        _type: "reference",
        _ref: `segment.${s}`,
        _key: key("seg", s),
      })),
    });
  }

  // 3) Товары (+ загрузка фото)
  console.log("→ Товары и фото…");
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const folder = p.listing[p.listing.length - 1];
    const dir = path.join(process.cwd(), "public", "products", folder);

    // собрать файлы <model>.jpg, <model>1..5.jpg
    const gallery: Array<Record<string, unknown>> = [];
    const candidates = [
      `${p.model}.jpg`,
      ...Array.from({ length: 5 }, (_, n) => `${p.model}${n + 1}.jpg`),
    ];
    for (const file of candidates) {
      const fp = path.join(dir, file);
      if (!fs.existsSync(fp)) continue;
      const asset = await client.assets.upload("image", fs.createReadStream(fp), {
        filename: file,
      });
      gallery.push({
        _type: "image",
        _key: key(p.model, file),
        asset: { _type: "reference", _ref: asset._id },
      });
    }

    const subSlug = folder;
    await client.createOrReplace({
      _id: `product.${p.model}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.model },
      series: p.seriesLabel,
      subcategory: { _type: "reference", _ref: `subcategory.${subSlug}` },
      order: i,
      summary: p.summary,
      specs: p.specs.map((s, n) => ({
        _type: "spec",
        _key: key(p.model, "spec", n),
        label: s.label,
        value: s.value,
      })),
      gallery,
    });
    console.log(`  ✓ ${p.name} (${gallery.length} фото)`);
  }

  // 4) Синглтоны (создаём, если ещё нет — setIfMissing)
  console.log("→ Главная и настройки…");
  await client
    .transaction()
    .createIfNotExists({ _id: "homepage", _type: "homepage" })
    .createIfNotExists({
      _id: "siteSettings",
      _type: "siteSettings",
      companyName: "OHAUS Kazakhstan",
    })
    .commit();

  console.log("Готово ✅");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
