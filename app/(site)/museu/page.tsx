import type { Metadata } from "next";
import CursorGlow from "@/components/shared/CursorGlow";
import NoiseOverlay from "@/components/shared/NoiseOverlay";
import MuseumLoader from "@/components/museum/MuseumLoader";

export const metadata: Metadata = {
  title: "Museu · Clarota Tattoo",
  description: "Passeie por uma galeria 3D com os trabalhos da Clarota.",
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
