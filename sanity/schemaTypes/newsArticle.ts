import { defineArrayMember, defineField, defineType } from "sanity";

/** Новость / статья. */
export const newsArticle = defineType({
  name: "newsArticle",
  title: "Новость",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
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
      name: "date",
      title: "Дата",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cover",
      title: "Обложка",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Краткое описание",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Текст",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt-текст", type: "string" }],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Сначала новые",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "cover" },
  },
});
