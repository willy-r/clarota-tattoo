"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { ROOM, benchPositionsZ, roomLength } from "./layout";
import {
  createFloorTexture,
  createLightPoolTexture,
  createRugTexture,
  createSignTexture,
  createWallTexture,
  type MuseumFonts,
} from "./textures";

const PURPLE = "#7c3aed";
const BASEBOARD_HEIGHT = 0.18;
const RUG_WIDTH = 1.5;

export type MuseumAssets = {
  lightPool: THREE.Texture;
};

/** Texturas compartilhadas por todas as obras — criadas uma vez e liberadas ao sair. */
export function useMuseumAssets(): MuseumAssets {
  const assets = useMemo(() => ({ lightPool: createLightPoolTexture() }), []);
  useEffect(() => () => assets.lightPool.dispose(), [assets]);
  return assets;
}

function repeated(texture: THREE.Texture, x: number, y: number): THREE.Texture {
  const copy = texture.clone();
  copy.wrapS = THREE.RepeatWrapping;
  copy.wrapT = THREE.RepeatWrapping;
  copy.repeat.set(x, y);
  copy.needsUpdate = true;
  return copy;
}

type MuseumRoomProps = {
  artworkCount: number;
  fonts: MuseumFonts;
  artistName: string;
  artistTitle: string;
};

export default function MuseumRoom({ artworkCount, fonts, artistName, artistTitle }: MuseumRoomProps) {
  const length = roomLength(artworkCount);
  const depth = length + ROOM.entranceZ;
  const centerZ = (ROOM.entranceZ - length) / 2;
  const width = ROOM.halfWidth * 2;
  const railX = ROOM.halfWidth - 0.08 - ROOM.fixtureOffset;

  const textures = useMemo(() => {
    const wall = createWallTexture();
    const floor = createFloorTexture();
    const rug = createRugTexture();
    return {
      sideWall: repeated(wall, depth / ROOM.height, 1),
      endWall: repeated(wall, width / ROOM.height, 1),
      floor: repeated(floor, 1, depth / 4),
      rug: repeated(rug, 1, depth / 2),
      sign: createSignTexture(fonts, artistName, artistTitle),
    };
  }, [depth, width, fonts, artistName, artistTitle]);

  useEffect(() => () => Object.values(textures).forEach((t) => t.dispose()), [textures]);

  return (
    <group>
      {/* Piso translúcido: os reflexos das obras ficam por baixo dele */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, centerZ]} renderOrder={1}>
        <planeGeometry args={[width, depth]} />
        <meshBasicMaterial map={textures.floor} transparent opacity={0.86} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, centerZ]} renderOrder={2}>
        <planeGeometry args={[RUG_WIDTH, depth]} />
        <meshBasicMaterial map={textures.rug} />
      </mesh>

      {/* Teto e trilhos das luminárias */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM.height, centerZ]}>
        <planeGeometry args={[width, depth]} />
        <meshBasicMaterial color="#070709" />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * railX, ROOM.height - 0.03, centerZ]}>
          <boxGeometry args={[0.05, 0.04, depth]} />
          <meshBasicMaterial color="#1c1a21" />
        </mesh>
      ))}

      {/* Paredes laterais */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          rotation={[0, (-side * Math.PI) / 2, 0]}
          position={[side * ROOM.halfWidth, ROOM.height / 2, centerZ]}
        >
          <planeGeometry args={[depth, ROOM.height]} />
          <meshBasicMaterial map={textures.sideWall} />
        </mesh>
      ))}

      {/* Fundo, com o letreiro neon, e entrada */}
      <mesh position={[0, ROOM.height / 2, -length]}>
        <planeGeometry args={[width, ROOM.height]} />
        <meshBasicMaterial map={textures.endWall} />
      </mesh>
      <mesh position={[0, 2.4, -length + 0.02]}>
        <planeGeometry args={[4.4, 2.2]} />
        {/* Neon atravessa a névoa: fog desligado só no letreiro */}
        <meshBasicMaterial map={textures.sign} transparent toneMapped={false} fog={false} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, ROOM.height / 2, ROOM.entranceZ]}>
        <planeGeometry args={[width, ROOM.height]} />
        <meshBasicMaterial map={textures.endWall} />
      </mesh>

      {/* Rodapé com neon roxo, e o reflexo do neon sob o piso */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * (ROOM.halfWidth - 0.02), 0, centerZ]}>
          <mesh position={[0, BASEBOARD_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.04, BASEBOARD_HEIGHT, depth]} />
            <meshBasicMaterial color="#0b0a0e" />
          </mesh>
          {[1, -1].map((mirror) => (
            <mesh key={mirror} position={[-side * 0.03, mirror * (BASEBOARD_HEIGHT + 0.01), 0]}>
              <boxGeometry args={[0.025, 0.025, depth]} />
              <meshBasicMaterial color={PURPLE} toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Bancos no meio do corredor */}
      {benchPositionsZ(artworkCount).map((z) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[0, 0.44, 0]}>
            <boxGeometry args={[0.55, 0.07, 1.9]} />
            <meshLambertMaterial color="#2b2231" />
          </mesh>
          {[-0.75, 0.75].map((legZ) => (
            <mesh key={legZ} position={[0, 0.2, legZ]}>
              <boxGeometry args={[0.45, 0.4, 0.07]} />
              <meshLambertMaterial color="#0d0c10" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Única luz real: só molduras, luminárias e bancos usam material iluminado */}
      <hemisphereLight args={["#e6def5", "#0a0a0a", 2.4]} />
    </group>
  );
}
