import { ARTIST, CONTACT, PORTFOLIO_ITEMS, portfolioAlt } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

// Dados estruturados (schema.org) para o Google entender que isto é um estúdio de tatuagem
// local, quem é a artista e quais são as imagens do portfólio.
export default function StructuredData() {
  const [city, region] = ARTIST.city.split(",").map((part) => part.trim());
  const artistId = absoluteUrl("/#artista");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TattooParlor",
        "@id": absoluteUrl("/#estudio"),
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: absoluteUrl("/"),
        image: absoluteUrl("/opengraph-image"),
        telephone: `+${CONTACT.whatsapp}`,
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: region,
          addressCountry: "BR",
        },
        areaServed: city,
        sameAs: [CONTACT.instagramUrl],
        founder: { "@id": artistId },
      },
      {
        "@type": "Person",
        "@id": artistId,
        name: ARTIST.name,
        jobTitle: ARTIST.title,
        description: ARTIST.bio,
        image: absoluteUrl("/profile.jpg"),
        knowsAbout: ARTIST.specialties,
        sameAs: [CONTACT.instagramUrl],
      },
      {
        "@type": "ImageGallery",
        "@id": absoluteUrl("/#portfolio"),
        name: `Portfólio de ${ARTIST.name}`,
        url: absoluteUrl("/#portfolio"),
        author: { "@id": artistId },
        image: PORTFOLIO_ITEMS.map((item) => ({
          "@type": "ImageObject",
          contentUrl: absoluteUrl(item.image),
          name: item.title,
          caption: portfolioAlt(item),
          creator: { "@id": artistId },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escapa "<" para o conteúdo do painel nunca conseguir fechar a tag <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
