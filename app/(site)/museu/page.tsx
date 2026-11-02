import type { Metadata } from "next";
import { ARTIST, PORTFOLIO_ITEMS } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";
import CursorGlow from "@/components/shared/CursorGlow";
import NoiseOverlay from "@/components/shared/NoiseOverlay";
import MuseumLoader from "@/components/museum/MuseumLoader";

const title = "Museu 3D";
const description = `Passeie por uma galeria 3D com ${PORTFOLIO_ITEMS.length} trabalhos de ${ARTIST.name}: tatuagens, flashes disponíveis e arte autoral.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/museu" },
  openGraph: { title: `${title} · ${SITE_NAME}`, description, url: "/museu" },
};

export default function MuseumPage() {
  return (
    <main>
      <CursorGlow />
      <NoiseOverlay />
      <MuseumLoader />
    </main>
  );
}
