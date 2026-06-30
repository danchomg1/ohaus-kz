import { Roboto, Open_Sans } from "next/font/google";

// Headings, buttons, navigation
export const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

// Body text
export const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-open-sans",
});
