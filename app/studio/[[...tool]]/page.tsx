import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export { viewport } from "next-sanity/studio";

// Панель управления не должна попадать в поиск: данные она без входа не
// покажет, но публичная админка в выдаче — приглашение перебирать пароли.
// Дополнительно закрыта в robots.txt.
export const metadata: Metadata = {
  ...studioMetadata,
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <Studio />;
}
