/**
 * Сид структуры каталога (сегменты → группы → подкатегории) в Sanity
 * из lib/catalog.ts.
 *
 *   npm run seed-nav
 *
 * Идемпотентный и безопасный: подкатегории создаются только если их ещё нет
 * (тексты и товары не трогаются), сегментам патчится только поле groups —
 * промо-карточки и порядок сохраняются. Картинки не загружаются.
 */
import { loadEnvConfig } from "@next/env";
import { createClient, type SanityClient } from "@sanity/client";
import { menu, subcategories } from "../lib/catalog";

/** _key должен быть уникален внутри массива и состоять из [a-zA-Z0-9_-]. */
const key = (...parts: (string | number)[]) =>
  parts.join("-").replace(/[^a-zA-Z0-9_-]/g, "");

export async function seedNav(client: SanityClient) {
  const known = new Set(subcategories.map((s) => s.slug));
  for (const seg of menu) {
    for (const group of seg.groups) {
      for (const slug of group.items) {
        if (!known.has(slug)) {
          throw new Error(
            `Сегмент «${seg.title}» → группа «${group.title}» ссылается на неизвестную подкатегорию «${slug}»`,
          );
        }
      }
    }
  }

  console.log("→ Подкатегории (создаём недостающие)…");
  const existing: string[] = await client.fetch(`*[_type=="subcategory"]._id`);
  const missing = subcategories.filter(
    (s) => !existing.includes(`subcategory.${s.slug}`),
  );
  for (const sub of missing) {
    await client.createIfNotExists({
      _id: `subcategory.${sub.slug}`,
      _type: "subcategory",
      title: sub.title,
      slug: { _type: "slug", current: sub.slug },
    });
    console.log(`  + ${sub.title}`);
  }
  console.log(
    `  всего ${subcategories.length}, создано новых: ${missing.length}`,
  );

  console.log("→ Сегменты и группы меню…");
  for (let i = 0; i < menu.length; i++) {
    const seg = menu[i];
    const groups = seg.groups.map((group, gi) => ({
      _type: "menuGroup",
      _key: key("g", gi, group.title),
      title: group.title,
      items: group.items.map((slug) => ({
        _type: "reference",
        _key: key(slug),
        _ref: `subcategory.${slug}`,
      })),
    }));

    await client
      .patch(`segment.${seg.slug}`)
      .setIfMissing({
        _type: "segment",
        title: seg.title,
        slug: { _type: "slug", current: seg.slug },
      })
      .set({ order: i, groups })
      .commit({ autoGenerateArrayKeys: false });

    const n = seg.groups.reduce((sum, g) => sum + g.items.length, 0);
    console.log(`  ✓ ${seg.title}: ${seg.groups.length} групп, ${n} ссылок`);
  }

  // Поля старой схемы: группа хранилась строкой на подкатегории, из-за чего
  // одна подкатегория не могла лежать в разных сегментах под разными
  // заголовками. Теперь это живёт в segment.groups — чистим остатки.
  console.log("→ Чистим устаревшие поля подкатегорий…");
  const stale: string[] = await client.fetch(
    `*[_type=="subcategory" && (defined(group) || defined(segments) || defined(order))]._id`,
  );
  if (stale.length) {
    let tx = client.transaction();
    for (const id of stale) {
      tx = tx.patch(id, (p) => p.unset(["group", "segments", "order"]));
    }
    await tx.commit();
  }
  console.log(`  очищено документов: ${stale.length}`);

  const placed = new Set(menu.flatMap((s) => s.groups.flatMap((g) => g.items)));
  const orphans = subcategories.filter((s) => !placed.has(s.slug));
  if (orphans.length) {
    console.log("\n⚠ Не попали ни в одно меню (страница доступна по прямой ссылке):");
    for (const o of orphans) console.log(`  - ${o.title} (/products/${o.slug})`);
  }
}

async function main() {
  loadEnvConfig(process.cwd());

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !token) {
    console.error(
      "Нет NEXT_PUBLIC_SANITY_PROJECT_ID или SANITY_API_TOKEN в .env.local",
    );
    process.exit(1);
  }

  await seedNav(
    createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      token,
      apiVersion: "2024-01-01",
      useCdn: false,
    }),
  );
  console.log("\nГотово ✅");
}

// Запуск только из CLI: при импорте из migrate.ts main() не выполняется.
if (process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/seed-nav.ts")) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
