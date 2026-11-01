// O conteúdo é editado pelo painel em /keystatic, que grava os arquivos em content/*.json.
// Os nomes exportados aqui são os que os componentes consomem — mantenha-os estáveis.
import artist from "@/content/artist.json";
import contact from "@/content/contact.json";
import portfolio from "@/content/portfolio.json";
import styles from "@/content/styles.json";
import testimonials from "@/content/testimonials.json";

export type PortfolioAspect = "tall" | "square" | "wide";

export type PortfolioItem = {
  slug: string;
  title: string;
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
  style: item.style,
  aspect: item.aspect as PortfolioAspect,
  image: item.image,
}));
