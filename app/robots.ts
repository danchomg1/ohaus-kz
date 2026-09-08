import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt — первое, что запрашивает поисковый робот. Главное здесь —
 * ссылка на карту сайта: без неё робот ищет страницы вслепую, переходя
 * по ссылкам.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio", // панель управления контентом
          "/search", // результаты поиска плодят бесконечные адреса
          "/quote", // форма запроса цен
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
