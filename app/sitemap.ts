import type { MetadataRoute } from "next";
import { PORTFOLIO_ITEMS } from "@/lib/content";
import { IMAGE_RIGHTS_PATH, absoluteUrl } from "@/lib/site";

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
    { url: absoluteUrl(IMAGE_RIGHTS_PATH), changeFrequency: "yearly", priority: 0.2 },
  ];
}
