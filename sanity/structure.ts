import type { StructureResolver } from "sanity/structure";

/** Кастомная структура: синглтоны «Главная» и «Настройки» + списки. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Контент")
    .items([
      S.listItem()
        .title("Главная")
        .id("homepage")
        .child(
          S.document().schemaType("homepage").documentId("homepage"),
        ),
      S.listItem()
        .title("Настройки сайта")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("product").title("Товары"),
      S.documentTypeListItem("subcategory").title("Подкатегории"),
      S.documentTypeListItem("segment").title("Сегменты"),
      S.documentTypeListItem("newsArticle").title("Новости"),
    ]);
