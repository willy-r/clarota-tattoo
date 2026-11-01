"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { PORTFOLIO_ITEMS } from "@/lib/content";
import Artwork from "./Artwork";
import MuseumHud from "./MuseumHud";
import MuseumRoom from "./MuseumRoom";
import TourCamera from "./TourCamera";
import { ROOM, artworkPose, overviewPose } from "./layout";

// -1 = entrada, com a visão do corredor inteiro.
const ENTRANCE = -1;

function createLightPoolTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D indisponível");
  const gradient = ctx.createRadialGradient(size / 2, size * 0.42, 0, size / 2, size * 0.42, size / 2);
  gradient.addColorStop(0, "rgba(255, 244, 230, 0.9)");
  gradient.addColorStop(0.45, "rgba(255, 240, 225, 0.3)");
  gradient.addColorStop(1, "rgba(255, 240, 225, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function MuseumScene() {
  const items = PORTFOLIO_ITEMS;
  const [index, setIndex] = useState(ENTRANCE);
  const lightPool = useMemo(createLightPoolTexture, []);
  const pose = useMemo(
    () => (index === ENTRANCE ? overviewPose(items.length) : artworkPose(index)),
    [index, items.length],
  );

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, items.length - 1)), [items.length]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, ENTRANCE)), []);

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
    <div className="fixed inset-0 bg-[#0a0a0a]">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50, near: 0.1, far: 80, position: initial.position }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 7, ROOM.artSpacing * 9]} />
        <MuseumRoom artworkCount={items.length} />
        <Suspense fallback={null}>
          {items.map((item, i) => (
            <Artwork
              key={item.slug}
              index={i}
              image={item.image}
              active={i === index}
              lightPool={lightPool}
              onSelect={setIndex}
            />
          ))}
        </Suspense>
        <TourCamera pose={pose} />
      </Canvas>
      <MuseumHud items={items} index={index} onPrev={prev} onNext={next} />
    </div>
  );
}
