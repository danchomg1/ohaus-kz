// Структура каталога для мега-меню: сегмент → группа → подкатегории.
//
// Одна подкатегория может входить в несколько сегментов, и в разных сегментах
// её группа называется по-разному: «Прецизионные весы» лежат в группе «Весы»
// (Лабораторные), «Лабораторные весы» (Пищевая) и «Взвешивание» (Образование).
// Поэтому группа — свойство пары «сегмент + подкатегория», а не подкатегории.
//
// Это источник правды для сида Sanity (scripts/seed-nav.ts).
// Сайт структуру отсюда не читает — он берёт её из CMS через getNav().

/** Подкатегория: slug совпадает с URL /products/<slug>. */
export type SubcategoryDef = { slug: string; title: string };

/** Группа-рубрика внутри сегмента; items — slug'и подкатегорий по порядку. */
export type MenuGroup = { title: string; items: string[] };

/** Сегмент рынка со своим набором групп. */
export type MenuSegment = { slug: string; title: string; groups: MenuGroup[] };

export const subcategories: SubcategoryDef[] = [
  { slug: "analytical-balances", title: "Аналитические весы" },
  { slug: "precision-balances", title: "Прецизионные весы" },
  { slug: "portable-scales-2", title: "Портативные весы" },
  { slug: "mechanical-scales", title: "Механические весы" },
  { slug: "jewelry-scales", title: "Ювелирные весы" },
  { slug: "bench-scales", title: "Платформенные весы" },
  { slug: "counting-scales", title: "Счетные весы" },
  { slug: "floor-scales", title: "Напольные весы" },
  { slug: "indicators", title: "Терминалы" },
  { slug: "moisture-analyzers", title: "Анализаторы влагосодержания" },
  { slug: "water-analysis", title: "Анализаторы жидкости и электроды" },
  { slug: "calibration-weights", title: "Калибровочные гири" },
  { slug: "centrifuges", title: "Центрифуги" },
  { slug: "open-air-shakers", title: "Открытые шейкеры" },
  {
    slug: "incubating-incubating-cooling-shakers",
    title: "Шейкеры-инкубаторы и шейкеры-инкубаторы с охлаждением",
  },
  { slug: "laboratory-vortex-mixers", title: "Вихревые смесители" },
  { slug: "dry-block-heaters", title: "Твердотельные термостаты" },
  { slug: "overhead-stirrers", title: "Верхнеприводные мешалки" },
  { slug: "hotplates-stirrers", title: "Нагревательные плиты и мешалки" },
  { slug: "labjaws-clamps-supports", title: "Зажимы LabJaws и подставки" },
  { slug: "equipment-accessories", title: "Аксессуары для оборудования" },
];

/** Полный список лабораторного оборудования — повторяется в двух сегментах. */
const LAB_EQUIPMENT = [
  "centrifuges",
  "open-air-shakers",
  "incubating-incubating-cooling-shakers",
  "laboratory-vortex-mixers",
  "dry-block-heaters",
  "overhead-stirrers",
  "hotplates-stirrers",
  "labjaws-clamps-supports",
];

export const menu: MenuSegment[] = [
  {
    slug: "lab",
    title: "Лабораторные",
    groups: [
      {
        title: "Весы",
        items: [
          "analytical-balances",
          "precision-balances",
          "portable-scales-2",
        ],
      },
      { title: "Оборудование", items: LAB_EQUIPMENT },
      {
        title: "Контрольно-измерительные приборы",
        items: ["water-analysis"],
      },
      { title: "Анализаторы влажности", items: ["moisture-analyzers"] },
      { title: "Гири", items: ["calibration-weights"] },
    ],
  },
  {
    slug: "industrial",
    title: "Промышленные",
    groups: [
      {
        title: "Промышленные весы",
        items: ["bench-scales", "counting-scales", "floor-scales"],
      },
      {
        title: "Весы",
        items: ["precision-balances", "portable-scales-2"],
      },
      { title: "Лабораторное оборудование", items: ["overhead-stirrers"] },
      { title: "Компоненты весов", items: ["indicators"] },
      { title: "Анализаторы влажности", items: ["moisture-analyzers"] },
    ],
  },
  {
    slug: "retail",
    title: "Торговые",
    groups: [
      { title: "Ювелирные весы", items: ["jewelry-scales"] },
      { title: "Платформенные весы", items: ["bench-scales"] },
    ],
  },
  {
    slug: "food",
    title: "Пищевая промышленность",
    groups: [
      {
        title: "Лабораторные весы",
        items: [
          "analytical-balances",
          "precision-balances",
          "portable-scales-2",
        ],
      },
      {
        title: "Промышленные весы",
        items: ["bench-scales", "counting-scales", "floor-scales"],
      },
      { title: "Анализаторы влажности", items: ["moisture-analyzers"] },
      {
        title: "Лабораторные контрольно-измерительные приборы",
        items: ["water-analysis"],
      },
    ],
  },
  {
    slug: "education",
    title: "Образование",
    groups: [
      {
        title: "Взвешивание",
        items: [
          "analytical-balances",
          "precision-balances",
          "portable-scales-2",
          "mechanical-scales",
        ],
      },
      { title: "Лабораторное оборудование", items: LAB_EQUIPMENT },
      {
        title: "Лабораторные контрольно-измерительные приборы",
        items: ["water-analysis"],
      },
    ],
  },
];

/** Название подкатегории по slug'у (для хлебных крошек и заголовков). */
export function titleForSlug(slug: string): string | null {
  return subcategories.find((s) => s.slug === slug)?.title ?? null;
}
