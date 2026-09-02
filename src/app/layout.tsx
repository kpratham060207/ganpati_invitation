import type { Metadata } from "next";
import {
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { invitationConfig } from "@/config/invitation";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
});

const notoGujarati = Noto_Sans_Gujarati({
  variable: "--font-noto-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: invitationConfig.meta.title,
  description: invitationConfig.meta.description,
  openGraph: {
    title: invitationConfig.meta.title,
    description: invitationConfig.meta.description,
    type: "website",
    locale: "en_IN",
  },
};

/** Mobile-first viewport — full-bleed on notched phones, no accidental zoom on tap. */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${notoDevanagari.variable} ${notoGujarati.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
