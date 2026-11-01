"use client";

import { MeshReflectorMaterial } from "@react-three/drei";
import { ROOM, roomLength } from "./layout";

const WALL_COLOR = "#1f1c24";
const PURPLE = "#7c3aed";
const MAX_CEILING_LIGHTS = 6;

type MuseumRoomProps = { artworkCount: number };

export default function MuseumRoom({ artworkCount }: MuseumRoomProps) {
  const length = roomLength(artworkCount);
  const depth = length + ROOM.entranceZ;
  const centerZ = (ROOM.entranceZ - length) / 2;
  const width = ROOM.halfWidth * 2;
  const lightCount = Math.min(MAX_CEILING_LIGHTS, Math.max(2, Math.ceil(depth / 8)));

  return (
    <group>
      {/* Piso polido: reflete as obras e os neons */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, centerZ]}>
        <planeGeometry args={[width, depth]} />
        <MeshReflectorMaterial
          resolution={512}
          blur={[300, 80]}
          mixBlur={1}
          mixStrength={14}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          roughness={0.85}
          metalness={0.5}
          color="#0b0b0b"
        />
      </mesh>

      {/* Teto */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM.height, centerZ]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#09090b" roughness={1} />
      </mesh>

      {/* Paredes laterais */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          rotation={[0, (-side * Math.PI) / 2, 0]}
          position={[side * ROOM.halfWidth, ROOM.height / 2, centerZ]}
        >
          <planeGeometry args={[depth, ROOM.height]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.95} />
        </mesh>
      ))}

      {/* Fundo e entrada */}
      <mesh position={[0, ROOM.height / 2, -length]}>
        <planeGeometry args={[width, ROOM.height]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.95} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, ROOM.height / 2, ROOM.entranceZ]}>
        <planeGeometry args={[width, ROOM.height]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.95} />
      </mesh>

      {/* Neon roxo no rodapé das duas paredes e um trilho de luz no teto */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (ROOM.halfWidth - 0.03), 0.03, centerZ]}>
          <boxGeometry args={[0.04, 0.04, depth]} />
          <meshBasicMaterial color={PURPLE} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, ROOM.height - 0.02, centerZ]}>
        <boxGeometry args={[0.03, 0.01, depth]} />
        <meshBasicMaterial color="#5b536b" toneMapped={false} />
      </mesh>

      {/* Neon na parede do fundo, fechando a perspectiva do corredor */}
      <mesh position={[0, ROOM.artCenterY, -length + 0.02]}>
        <ringGeometry args={[0.9, 0.96, 64]} />
        <meshBasicMaterial color={PURPLE} toneMapped={false} />
      </mesh>

      <ambientLight intensity={0.7} />
      {Array.from({ length: lightCount }, (_, i) => (
        <pointLight
          key={i}
          position={[0, ROOM.height - 1.1, ROOM.entranceZ - ((i + 0.5) * depth) / lightCount]}
          intensity={28}
          distance={14}
          decay={2}
          color="#e9e2f5"
        />
      ))}
      <pointLight position={[0, ROOM.artCenterY, -length + 1]} intensity={6} distance={6} color={PURPLE} />
    </group>
  );
}
