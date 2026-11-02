// O conteúdo é editado pelo painel em /keystatic, que grava os arquivos em content/*.json.
// Os nomes exportados aqui são os que os componentes consomem — mantenha-os estáveis.
import artist from "@/content/artist.json";
import contact from "@/content/contact.json";
import portfolio from "@/content/portfolio.json";
import styles from "@/content/styles.json";
import testimonials from "@/content/testimonials.json";
import type { PortfolioCategory } from "@/lib/categories";

export type PortfolioAspect = "tall" | "square" | "wide";

export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  style: string;
  aspect: PortfolioAspect;
  image: string;
};

export const ARTIST = artist;
export const CONTACT = contact;
export const STYLES = styles.items;
export const TESTIMONIALS = testimonials.items;

export const PORTFOLIO_ITEMS: PortfolioItem[] = portfolio.items.map((item) => ({
  slug: item.title.slug,
  title: item.title.name,
  category: item.category as PortfolioCategory,
  style: item.style,
  aspect: item.aspect as PortfolioAspect,
  image: item.image,
}));

/** Texto alternativo descritivo: é o que o Google Imagens e leitores de tela leem. */
export function portfolioAlt(item: PortfolioItem): string {
  const by = `${ARTIST.name}, tatuadora em ${ARTIST.city}`;
  switch (item.category) {
    case "tatuagens":
      return `Tatuagem ${item.style} "${item.title}" feita por ${by}`;
    case "disponiveis":
      return `Flash ${item.style} disponível para tatuar: "${item.title}", desenho de ${by}`;
    case "autorais":
      return `Ilustração autoral "${item.title}" de ${by}`;
  }
}
