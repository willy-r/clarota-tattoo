import type { MetadataRoute } from "next";
import { PORTFOLIO_ITEMS } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
      // Image sitemap: ajuda as fotos do portfólio a aparecerem no Google Imagens.
      images: PORTFOLIO_ITEMS.map((item) => absoluteUrl(item.image)),
    },
    { url: absoluteUrl("/museu"), changeFrequency: "monthly", priority: 0.5 },
  ];
}
