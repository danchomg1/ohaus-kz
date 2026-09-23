"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  GA_ID,
  analyticsEnabled,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";

/**
 * Считает просмотры страниц. Отдельный компонент, потому что useSearchParams
 * требует Suspense: без него страница перестала бы собираться статически.
 */
function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams.toString();
    trackPageView(pathname + (qs ? `?${qs}` : ""));
  }, [pathname, searchParams]);

  return null;
}

/**
 * Звонки и письма — целевые действия наравне с заявкой. Ловим их одним
 * обработчиком на документе, чтобы не трогать каждую ссылку в шапке,
 * подвале, контактах и на странице заявки.
 */
function ContactClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent("contact_click", { method: "phone", link_url: href });
      } else if (href.startsWith("mailto:")) {
        trackEvent("contact_click", { method: "email", link_url: href });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export default function GoogleAnalytics() {
  // Нет идентификатора — ничего не подключаем: ни скрипта, ни запросов.
  if (!analyticsEnabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // Просмотры отправляем сами при каждой смене адреса: переходы внутри
          // сайта идут без перезагрузки, и автоматический счётчик их не видит.
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
      <ContactClicks />
    </>
  );
}
