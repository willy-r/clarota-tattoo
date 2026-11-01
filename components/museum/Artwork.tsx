"use client";

import { useMemo, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { ROOM, artSlot } from "./layout";

const FRAME_DEPTH = 0.08;
const FRAME_BORDER = 0.09;
const PASSEPARTOUT = 0.14;
// Acima disso (em px) o gesto foi arrastar para olhar, não clicar na obra.
const CLICK_DRAG_TOLERANCE = 4;

type ArtworkProps = {
  index: number;
  image: string;
  active: boolean;
  lightPool: THREE.Texture;
  onSelect: (index: number) => void;
};

function fitSize(aspect: number): [number, number] {
  return aspect >= 1
    ? [ROOM.artMaxSize, ROOM.artMaxSize / aspect]
    : [ROOM.artMaxSize * aspect, ROOM.artMaxSize];
}

export default function Artwork({ index, image, active, lightPool, onSelect }: ArtworkProps) {
  const texture = useTexture(image);
  const maxAnisotropy = useThree((state) => state.gl.capabilities.getMaxAnisotropy());
  const [hovered, setHovered] = useState(false);

  const [width, height] = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = maxAnisotropy;
    const img = texture.image as { width: number; height: number };
    return fitSize(img.width / img.height);
  }, [texture, maxAnisotropy]);

  const { position, rotationY } = artSlot(index);
  const highlighted = active || hovered;
  const matW = width + PASSEPARTOUT * 2;
  const matH = height + PASSEPARTOUT * 2;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta > CLICK_DRAG_TOLERANCE) return;
    e.stopPropagation();
    onSelect(index);
  };

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Facho de luz na parede, como um spot de galeria. Falso de propósito: N spots reais pesam. */}
      <mesh position={[0, 0.35, -FRAME_DEPTH / 2 - 0.02]}>
        <planeGeometry args={[matW + 2.6, matH + 2.4]} />
        <meshBasicMaterial
          map={lightPool}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={highlighted ? 0.55 : 0.32}
          toneMapped={false}
        />
      </mesh>

      <group
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Moldura */}
        <mesh position={[0, 0, -FRAME_DEPTH / 2]}>
          <boxGeometry args={[matW + FRAME_BORDER * 2, matH + FRAME_BORDER * 2, FRAME_DEPTH]} />
          <meshStandardMaterial
            color="#161616"
            roughness={0.45}
            metalness={0.3}
            emissive="#7c3aed"
            emissiveIntensity={highlighted ? 0.1 : 0}
          />
        </mesh>
        {/* Passe-partout */}
        <mesh position={[0, 0, 0.002]}>
          <planeGeometry args={[matW, matH]} />
          <meshBasicMaterial color="#0d0d0d" toneMapped={false} />
        </mesh>
        {/* A obra — sem iluminação, para as cores aparecerem fiéis à foto */}
        <mesh position={[0, 0, 0.004]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
