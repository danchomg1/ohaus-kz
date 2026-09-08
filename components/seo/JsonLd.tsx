import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/site";

/**
 * Разметка Schema.org для поисковиков: машиночитаемая справка о том, что за
 * страница и что на ней. По ней в выдаче появляются хлебные крошки вместо
 * голого адреса и карточка организации.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Данные наши, не пользовательские; экранируем «<», чтобы содержимое
      // не могло закрыть тег раньше времени.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Организация — на главной. Её поисковик показывает карточкой компании. */
export function OrganizationJsonLd({
  phone,
  email,
  address,
}: {
  phone?: string;
  email?: string;
  address?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        alternateName: "ОХАУС Казахстан",
        url: SITE_URL,
        logo: absoluteUrl("/logo.png"),
        description: SITE_DESCRIPTION,
        ...(email ? { email } : {}),
        ...(phone
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                telephone: phone,
                contactType: "sales",
                areaServed: "KZ",
                availableLanguage: ["ru", "kk"],
              },
            }
          : {}),
        ...(address
          ? {
              address: {
                "@type": "PostalAddress",
                addressCountry: "KZ",
                streetAddress: address,
              },
            }
          : {}),
      }}
    />
  );
}

/** Хлебные крошки — чтобы в выдаче был путь, а не адрес страницы. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { title: string; href?: string }[];
}) {
  const all = [{ title: "Главная", href: "/" }, ...items];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          ...(c.href ? { item: absoluteUrl(c.href) } : {}),
        })),
      }}
    />
  );
}

/** Товар — на карточке оборудования. */
export function ProductJsonLd({
  name,
  description,
  image,
  series,
  path,
}: {
  name: string;
  description?: string;
  image?: string;
  series?: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        ...(description ? { description } : {}),
        ...(image ? { image: [image] } : {}),
        brand: { "@type": "Brand", name: "OHAUS" },
        ...(series ? { model: series } : {}),
        url: absoluteUrl(path),
      }}
    />
  );
}

/** Представительство с адресом и телефоном — на странице контактов. */
export function LocalBusinessJsonLd({
  phone,
  email,
  address,
  hours,
}: {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE_NAME,
        url: absoluteUrl("/contacts"),
        image: absoluteUrl("/logo.png"),
        description: SITE_DESCRIPTION,
        ...(phone ? { telephone: phone } : {}),
        ...(email ? { email } : {}),
        ...(hours ? { openingHours: hours } : {}),
        ...(address
          ? {
              address: {
                "@type": "PostalAddress",
                addressCountry: "KZ",
                streetAddress: address,
              },
            }
          : {}),
      }}
    />
  );
}
