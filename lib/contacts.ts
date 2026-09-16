import type { SiteSettings } from "@/sanity/lib/queries";

/**
 * Контакты представительства. Это значения по умолчанию: если в Studio
 * («Настройки сайта») заполнены свои, показываются они.
 */
export const DEFAULT_CONTACTS = {
  companyName: "OHAUS Kazakhstan",
  city: "Астана",
  address: "Проспект Тауелсиздик, 22а, БЦ «Quorum», офис 607",
  phone: "+7 723 291-00-95",
  email: "info@scht.kz",
  workingHours: "Пн–Пт, 09:00–18:00",
} as const;

export type Contacts = {
  companyName: string;
  city: string;
  address: string;
  phone: string;
  /** Телефон без пробелов и дефисов — для ссылки tel: */
  phoneHref: string;
  email: string;
  workingHours: string;
  /** Полный адрес одной строкой — для разметки и карт. */
  fullAddress: string;
  /** Ссылка на точку на карте. */
  mapUrl: string;
};

/** Телефон в машинном виде для ссылки: «+7 723 291-00-95» → «+77232910095». */
export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^\d+]/g, "");
}

/** Настройки из Studio поверх значений по умолчанию. */
export function resolveContacts(settings?: SiteSettings | null): Contacts {
  const address = settings?.address?.trim() || DEFAULT_CONTACTS.address;
  const phone = settings?.phone?.trim() || DEFAULT_CONTACTS.phone;
  // Если адрес задан в Studio, город может быть уже внутри него.
  const city = settings?.address?.trim() ? "" : DEFAULT_CONTACTS.city;
  const fullAddress = city ? `${city}, ${address}` : address;

  return {
    companyName: settings?.companyName?.trim() || DEFAULT_CONTACTS.companyName,
    city,
    address,
    phone,
    phoneHref: telHref(phone),
    email: settings?.email?.trim() || DEFAULT_CONTACTS.email,
    workingHours:
      settings?.workingHours?.trim() || DEFAULT_CONTACTS.workingHours,
    fullAddress,
    mapUrl: `https://2gis.kz/search/${encodeURIComponent(fullAddress)}`,
  };
}
