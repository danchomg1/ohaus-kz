import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNav, getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [segments, settings] = await Promise.all([
    getNav(),
    getSiteSettings(),
  ]);

  const logoUrl = settings?.logo?.asset
    ? urlFor(settings.logo as never)
        .height(72)
        .url()
    : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Header segments={segments} logoUrl={logoUrl} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
