/**
 * Догрузка фото для товаров без галереи: скачивает изображения по сохранённым
 * CDN-ссылкам OHAUS и заливает их в Sanity.
 *
 * Запускать НА ВАШЕЙ машине (нужен интернет):
 *   npm run import-images
 *
 * Берёт из Sanity все товары с пустой галереей, находит для них CDN-ссылку
 * в lib/products, скачивает и добавляет фото в галерею. Уже заполненные
 * товары (оборудование) не трогает. Безопасно перезапускать.
 */
import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";
import { products } from "../lib/products";

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) {
  console.error("Нет NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_TOKEN в .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const byModel = new Map(products.map((p) => [p.model, p]));

async function main() {
  const targets: { _id: string; model: string }[] = await client.fetch(
    `*[_type=="product" && count(gallery)==0]{_id, "model": slug.current}`,
  );
  console.log(`Товаров без фото: ${targets.length}`);

  let ok = 0;
  const failed: string[] = [];

  for (const t of targets) {
    const p = byModel.get(t.model);
    if (!p || !p.image) {
      console.log(`  ⚠ нет CDN-ссылки: ${t.model}`);
      failed.push(t.model);
      continue;
    }
    try {
      const res = await fetch(p.image, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      const ct = res.headers.get("content-type") || "";
      if (!res.ok || !ct.startsWith("image/")) {
        throw new Error(`HTTP ${res.status} ${ct}`);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      const asset = await client.assets.upload("image", buf, {
        filename: `${t.model}.jpg`,
      });
      await client
        .patch(t._id)
        .set({
          gallery: [
            {
              _type: "image",
              _key: `${t.model}-1`,
              asset: { _type: "reference", _ref: asset._id },
            },
          ],
        })
        .commit();
      console.log(`  ✓ ${p.name}`);
      ok++;
    } catch (e) {
      console.log(`  ✗ ${p.name}: ${(e as Error).message}`);
      failed.push(t.model);
    }
  }

  console.log(`\nГотово: успешно ${ok}, не удалось ${failed.length}`);
  if (failed.length) {
    console.log("Не загрузились (залейте вручную в /studio):");
    failed.forEach((m) => console.log("  - " + m));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
