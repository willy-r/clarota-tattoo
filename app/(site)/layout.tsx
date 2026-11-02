import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Bebas_Neue,
  DM_Sans,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import { ARTIST, CONTACT } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, googleSiteVerification } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

// "Fortaleza, CE" → "Fortaleza", para as buscas do tipo "tatuadora fortaleza".
const CITY_NAME = ARTIST.city.split(",")[0].trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Tatuadora em ${ARTIST.city}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: ARTIST.name, url: CONTACT.instagramUrl }],
  creator: ARTIST.name,
  keywords: [
    "tatuadora",
    `tatuagem ${CITY_NAME}`,
    `tatuadora ${CITY_NAME}`,
    ...ARTIST.specialties.map((s) => s.toLowerCase()),
    "flash tattoo",
    "ilustração",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} · Tatuadora em ${ARTIST.city}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Tatuadora em ${ARTIST.city}`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  verification: { google: googleSiteVerification() },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${bebas.variable} ${dmSans.variable} ${cormorant.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
