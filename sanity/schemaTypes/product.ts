import { defineArrayMember, defineField, defineType } from "sanity";

/** Товар (модель оборудования/весов). */
export const product = defineType({
  name: "product",
  title: "Товар",
  type: "document",
  groups: [
    { name: "main", title: "Основное", default: true },
    { name: "features", title: "Особенности" },
    { name: "documents", title: "Документы" },
    { name: "description", title: "Описание" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Название",
      type: "string",
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "series",
      title: "Серия",
      type: "string",
      group: "main",
      description: "Например: Explorer™, Defender™ 3000.",
    }),
    defineField({
      name: "subcategory",
      title: "Подкатегория",
      type: "reference",
      to: [{ type: "subcategory" }],
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
      group: "main",
      initialValue: 0,
    }),
    defineField({
      name: "summary",
      title: "Краткое описание",
      type: "text",
      rows: 4,
      group: "main",
    }),
    defineField({
      name: "gallery",
      title: "Галерея фото",
      type: "array",
      group: "main",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt-текст", type: "string" },
          ],
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "specs",
      title: "Характеристики",
      type: "array",
      group: "main",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            { name: "label", title: "Параметр", type: "string" },
            { name: "value", title: "Значение", type: "string" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),

    // --- Вкладка «Особенности» ---
    defineField({
      name: "features",
      title: "Особенности",
      type: "array",
      group: "features",
      description:
        "Каждая особенность: квадратная картинка (реком. 300×300) + текст. На сайте по 3 в ряд.",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
            {
              name: "image",
              title: "Картинка (300×300)",
              type: "image",
              options: { hotspot: true },
            },
            { name: "text", title: "Текст", type: "text", rows: 3 },
          ],
          preview: {
            select: { title: "text", media: "image" },
          },
        }),
      ],
    }),

    // --- Вкладка «Документы» ---
    defineField({
      name: "documents",
      title: "Документы",
      type: "array",
      group: "documents",
      description: "Файлы для скачивания (PDF и т.п.).",
      of: [
        defineArrayMember({
          type: "object",
          name: "docFile",
          fields: [
            {
              name: "title",
              title: "Название",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "file",
              title: "Файл",
              type: "file",
              validation: (r) => r.required(),
            },
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),

    // --- Вкладка «Описание» ---
    defineField({
      name: "description",
      title: "Описание",
      type: "array",
      group: "description",
      description:
        "Свободный текст: заголовки, абзацы, картинки, видео в любом порядке.",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt-текст", type: "string" }],
        }),
        defineArrayMember({
          type: "object",
          name: "videoEmbed",
          title: "Видео",
          fields: [
            {
              name: "url",
              title: "Ссылка (YouTube/Vimeo/mp4)",
              type: "url",
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "url" },
            prepare: ({ title }) => ({ title: `Видео: ${title ?? ""}` }),
          },
        }),
      ],
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
    select: { title: "name", subtitle: "series", media: "gallery.0" },
  },
});
