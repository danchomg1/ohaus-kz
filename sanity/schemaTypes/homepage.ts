import { defineArrayMember, defineField, defineType } from "sanity";

/** Главная страница (синглтон): Hero, быстрые ссылки, промо-баннер. */
export const homepage = defineType({
  name: "homepage",
  title: "Главная",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Слайды Hero",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "slide",
          fields: [
            { name: "series", title: "Серия (надзаголовок)", type: "string" },
            { name: "title", title: "Заголовок", type: "string" },
            { name: "subtitle", title: "Подзаголовок", type: "text", rows: 2 },
            { name: "ctaHref", title: "Ссылка кнопки", type: "string" },
            {
              name: "image",
              title: "Фон/фото",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "title", subtitle: "series" } },
        }),
      ],
    }),
    defineField({
      name: "quickLinks",
      title: "Ссылки быстрого доступа",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "quickLink",
          fields: [
            { name: "title", title: "Подпись", type: "string" },
            { name: "href", title: "Ссылка", type: "string" },
            {
              name: "image",
              title: "Картинка",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "promoTitle",
      title: "Промо: заголовок",
      type: "string",
      initialValue: "Рекламные акции",
    }),
    defineField({
      name: "promoSubtitle",
      title: "Промо: подзаголовок",
      type: "string",
    }),
    defineField({
      name: "promoHref",
      title: "Промо: ссылка кнопки",
      type: "string",
    }),
    defineField({
      name: "promoImage",
      title: "Промо: картинка",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Главная страница" }) },
});
