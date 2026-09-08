import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getSitemapEntries } from "@/sanity/lib/queries";

export const revalidate = 3600;

/**
 * Карта сайта. Разделы и карточки товаров берутся из Sanity, поэтому новый
 * товар попадает сюда сам — вести список руками не нужно.
 *
 * Страницы поиска и запроса цен сюда не входят: они закрыты в robots.txt,
 * а карта сайта не должна противоречить ему.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/products"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/support"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contacts"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/news"), changeFrequency: "weekly", priority: 0.5 },
  ];

  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const entries = await getSitemapEntries();
    dynamicPages = entries.map((e) => ({
      url: absoluteUrl(e.path),
      lastModified: e.updatedAt ? new Date(e.updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: e.path.split("/").length > 3 ? 0.8 : 0.7,
    }));
  } catch {
    // Если CMS недоступна, отдаём хотя бы статичную часть: пустая или
    // оборванная карта сайта хуже, чем неполная.
  }

  return [...staticPages, ...dynamicPages];
}
