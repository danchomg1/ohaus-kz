/**
 * Перенос контента карточек с ru.ohaus.com в Sanity.
 *
 *   npm run scrape                        — сначала собрать scripts/.cache/ohaus.json
 *   npm run import-content                — записать в Sanity
 *   npm run import-content -- --dry-run   — показать, что будет записано, ничего не менять
 *   npm run import-content -- --no-images — без заливки картинок особенностей
 *   npm run import-content -- --no-specs  — не трогать «Характеристики»
 *
 * Пишет только эти поля и ничего не удаляет сверх них:
 *   summary   — полное описание с их карточки
 *   features  — «Особенности»: текст + картинка (по 3 на модель)
 *   specs     — «Характеристики»: атрибуты семейства из их таблицы моделей
 *   details   — пары «параметр — значение» с их вкладки «Описание»
 * Галерея, документы и order не трогаются.
 *
 * Идемпотентный: картинка особенности заливается один раз и опознаётся по
 * исходному URL (sha1 в имени файла ассета), повторный запуск её не дублирует.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";
import type { ScrapedProduct } from "./scrape-ohaus";

loadEnvConfig(process.cwd());

const CACHE_FILE = path.join(process.cwd(), "scripts", ".cache", "ohaus.json");
const ORIGIN = "https://ru.ohaus.com";
const DRY = process.argv.includes("--dry-run");
const SKIP_IMAGES = process.argv.includes("--no-images");
const SKIP_SPECS = process.argv.includes("--no-specs");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) {
  console.error(
    "Нет NEXT_PUBLIC_SANITY_PROJECT_ID или SANITY_API_TOKEN в .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const key = (...parts: (string | number)[]) =>
  parts
    .join("-")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 60);

/** Кэш «URL картинки → _id ассета», чтобы одна картинка лилась один раз. */
const assetCache = new Map<string, string>();

async function uploadFeatureImage(src: string): Promise<string | null> {
  if (assetCache.has(src)) return assetCache.get(src)!;

  const url = src.startsWith("http") ? src : ORIGIN + src;
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 16);

  // Уже заливали в прошлый прогон?
  const existing: string | null = await client.fetch(
    `*[_type=="sanity.imageAsset" && originalFilename==$fn][0]._id`,
    { fn: `ohaus-usp-${hash}.jpg` },
  );
  if (existing) {
    assetCache.set(src, existing);
    return existing;
  }

  // На их страницах часть ссылок битая: разметка ведёт на «...USP-1.jpg»,
  // а файл лежит как «...USP1.jpg» (и наоборот). Пробуем оба написания.
  const candidates = [
    url,
    url.replace(/USP-(\d)/i, "USP$1"),
    url.replace(/USP(\d)/i, "USP-$1"),
    url.replace(/-USP/i, "_USP"),
  ].filter((u, i, a) => a.indexOf(u) === i);

  let res: Response | null = null;
  for (const candidate of candidates) {
    const r = await fetch(candidate, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ohaus-kz-import)" },
    });
    if (r.ok && (r.headers.get("content-type") || "").startsWith("image/")) {
      res = r;
      break;
    }
  }
  if (!res) {
    console.log(`    ! картинки нет ни по одному варианту: ${url}`);
    return null;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, {
    filename: `ohaus-usp-${hash}.jpg`,
  });
  assetCache.set(src, asset._id);
  return asset._id;
}

async function main() {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error(
      "Нет scripts/.cache/ohaus.json — сначала запустите: npm run scrape",
    );
    process.exit(1);
  }
  const scraped: ScrapedProduct[] = JSON.parse(
    fs.readFileSync(CACHE_FILE, "utf8"),
  );

  const ourSlugs: string[] = await client.fetch(
    `*[_type=="product"].slug.current`,
  );
  const known = new Set(ourSlugs);

  let patched = 0;
  let imgOk = 0;
  let imgFail = 0;
  const skipped: string[] = [];

  for (const p of scraped) {
    if (!known.has(p.ourSlug)) {
      skipped.push(`${p.ourSlug} (${p.title}) — такого товара нет в Sanity`);
      continue;
    }

    const features: Record<string, unknown>[] = [];
    for (let i = 0; i < p.features.length; i++) {
      const f = p.features[i];
      const item: Record<string, unknown> = {
        _type: "feature",
        _key: key(p.ourSlug, "usp", i),
        text: f.text,
      };
      if (f.image && !SKIP_IMAGES && !DRY) {
        const assetId = await uploadFeatureImage(f.image);
        if (assetId) {
          item.image = {
            _type: "image",
            asset: { _type: "reference", _ref: assetId },
          };
          imgOk++;
        } else {
          imgFail++;
        }
      }
      features.push(item);
    }

    const details = p.details.map((d, i) => ({
      _type: "detail",
      _key: key(p.ourSlug, "det", i),
      label: d.label,
      value: d.value,
    }));

    const patch: Record<string, unknown> = { features, details };
    if (p.summary) patch.summary = p.summary;
    if (!SKIP_SPECS && p.specs.length) {
      patch.specs = p.specs.map((s, i) => ({
        _type: "spec",
        _key: key(p.ourSlug, "spec", i),
        label: s.label,
        value: s.value,
      }));
    }

    if (!DRY) {
      await client
        .patch(`product.${p.ourSlug}`)
        .set(patch)
        .commit({ autoGenerateArrayKeys: false });
    }
    patched++;
    console.log(
      `  ✓ ${p.ourSlug.padEnd(32)} особ:${features.length} хар:${
        (patch.specs as unknown[] | undefined)?.length ?? "—"
      } опис:${details.length}${p.summary ? " описание✓" : " ОПИСАНИЯ НЕТ"}`,
    );
  }

  console.log(`\n########## ИТОГ ##########`);
  console.log(
    `${DRY ? "[dry-run] " : ""}Обновлено товаров: ${patched} из ${scraped.length}`,
  );
  if (!DRY && !SKIP_IMAGES) {
    console.log(
      `Картинок особенностей: залито ${imgOk}, не удалось ${imgFail}`,
    );
  }
  if (skipped.length) {
    console.log(`\nПропущено (${skipped.length}):`);
    skipped.forEach((s) => console.log("  - " + s));
    console.log(
      "Если товар должен быть на сайте — заведите его в Studio или запустите npm run migrate.",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
