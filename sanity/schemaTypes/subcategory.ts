import { defineField, defineType } from "sanity";

/**
 * Подкатегория (Аналитические весы, Центрифуги, ...). Может относиться
 * к нескольким сегментам и принадлежит группе (Весы / Оборудование / ...).
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
      name: "group",
      title: "Группа",
      type: "string",
      description: "Заголовок-рубрика в мега-меню (Весы, Оборудование, ...).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "segments",
      title: "Сегменты",
      type: "array",
      of: [{ type: "reference", to: [{ type: "segment" }] }],
      description: "К каким сегментам относится эта подкатегория.",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "group" },
  },
});
