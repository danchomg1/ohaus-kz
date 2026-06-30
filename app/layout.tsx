import type { Metadata } from "next";
import { roboto, openSans } from "./fonts";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
      <body className="flex min-h-screen flex-col bg-ohaus-bg font-sans text-ohaus-ink">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
