"use client";

import { useEffect, useMemo, useState } from "react";
import { useLoader, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { categoryLabel } from "@/lib/categories";
import type { PortfolioItem } from "@/lib/content";
import { ROOM, artSlot } from "./layout";
import { createPlaqueTexture, type MuseumFonts } from "./textures";
import type { MuseumAssets } from "./MuseumRoom";

const FRAME_DEPTH = 0.08;
const FRAME_BORDER = 0.07;
const PASSEPARTOUT = 0.16;
const PLAQUE_SIZE: [number, number] = [0.8, 0.45];
const PLAQUE_Y = 1.25;
const MAX_ANISOTROPY = 4;
// Acima disso (em px) o gesto foi arrastar para olhar, não clicar na obra.
const CLICK_DRAG_TOLERANCE = 4;

type ArtworkProps = {
  index: number;
  item: PortfolioItem;
  artist: string;
  fonts: MuseumFonts;
  assets: MuseumAssets;
  active: boolean;
  onSelect: (index: number) => void;
  onLoaded: (slug: string) => void;
};

function fitSize(aspect: number): [number, number] {
  return aspect >= 1
    ? [ROOM.artMaxSize, ROOM.artMaxSize / aspect]
    : [ROOM.artMaxSize * aspect, ROOM.artMaxSize];
}

/** Luminária no trilho do teto, apontada para o centro da obra (coordenadas locais da obra). */
function useFixture() {
  return useMemo(() => {
    const position = new THREE.Vector3(0, ROOM.height - 0.12, ROOM.fixtureOffset);
    const target = new THREE.Vector3(0, ROOM.artCenterY, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      position.clone().sub(target).normalize(),
    );
    return { position, quaternion };
  }, []);
}

type FramedArtProps = {
  texture: THREE.Texture;
  size: [number, number];
  highlighted: boolean;
};

/** Moldura + passe-partout + obra. Renderizado duas vezes: a obra e o reflexo no piso. */
function FramedArt({ texture, size: [width, height], highlighted }: FramedArtProps) {
  const matW = width + PASSEPARTOUT * 2;
  const matH = height + PASSEPARTOUT * 2;
  return (
    <group position={[0, ROOM.artCenterY, 0]}>
      <mesh position={[0, 0, -FRAME_DEPTH / 2]}>
        <boxGeometry args={[matW + FRAME_BORDER * 2, matH + FRAME_BORDER * 2, FRAME_DEPTH]} />
        <meshLambertMaterial color={highlighted ? "#3b2366" : "#1b1a1f"} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[matW, matH]} />
        <meshBasicMaterial color="#0e0d11" side={THREE.DoubleSide} />
      </mesh>
      {/* A obra fica sem iluminação, para as cores aparecerem fiéis à foto */}
      <mesh position={[0, 0, 0.004]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function Artwork({
  index,
  item,
  artist,
  fonts,
  assets,
  active,
  onSelect,
  onLoaded,
}: ArtworkProps) {
  const texture = useLoader(THREE.TextureLoader, item.image);
  const [hovered, setHovered] = useState(false);
  const fixture = useFixture();
  const { base, rotationY } = artSlot(index);
  const highlighted = active || hovered;

  const size = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = MAX_ANISOTROPY;
    const img = texture.image as { width: number; height: number };
    return fitSize(img.width / img.height);
  }, [texture]);

  const plaque = useMemo(
    () =>
      createPlaqueTexture(fonts, {
        label: categoryLabel(item.category),
        title: item.title,
        artist,
        number: index + 1,
      }),
    [fonts, item.category, item.title, artist, index],
  );
  useEffect(() => () => plaque.dispose(), [plaque]);

  useEffect(() => onLoaded(item.slug), [onLoaded, item.slug]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta > CLICK_DRAG_TOLERANCE) return;
    e.stopPropagation();
    onSelect(index);
  };

  const plaqueX = size[0] / 2 + PASSEPARTOUT + FRAME_BORDER + 0.25 + PLAQUE_SIZE[0] / 2;

  return (
    <group position={base} rotation={[0, rotationY, 0]}>
      {/* Mancha de luz do spot na parede */}
      {/* A obra fica 0.08 à frente da parede; a mancha fica logo antes do reboco */}
      <mesh position={[0, ROOM.artCenterY + 0.35, -FRAME_DEPTH + 0.005]}>
        <planeGeometry args={[size[0] + 3.4, size[1] + 3]} />
        <meshBasicMaterial
          map={assets.lightPool}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={highlighted ? 1 : 0.8}
        />
      </mesh>

      <mesh position={fixture.position} quaternion={fixture.quaternion}>
        <cylinderGeometry args={[0.07, 0.09, 0.26, 16]} />
        <meshLambertMaterial color="#141317" />
      </mesh>

      <group
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <FramedArt texture={texture} size={size} highlighted={highlighted} />
      </group>

      {/* Reflexo no piso: a mesma obra espelhada abaixo do chão translúcido */}
      <group scale={[1, -1, 1]}>
        <FramedArt texture={texture} size={size} highlighted={highlighted} />
      </group>

      <mesh position={[plaqueX, PLAQUE_Y, 0.005]}>
        <planeGeometry args={PLAQUE_SIZE} />
        <meshBasicMaterial map={plaque} />
      </mesh>
    </group>
  );
}
