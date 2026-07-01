import type { Metadata } from "next";
import { roboto, openSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OHAUS Kazakhstan — весы и лабораторное оборудование",
    template: "%s | OHAUS Kazakhstan",
  },
  description:
    "Официальное представительство OHAUS в Казахстане: весы, лабораторное оборудование, анализаторы влажности, гири и поддержка.",
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
