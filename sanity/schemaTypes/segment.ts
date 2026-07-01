import { defineField, defineType } from "sanity";

/** Сегмент рынка (Лабораторные, Промышленные, Торговые, ...). */
export const segment = defineType({
  name: "segment",
  title: "Сегмент",
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
      name: "order",
      title: "Порядок",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "promoTitle",
      title: "Промо: подпись",
      type: "string",
      description: "Текст промо-карточки в мега-меню.",
    }),
    defineField({
      name: "promoProduct",
      title: "Промо: товар",
      type: "reference",
      to: [{ type: "product" }],
      description: "Товар, на который ведёт промо-карточка (необязательно).",
    }),
  ],
  orderings: [
    {
      title: "По порядку",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
