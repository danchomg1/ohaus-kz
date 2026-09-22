/**
 * Картинки к «Особенностям», которых нет в Sanity.
 *
 * Обычно они приходят с ru.ohaus.com вместе с текстами (см.
 * scripts/import-content.ts). Но у части товаров картинок нет и у самого
 * производителя: например, у терминала TD52XW разметка ссылается на файлы
 * TD52XP-USP1…3.jpg, которых нет ни под одним написанием — все отдают 404.
 * Для таких товаров кладём файлы в /public и перечисляем их здесь.
 *
 * Список явный, а не «попробовать угадать путь»: иначе на карточках без
 * запасных картинок вместо фото показывалась бы ошибка загрузки.
 *
 * Картинка из Sanity всегда в приоритете — как только её туда зальют,
 * запасная перестаёт использоваться.
 */
export const FEATURE_IMAGE_FALLBACK: Record<string, string[]> = {
  // Многофункциональный терминал TD52XW: дисплей, разъёмы, внутренняя плата.
  td52xw: [
    "/features/td52xw/1.jpg",
    "/features/td52xw/2.jpg",
    "/features/td52xw/3.jpg",
  ],
};

/** Запасная картинка для особенности №index товара, если она задана. */
export function featureFallback(
  slug: string | undefined,
  index: number,
): string | undefined {
  if (!slug) return undefined;
  return FEATURE_IMAGE_FALLBACK[slug]?.[index];
}
