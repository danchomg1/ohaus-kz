/**
 * Сбор контента карточек товаров с ru.ohaus.com.
 *
 *   npm run scrape          — собрать в scripts/.cache/ohaus.json и напечатать
 *                             отчёт о сопоставлении с нашими товарами
 *
 * Ничего не пишет в Sanity — только читает наши товары, чтобы показать,
 * что с чем сопоставилось. Запись делает scripts/import-content.ts.
 *
 * Страницы ru.ohaus.com отдаются сервером, поэтому хватает fetch + разбор
 * разметки регулярками по стабильным классам (category-family-item,
 * headline-item, detail-header/detail-desc).
 */
import fs from "node:fs";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";

loadEnvConfig(process.cwd());

const ORIGIN = "https://ru.ohaus.com";
const CACHE_DIR = path.join(process.cwd(), "scripts", ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "ohaus.json");
const HTML_DIR = path.join(CACHE_DIR, "html");

/** Наш slug подкатегории → страница категории на ru.ohaus.com. */
const CATEGORY_URLS: Record<string, string> = {
  "analytical-balances": "/ru-ru/products/balances-scales/analytical-balances",
  "precision-balances": "/ru-ru/products/balances-scales/precision-balances",
  "portable-scales-2": "/ru-ru/portable-scales-2",
  "mechanical-scales": "/ru-ru/products/balances-scales/mechanical-scales-balances",
  "jewelry-scales": "/ru-ru/products/balances-scales/jewelry-scales",
  "bench-scales": "/ru-ru/products/balances-scales/bench-scales",
  "counting-scales": "/ru-ru/products/balances-scales/counting-scales",
  "floor-scales": "/ru-ru/products/balances-scales/floor-scales",
  indicators: "/ru-ru/products/balances-scales/indicators",
  "moisture-analyzers": "/ru-ru/products/balances-scales/moisture-analyzers",
  "water-analysis": "/ru-ru/products/instruments-equipment/water-analysis",
  "calibration-weights": "/ru-ru/products/weights/calibration-weights",
  centrifuges: "/ru-ru/products/equipment/centrifuges",
  "open-air-shakers": "/ru-ru/products/equipment/open-air-shakers",
  "incubating-incubating-cooling-shakers":
    "/ru-ru/products/equipment/incubating-incubating-cooling-shakers",
  "laboratory-vortex-mixers": "/ru-ru/products/equipment/laboratory-vortex-mixers",
  "dry-block-heaters": "/ru-ru/products/equipment/dry-block-heaters",
  "overhead-stirrers": "/ru-ru/products/equipment/overhead-stirrers",
  "hotplates-stirrers": "/ru-ru/products/equipment/hotplates-stirrers",
  "labjaws-clamps-supports": "/ru-ru/products/equipment/labjaws-clamps-and-supports",
  "equipment-accessories": "/ru-ru/products/equipment/equipment-accessories",
};

export type ScrapedFeature = { text: string; image?: string };
export type ScrapedDetail = { label: string; value: string };
export type ScrapedProduct = {
  ourSlug?: string;
  subcategory: string;
  url: string;
  title: string;
  tagline?: string;
  summary?: string;
  features: ScrapedFeature[];
  details: ScrapedDetail[];
};

// ---------- разбор разметки ----------

const ENTITIES: Record<string, string> = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'",
  laquo: "«", raquo: "»", mdash: "—", ndash: "–", trade: "™", deg: "°",
  reg: "®", hellip: "…", rsquo: "'", lsquo: "'", ldquo: "«", rdquo: "»",
};

