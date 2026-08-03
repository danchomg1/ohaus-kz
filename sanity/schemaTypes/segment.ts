import { defineArrayMember, defineField, defineType } from "sanity";

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
      name: "groups",
      title: "Группы в меню",
      type: "array",
      description:
        "Рубрики этого сегмента в мега-меню. Заголовок группы задаётся здесь, " +
        "поэтому одна подкатегория может лежать в разных сегментах под разными " +
        "заголовками. Порядок групп и ссылок = порядок в списке.",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuGroup",
          title: "Группа",
          fields: [
            defineField({
              name: "title",
              title: "Заголовок группы",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "items",
              title: "Подкатегории",
              type: "array",
              of: [
                defineArrayMember({
                  type: "reference",
                  to: [{ type: "subcategory" }],
                }),
              ],
              validation: (r) => r.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare({ title, items }) {
              const n = Array.isArray(items) ? items.length : 0;
              return { title, subtitle: `${n} подкатегорий` };
            },
          },
        }),
      ],
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
