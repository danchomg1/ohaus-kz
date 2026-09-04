/**
 * Сбор контента карточек товаров с ru.ohaus.com.
 *
 *   npm run scrape            — собрать в scripts/.cache/ohaus.json и напечатать отчёт
 *   npm run scrape -- --fresh — заново скачать страницы, игнорируя кэш HTML
 *
 * Ничего не пишет в Sanity и не требует доступа к ней — работает по явной
 * таблице соответствий scripts/ohaus-map.ts. Запись делает scripts/import-content.ts.
 *
 * Что забираем с каждой страницы семейства:
 *   summary   — «family-description», полное описание над вкладками
 *   tagline   — подзаголовок под названием
 *   features  — вкладка «Особенности»: 3 блока «картинка + текст»
 *   details   — вкладка «Описание»: пары «параметр — значение»
 *   specs     — «Характеристики» семейства: фильтры таблицы моделей
 *   models    — номера моделей и их характеристики (для сверки, в Sanity не идут)
 *
 * Страницы отдаются сервером целиком, поэтому хватает fetch + разбор разметки
 * регулярками по стабильным классам (category-family-item, headline-item,
 * detail-header/detail-desc, ctrl-block, compare-model-item).
 */
import fs from "node:fs";
import path from "node:path";
import { OHAUS_URLS, CATEGORY_URLS } from "./ohaus-map";

const ORIGIN = "https://ru.ohaus.com";
const CACHE_DIR = path.join(process.cwd(), "scripts", ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "ohaus.json");
const HTML_DIR = path.join(CACHE_DIR, "html");
const FRESH = process.argv.includes("--fresh");

export type ScrapedFeature = { text: string; image?: string };
export type ScrapedPair = { label: string; value: string };
export type ScrapedModel = {
  model: string;
  href: string;
  specs: ScrapedPair[];
};
export type ScrapedProduct = {
  /** slug нашего товара (он же slug документа в Sanity). */
  ourSlug: string;
  url: string;
  title: string;
  tagline: string;
  summary: string;
  features: ScrapedFeature[];
  details: ScrapedPair[];
  specs: ScrapedPair[];
  models: ScrapedModel[];
  documents: { url: string; title: string }[];
};

// ---------- разбор разметки ----------

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  "#39": "'",
  laquo: "«",
  raquo: "»",
  mdash: "—",
  ndash: "–",
  trade: "™",
  deg: "°",
  reg: "®",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "«",
  rdquo: "»",
  times: "×",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  micro: "µ",
  bull: "•",
};

function decode(s: string): string {
  return s.replace(/&(#?\w+);/g, (m, e) => {
    if (ENTITIES[e]) return ENTITIES[e];
    if (e[0] === "#") {
      const code =
        e[1] === "x" || e[1] === "X"
          ? parseInt(e.slice(2), 16)
          : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return m;
  });
}

/** HTML → плоский текст (теги убираются, пробелы схлопываются). */
function text(html: string): string {
  return (
    decode(
      html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<\/(p|div|li|tr)>/gi, " ")
        .replace(/<[^>]+>/g, " "),
    )
      .replace(/\s+/g, " ")
      // В их данных разделитель тысяч выводится подчёркиванием: «2_610 г»,
      // «10_000 об/мин». На карточке это читается как опечатка — ставим пробел.
      .replace(/(\d)_(\d{3})(?!\d)/g, "$1 $2")
      .trim()
  );
}

async function getHtml(url: string): Promise<string> {
  fs.mkdirSync(HTML_DIR, { recursive: true });
  const file = path.join(
    HTML_DIR,
    url.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 150) + ".html",
  );
  if (!FRESH && fs.existsSync(file)) return fs.readFileSync(file, "utf8");

  let last: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(ORIGIN + url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ohaus-kz-import)",
          "Accept-Language": "ru-RU,ru;q=0.9",
        },
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      fs.writeFileSync(file, html, "utf8");
      await new Promise((r) => setTimeout(r, 350)); // не долбим их сервер
      return html;
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
    }
  }
  throw new Error(`${url}: ${(last as Error)?.message}`);
}

