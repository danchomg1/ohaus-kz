import { defineField, defineType } from "sanity";

/**
 * Подкатегория (Аналитические весы, Центрифуги, ...) — страница /products/<slug>.
 *
 * К каким сегментам и группам она относится, задаётся не здесь, а в поле
 * «Группы в меню» самого сегмента: заголовок группы у одной и той же
 * подкатегории в разных сегментах различается.
 */
export const subcategory = defineType({
  name: "subcategory",
  title: "Подкатегория",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Описание раздела",
      type: "text",
      rows: 6,
      description:
        "Абзац под заголовком, над списком товаров. Если пусто — берётся текст по умолчанию из lib/catalog-copy.ts.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