function decode(s: string): string {
  return s.replace(/&(#?\w+);/g, (m, e) => {
    if (ENTITIES[e]) return ENTITIES[e];
    if (e[0] === "#") {
      const code = e[1] === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return m;
  });
}

/** HTML → плоский текст (теги убираются, пробелы схлопываются). */
function text(html: string): string {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Все совпадения группы 1 по регулярке. */
function allOf(re: RegExp, s: string): string[] {
  return [...s.matchAll(re)].map((m) => m[1]);
}

async function getHtml(url: string): Promise<string> {
  fs.mkdirSync(HTML_DIR, { recursive: true });
  const file = path.join(HTML_DIR, url.replace(/[^a-zA-Z0-9]/g, "_") + ".html");
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");

  const res = await fetch(ORIGIN + url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ohaus-kz-import)" },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const html = await res.text();
  fs.writeFileSync(file, html, "utf8");
  await new Promise((r) => setTimeout(r, 400)); // не долбим их сервер
  return html;
}

/** Плитки товаров на странице категории: ссылка + название. */
function parseCategory(html: string): { href: string; title: string }[] {
  const out: { href: string; title: string }[] = [];
  const seen = new Set<string>();
  const blocks = html.split(/<div class="category-family-item"/).slice(1);
  for (const b of blocks) {
    const m = b.match(
      /<div class="header">\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i,
    );
    if (!m) continue;
    const href = m[1];
    if (seen.has(href)) continue;
    seen.add(href);
    out.push({ href, title: text(m[2]) });
  }
  return out;
}

/** Карточка товара: подзаголовок, описание, особенности, пары «параметр/значение». */
function parseProduct(html: string): Omit<ScrapedProduct, "subcategory" | "url"> {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1 ? text(h1[1]) : "";

  const sub = html.match(/<div class="subhead">([\s\S]*?)<\/div>/i);
  const tagline = sub ? text(sub[1]) : undefined;

  // Длинное описание = meta description (тот же текст, что и абзац под H1,
  // но без риска зацепить соседнюю разметку).
  const meta = html.match(
    /<meta[^>]+name=["']description["'][^>]*content="([^"]*)"/i,
  );
  const summary = meta ? decode(meta[1]).replace(/\s+/g, " ").trim() : undefined;

  // Особенности: блоки .headline-item — картинка + текст.
  const features: ScrapedFeature[] = [];
  const overview = html.slice(
    html.indexOf('id="overview-sections"'),
    html.indexOf('<!--End Overview-->'),
  );
  for (const b of overview.split(/<div class="match headline-item/).slice(1)) {
    const img = b.match(/data-src="([^"]+)"/i);
    // текст лежит в последнем <div> блока, после картинки
    const divs = allOf(/<div[^>]*>([\s\S]*?)<\/div>/gi, b)
      .map(text)
      .filter((t) => t.length > 30);
    const t = divs[0];
    if (!t) continue;
    features.push({
      text: t,
      image: img ? decode(img[1]) : undefined,
    });
  }

  // Вкладка «Описание» — пары detail-header / detail-desc.
  const details: ScrapedDetail[] = [];
  const dsIdx = html.indexOf('id="details-section"');
  if (dsIdx >= 0) {
    const ds = html.slice(dsIdx, dsIdx + 30000);
    const re =
      /<div class="detail-header">([\s\S]*?)<\/div>\s*<div class="detail-desc">([\s\S]*?)<\/div>/gi;
    for (const m of ds.matchAll(re)) {
      const label = text(m[1]);
      const value = text(m[2]);
      if (!label || !value || value === "-") continue;
      details.push({ label, value });
    }
  }

  return { title, tagline, summary, features, details };
}

// ---------- сопоставление с нашими товарами ----------

/** Нормализация для сравнения названий: только буквы/цифры в нижнем регистре. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[™®]/g, "")
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .trim();
}

const STOP = new Set([
  "весы", "весов", "прибор", "приборы", "серии", "серия", "и", "для", "с",
  "тип", "типа", "the", "of",
]);

function tokens(s: string): string[] {
  return norm(s).split(" ").filter((t) => t && !STOP.has(t));
}

/** Доля общих токенов (Jaccard) — грубо, но для наших названий хватает. */
function similarity(a: string, b: string): number {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / new Set([...A, ...B]).size;
}

async function main() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
    perspective: "published",
  });

  const ours: { name: string; slug: string; sub: string }[] = await client.fetch(
    `*[_type=="product"]{ name, "slug": slug.current, "sub": subcategory->slug.current }|order(sub asc)`,
  );

  const scraped: ScrapedProduct[] = [];
  const report: string[] = [];
  let matched = 0;
  const unmatchedOurs: string[] = [];
  const unusedTheirs: string[] = [];

  for (const [sub, catUrl] of Object.entries(CATEGORY_URLS)) {
    const catHtml = await getHtml(catUrl);
    const tiles = parseCategory(catHtml);
    const mine = ours.filter((p) => p.sub === sub);

    report.push(`\n=== ${sub} — у нас ${mine.length}, у них ${tiles.length}`);
    if (!tiles.length) {
      report.push("    (на ru.ohaus.com в этой категории нет карточек)");
      for (const m of mine) unmatchedOurs.push(`${sub}: ${m.name}`);
      continue;
    }

    // Сопоставление глобально по категории, а не по порядку: сначала самые
    // уверенные пары, затем остаток по исключению. Иначе «Электроды Starter»
    // перехватывает «Карманные приборы Starter», а настоящая пара
    // «Starter Electrodes» остаётся без владельца.
    const pairs: { oi: number; ti: number; s: number }[] = [];
    mine.forEach((p, oi) =>
      tiles.forEach((t, ti) => pairs.push({ oi, ti, s: similarity(p.name, t.title) })),
    );
    pairs.sort((a, b) => b.s - a.s);

    const ourTaken = new Map<number, { ti: number; s: number; byRest: boolean }>();
    const theirTaken = new Set<number>();
    for (const { oi, ti, s } of pairs) {
      if (s < 0.2) break;
      if (ourTaken.has(oi) || theirTaken.has(ti)) continue;
      ourTaken.set(oi, { ti, s, byRest: false });
      theirTaken.add(ti);
    }

    // Остаток: если с обеих сторон осталось поровну — спариваем по исключению.
    const restOurs = mine.map((_, i) => i).filter((i) => !ourTaken.has(i));
    const restTheirs = tiles.map((_, i) => i).filter((i) => !theirTaken.has(i));
    if (restOurs.length && restOurs.length === restTheirs.length) {
      restOurs.forEach((oi, k) => {
        ourTaken.set(oi, { ti: restTheirs[k], s: 0, byRest: true });
        theirTaken.add(restTheirs[k]);
      });
    }

    for (let oi = 0; oi < mine.length; oi++) {
      const p = mine[oi];
      const hit = ourTaken.get(oi);
      if (!hit) {
        report.push(`    ✗ ${p.name}  → НЕ СОПОСТАВЛЕН`);
        unmatchedOurs.push(`${sub}: ${p.name}`);
        continue;
      }
      matched++;
      const tile = tiles[hit.ti];
      const pHtml = await getHtml(tile.href);
      const parsed = parseProduct(pHtml);
      scraped.push({
        subcategory: sub,
        url: tile.href,
        ourSlug: p.slug,
        ...parsed,
      } as ScrapedProduct);
      report.push(
        `    ${hit.byRest ? "≈" : "✓"} ${p.name}\n        → ${tile.title}  ` +
          `[${hit.byRest ? "по остатку" : hit.s.toFixed(2)}]` +
          `  особ:${parsed.features.length} парам:${parsed.details.length}` +
          `${parsed.summary ? "" : "  БЕЗ ОПИСАНИЯ"}`,
      );
    }

    tiles.forEach((t, i) => {
      if (!theirTaken.has(i)) unusedTheirs.push(`${sub}: ${t.title} (${t.href})`);
    });
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(scraped, null, 2), "utf8");

  console.log(report.join("\n"));
  console.log(`\n\n########## ИТОГ ##########`);
  console.log(`Сопоставлено: ${matched} из ${ours.length}`);
  console.log(`\nНаши без пары (${unmatchedOurs.length}):`);
  unmatchedOurs.forEach((x) => console.log("  - " + x));
  console.log(`\nИх карточки без пары (${unusedTheirs.length}):`);
  unusedTheirs.forEach((x) => console.log("  - " + x));
  console.log(`\nСохранено: ${path.relative(process.cwd(), CACHE_FILE)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
