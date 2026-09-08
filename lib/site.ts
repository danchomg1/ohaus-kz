/**
 * Постоянные сайта для метаданных: канонические адреса, Open Graph, карта
 * сайта и разметка данных.
 *
 * Хост именно с www: ohaus.kz отдаёт на него постоянный редирект, и
 * канонический адрес должен указывать на конечную страницу, а не на редирект.
 */
export const SITE_URL = "https://www.ohaus.kz";

export const SITE_NAME = "OHAUS Kazakhstan";

export const SITE_DESCRIPTION =
  "Официальное представительство OHAUS в Казахстане: лабораторные и промышленные весы, анализаторы влажности, центрифуги, шейкеры, гири. Подбор оборудования, поставка, сервис и поверка.";

/** Абсолютный адрес страницы — для canonical и Open Graph. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Описание для мета-тега: поисковики показывают в сниппете около 160 символов,
 * дальше текст обрезается многоточием на полуслове. Режем по границе слова.
 */
export function metaDescription(text?: string, limit = 160): string {
  const s = (text ?? "").replace(/\s+/g, " ").trim();
  if (!s) return SITE_DESCRIPTION;
  if (s.length <= limit) return s;
  const cut = s.slice(0, limit - 1);
  const stop = cut.lastIndexOf(" ");
  return (
    (stop > limit * 0.6 ? cut.slice(0, stop) : cut).replace(/[,;:—-]$/, "") +
    "…"
  );
}
