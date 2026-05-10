import type { Metadata } from "next";
import {
  Playfair_Display,
  Bebas_Neue,
  DM_Sans,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Clarota Tattoo",
  description:
    "Tatuadora especialista em Trash Tattoo, Blackwork e Geek. Agendamentos via WhatsApp ou Instagram.",
  openGraph: {
    title: "Clarota Tattoo",
    description:
      "Tatuadora especialista em Trash Tattoo, Blackwork e Geek. Agendamentos via WhatsApp ou Instagram.",
  },
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
