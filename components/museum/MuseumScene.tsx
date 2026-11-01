"use client";

import { Suspense, use, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ARTIST, PORTFOLIO_ITEMS } from "@/lib/content";
import Artwork from "./Artwork";
import MuseumHud from "./MuseumHud";
import MuseumRoom, { useMuseumAssets } from "./MuseumRoom";
import TourCamera from "./TourCamera";
import { artworkPose, overviewPose, roomLength } from "./layout";
import { loadMuseumFonts } from "./textures";

// -1 = entrada, com a visão do corredor inteiro.
const ENTRANCE = -1;

export default function MuseumScene() {
  const items = PORTFOLIO_ITEMS;
  // As plaquetas e o letreiro são desenhados com as fontes do site — espera elas baixarem.
  const fonts = use(loadMuseumFonts());
  const assets = useMuseumAssets();
  const [index, setIndex] = useState(ENTRANCE);
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());

  const pose = useMemo(
    () => (index === ENTRANCE ? overviewPose(items.length) : artworkPose(index)),
    [index, items.length],
  );

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, items.length - 1)), [items.length]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, ENTRANCE)), []);
  const markLoaded = useCallback(
    (slug: string) =>
      setLoaded((current) => (current.has(slug) ? current : new Set(current).add(slug))),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "arrowright" || key === "d") next();
      else if (key === "arrowleft" || key === "a") prev();
      else if (key === "escape") setIndex(ENTRANCE);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const initial = overviewPose(items.length);

  return (
    <div className="fixed inset-0 bg-[#08080a]">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ fov: 50, near: 0.1, far: 80, position: initial.position }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#08080a"]} />
        <fog attach="fog" args={["#08080a", 10, roomLength(items.length) + 12]} />
        <MuseumRoom
          artworkCount={items.length}
          fonts={fonts}
          artistName={ARTIST.name}
          artistTitle={ARTIST.title}
        />
        {items.map((item, i) => (
          // Suspense por obra: cada uma aparece assim que a foto chega, e o progresso anda.
          <Suspense key={item.slug} fallback={null}>
            <Artwork
              index={i}
              item={item}
              artist={ARTIST.name}
              fonts={fonts}
              assets={assets}
              active={i === index}
              onSelect={setIndex}
              onLoaded={markLoaded}
            />
          </Suspense>
        ))}
        <TourCamera pose={pose} />
      </Canvas>
      <MuseumHud
        items={items}
        index={index}
        progress={loaded.size / items.length}
        onSelect={setIndex}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
