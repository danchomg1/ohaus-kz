/**
 * Google Analytics 4.
 *
 * Идентификатор берётся из переменной окружения NEXT_PUBLIC_GA_ID вида
 * «G-XXXXXXXXXX». Пока она не задана, скрипт аналитики на страницы не
 * подключается вовсе — сайт работает как работал, лишних запросов нет.
 *
 * Префикс NEXT_PUBLIC_ обязателен: идентификатор нужен в браузере. Секретом
 * он не является — его и так видно в коде любой страницы с аналитикой.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const analyticsEnabled = GA_ID.startsWith("G-");

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/** Просмотр страницы. Отправляем вручную: см. GoogleAnalytics.tsx. */
export function trackPageView(path: string, title?: string): void {
  if (!analyticsEnabled || typeof window === "undefined") return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
}

/**
 * Событие. Названия берём из списка рекомендованных GA4, где они есть:
 * по ним аналитика сама строит отчёты, не требуя ручной настройки.
 */
export function trackEvent(name: string, params: GtagParams = {}): void {
  if (!analyticsEnabled || typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/** Отправленная заявка — главное целевое действие сайта. */
export function trackLead(product?: string): void {
  trackEvent("generate_lead", {
    // Без этого поля GA4 не покажет заявку в отчётах по конверсиям.
    currency: "KZT",
    value: 0,
    form_name: "request",
    product: product || "не указан",
  });
}
