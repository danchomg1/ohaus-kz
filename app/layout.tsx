import type { Metadata } from "next";
import { roboto, openSans } from "./fonts";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  // Базовый адрес: без него canonical и ссылки Open Graph получаются
  // относительными, а они обязаны быть абсолютными.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — весы и лабораторное оборудование`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — весы и лабораторное оборудование`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: absoluteUrl("/home/hero-bg-explorer.jpg"),
        width: 1920,
        height: 560,
        alt: "Лабораторные весы OHAUS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — весы и лабораторное оборудование`,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/home/hero-bg-explorer.jpg")],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${roboto.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-ohaus-bg font-sans text-ohaus-ink">
        {children}
      </body>
    </html>
  );
}