/** Плитки семейств на странице категории — нужны только для сверки списка. */
function parseCategory(html: string): { href: string; title: string }[] {
  const out: { href: string; title: string }[] = [];
  const seen = new Set<string>();
  for (const b of html.split(/<div class="category-family-item"/).slice(1)) {
    const m = b.match(
      /<div class="header">\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i,
    );
    if (!m || seen.has(m[1])) continue;
    seen.add(m[1]);
    out.push({ href: m[1], title: text(m[2]) });
  }
  return out;
}

/** Карточка семейства: описание, особенности, «Описание», характеристики. */
function parseProduct(html: string): Omit<ScrapedProduct, "ourSlug" | "url"> {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1 ? text(h1[1]) : "";

  const sub =
    html.match(/<div class="description">([\s\S]*?)<\/div>/i) ||
    html.match(/<div class="subhead">([\s\S]*?)<\/div>/i);
  const tagline = sub ? text(sub[1]) : "";

  // Полное описание над вкладками; meta description дублирует его — запасной вариант.
  const fam = html.match(/<div class="family-description">([\s\S]*?)<\/div>/i);
  const meta = html.match(
    /<meta[^>]+name=["']description["'][^>]*content="([^"]*)"/i,
  );
  const summary = fam ? text(fam[1]) : meta ? text(decode(meta[1])) : "";

  // --- Особенности: блоки .headline-item — картинка + текст.
  const features: ScrapedFeature[] = [];
  const oa = html.indexOf('id="overview-sections"');
  const ob = html.indexOf("<!--End Overview-->");
  if (oa >= 0) {
    const overview = html.slice(oa, ob > oa ? ob : oa + 20000);
    for (const b of overview
      .split(/<div class="match headline-item/)
      .slice(1)) {
      const img = b.match(/data-src="([^"]+)"/i);
      // текст лежит в <div> блока, после картинки
      const t = [...b.matchAll(/<div[^>]*>([\s\S]*?)<\/div>/gi)]
        .map((m) => text(m[1]))
        .find((s) => s.length > 20);
      if (!t && !img) continue;
      features.push({ text: t ?? "", image: img ? decode(img[1]) : undefined });
    }
  }

  // --- Вкладка «Описание»: пары detail-header / detail-desc.
  const details: ScrapedPair[] = [];
  const da = html.indexOf('id="details-section"');
  if (da >= 0) {
    const ds = html.slice(da, da + 60000);
    const re =
      /<div class="detail-header">([\s\S]*?)<\/div>\s*<div class="detail-desc">([\s\S]*?)<\/div>/gi;
    for (const m of ds.matchAll(re)) {
      const label = text(m[1]);
      const value = text(m[2]);
      if (!label || !value || value === "-") continue;
      details.push({ label, value });
    }
  }

  // --- Характеристики семейства: фильтры над таблицей моделей.
  // Это единственное место, где параметры собраны на уровне семейства;
  // если вариантов несколько, они перечислены через « / ».
  const specs: ScrapedPair[] = [];
  const ma = html.indexOf('id="models-listing-section"');
  if (ma >= 0) {
    const ms = html.slice(ma, ma + 300000);
    for (const b of ms.split(/<div class="ctrl-block">/).slice(1)) {
      const ft = b.match(
        /<div class="filter-title">([\s\S]*?)<(?:input|\/div)/i,
      );
      if (!ft) continue;
      const label = text(ft[1])
        .replace(/\s*\(\d+\)\s*$/, "")
        .trim();
      const values: string[] = [];
      for (const m of b.matchAll(
        /<label for="cblAttr_\d+_\d+">([\s\S]*?)<\/label>/gi,
      )) {
        // Внутри одного значения варианты разделены точкой с запятой.
        for (const raw of text(m[1]).split(";")) {
          const v = raw.trim();
          if (v && !values.some((x) => x.toLowerCase() === v.toLowerCase())) {
            values.push(v);
          }
        }
      }
      if (label && values.length)
        specs.push({ label, value: values.join(" / ") });
    }
  }

  // --- Модели: номер + характеристики (для сверки состава семейства).
  const models: ScrapedModel[] = [];
  for (const b of html.split(/<div class="compare-model-item"/).slice(1)) {
    const nm =
      b.match(/Модели #:\s*<a[^>]*>([\s\S]*?)<\/a>/i) ||
      b.match(/<div class="col-sm-3 cl-name">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
    if (!nm) continue;
    const href = b.match(/<a href="([^"]+)"/i);
    const specsOfModel: ScrapedPair[] = [];
    const re =
      /<div class="(?:hidden )?spec-title">([\s\S]*?)<\/div>\s*<div class="(?:hidden )?spec-detail">([\s\S]*?)<\/div>/gi;
    for (const m of b.matchAll(re)) {
      const label = text(m[1])
        .replace(/\s*\(\d+\)\s*$/, "")
        .trim();
      const value = text(m[2]);
      if (label && value && value !== "-") specsOfModel.push({ label, value });
    }
    models.push({
      model: text(nm[1]),
      href: href ? decode(href[1]) : "",
      specs: specsOfModel,
    });
  }

  // --- Документы: ссылки блока #model-documentation (в разметке одинарные кавычки).
  const documents: { url: string; title: string }[] = [];
  const doca = html.indexOf('id="model-documentation"');
  if (doca >= 0) {
    const dsec = html.slice(doca, doca + 60000);
    for (const m of dsec.matchAll(
      /<a[^>]+href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi,
    )) {
      const t = text(m[2]);
      const url = decode(m[1]);
      if (t && !documents.some((d) => d.url === url))
        documents.push({ url, title: t });
    }
  }

  return {
    title,
    tagline,
    summary,
    features,
    details,
    specs,
    models,
    documents,
  };
}

// ---------- сбор ----------

async function main() {
  const scraped: ScrapedProduct[] = [];
  const problems: string[] = [];

  const entries = Object.entries(OHAUS_URLS);
  console.log(`Товаров в таблице соответствий: ${entries.length}\n`);

  for (const [ourSlug, url] of entries) {
    let html: string;
    try {
      html = await getHtml(url);
    } catch (e) {
      problems.push(`${ourSlug} → ${url}: ${(e as Error).message}`);
      console.log(`  ✗ ${ourSlug.padEnd(32)} ${(e as Error).message}`);
      continue;
    }
    const p = parseProduct(html);
    scraped.push({ ourSlug, url, ...p });

    const warn: string[] = [];
    if (!p.summary) warn.push("нет описания");
    if (!p.features.length) warn.push("нет особенностей");
    if (p.features.some((f) => !f.image)) warn.push("особенность без картинки");
    if (!p.specs.length) warn.push("нет характеристик");
    console.log(
      `  ✓ ${ourSlug.padEnd(32)} особ:${p.features.length} опис:${p.details.length} ` +
        `хар:${p.specs.length} мод:${p.models.length}` +
        (warn.length ? `  ⚠ ${warn.join(", ")}` : ""),
    );
  }

  // Сверка со списком семейств в их категориях: не появилось ли у них нового.
  console.log("\n→ Сверка списка семейств по категориям…");
  const known = new Set(Object.values(OHAUS_URLS));
  const extra: string[] = [];
  for (const [sub, catUrl] of Object.entries(CATEGORY_URLS)) {
    try {
      const tiles = parseCategory(await getHtml(catUrl));
      for (const t of tiles) {
        if (!known.has(t.href)) extra.push(`${sub}: ${t.title} — ${t.href}`);
      }
    } catch (e) {
      problems.push(`категория ${sub}: ${(e as Error).message}`);
    }
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(scraped, null, 2), "utf8");

  console.log(`\n########## ИТОГ ##########`);
  console.log(`Собрано карточек: ${scraped.length} из ${entries.length}`);
  console.log(
    `Особенностей всего: ${scraped.reduce((n, p) => n + p.features.length, 0)}, ` +
      `из них без картинки: ${scraped.reduce(
        (n, p) => n + p.features.filter((f) => !f.image).length,
        0,
      )}`,
  );
  if (extra.length) {
    console.log(
      `\nУ них есть семейства, которых нет в scripts/ohaus-map.ts (${extra.length}):`,
    );
    extra.forEach((x) => console.log("  - " + x));
  }
  if (problems.length) {
    console.log(`\nОшибки (${problems.length}):`);
    problems.forEach((x) => console.log("  - " + x));
  }
  console.log(`\nСохранено: ${path.relative(process.cwd(), CACHE_FILE)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
