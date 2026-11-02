import { ARTIST } from "@/lib/content";

// URL pública usada em canonical, Open Graph, sitemap e JSON-LD.
// Em produção na Vercel cai no domínio de produção do projeto se NEXT_PUBLIC_SITE_URL não existir.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = `${ARTIST.name} Tattoo`;

export const SITE_DESCRIPTION = `${ARTIST.name}: tatuadora e ilustradora em ${ARTIST.city}. ${ARTIST.specialties.join(", ")} e projetos autorais. Veja o portfólio e peça seu orçamento pelo WhatsApp.`;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
