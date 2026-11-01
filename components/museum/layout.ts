// Geometria do museu: um corredor ao longo de -Z, com as obras alternando entre as paredes.
export const ROOM = {
  halfWidth: 5,
  height: 4.5,
  entranceZ: 6,
  firstArtZ: -2,
  artSpacing: 3.2,
  endPadding: 5,
  artCenterY: 1.8,
  artMaxSize: 2.4,
} as const;

const EYE_HEIGHT = 1.7;
const VIEW_DISTANCE = 4.3;
// Olhar um pouco abaixo do centro da obra a sobe na tela, longe da plaqueta no rodapé.
const LOOK_DROP = 0.2;

export type Vec3 = [number, number, number];

export type ArtSlot = {
  position: Vec3;
  rotationY: number;
  // Direção para onde a obra "olha" (para o centro do corredor).
  normalX: 1 | -1;
};

export type CameraPose = { position: Vec3; lookAt: Vec3 };

export function roomLength(count: number): number {
  return -ROOM.firstArtZ + Math.max(count - 1, 0) * ROOM.artSpacing + ROOM.endPadding;
}

export function artSlot(index: number): ArtSlot {
  const onLeftWall = index % 2 === 0;
  const wallX = onLeftWall ? -ROOM.halfWidth : ROOM.halfWidth;
  // Afasta um pouco da parede para a moldura não atravessar o reboco.
  const x = wallX + (onLeftWall ? 0.08 : -0.08);
  return {
    position: [x, ROOM.artCenterY, ROOM.firstArtZ - index * ROOM.artSpacing],
    rotationY: onLeftWall ? Math.PI / 2 : -Math.PI / 2,
    normalX: onLeftWall ? 1 : -1,
  };
}

export function overviewPose(count: number): CameraPose {
  return {
    position: [0, 2, ROOM.entranceZ - 1.5],
    lookAt: [0, 1.6, -roomLength(count) / 2],
  };
}

export function artworkPose(index: number): CameraPose {
  const { position, normalX } = artSlot(index);
  const [x, y, z] = position;
  return {
    position: [x + normalX * VIEW_DISTANCE, EYE_HEIGHT, z],
    lookAt: [x, y - LOOK_DROP, z],
  };
}
