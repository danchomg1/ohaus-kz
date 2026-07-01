import { defineField, defineType } from "sanity";

/** Настройки сайта (синглтон): логотип, контакты, футер. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Логотип",
      type: "image",
      description: "Горизонтальный логотип (SVG/PNG, прозрачный фон).",
    }),
    defineField({
      name: "companyName",
      title: "Название компании",
      type: "string",
      initialValue: "OHAUS Kazakhstan",
    }),
    defineField({
      name: "address",
      title: "Адрес",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "workingHours",
      title: "Часы работы",
      type: "string",
    }),
    defineField({
      name: "dealerUrl",
      title: "Ссылка «Вход для дилеров»",
      type: "url",
    }),
  ],
  preview: { prepare: () => ({ title: "Настройки сайта" }) },
});
