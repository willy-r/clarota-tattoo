"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { CameraPose } from "./layout";

const MOVE_SMOOTHING = 2.6;
const LOOK_SMOOTHING = 3.2;
const DRAG_SENSITIVITY = 0.0035;
const MAX_YAW = 0.7;
const MAX_PITCH = 0.35;
// Abaixo disso a câmera é considerada parada e o canvas para de renderizar.
const SETTLED = 0.0005;

type TourCameraProps = { pose: CameraPose };

/**
 * Leva a câmera suavemente até a pose da obra atual. Arrastar o mouse olha em volta
 * (com limite), e ao soltar o olhar volta sozinho para a obra.
 *
 * O canvas roda em frameloop "demand": só pede frame novo enquanto algo está se mexendo.
 */
export default function TourCamera({ pose }: TourCameraProps) {
  const camera = useThree((state) => state.camera);
  const canvas = useThree((state) => state.gl.domElement);
  const invalidate = useThree((state) => state.invalidate);
  const target = useRef(new THREE.Vector3(...pose.position));
  const look = useRef(new THREE.Vector3(...pose.lookAt));
  const lookTarget = useRef(new THREE.Vector3(...pose.lookAt));
  const drag = useRef({ active: false, x: 0, y: 0, yaw: 0, pitch: 0 });

  useEffect(() => {
    target.current.set(...pose.position);
    lookTarget.current.set(...pose.lookAt);
    invalidate();
  }, [pose, invalidate]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.active) return;
      d.yaw = THREE.MathUtils.clamp(d.yaw + (e.clientX - d.x) * DRAG_SENSITIVITY, -MAX_YAW, MAX_YAW);
      d.pitch = THREE.MathUtils.clamp(d.pitch + (e.clientY - d.y) * DRAG_SENSITIVITY, -MAX_PITCH, MAX_PITCH);
      d.x = e.clientX;
      d.y = e.clientY;
      invalidate();
    };
    const onUp = () => {
      drag.current.active = false;
      invalidate();
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [canvas, invalidate]);

  useFrame((_, dt) => {
    const d = drag.current;
    if (!d.active) {
      d.yaw = THREE.MathUtils.damp(d.yaw, 0, 3, dt);
      d.pitch = THREE.MathUtils.damp(d.pitch, 0, 3, dt);
    }

    const p = camera.position;
    p.set(
      THREE.MathUtils.damp(p.x, target.current.x, MOVE_SMOOTHING, dt),
      THREE.MathUtils.damp(p.y, target.current.y, MOVE_SMOOTHING, dt),
      THREE.MathUtils.damp(p.z, target.current.z, MOVE_SMOOTHING, dt),
    );
    const l = look.current;
    l.set(
      THREE.MathUtils.damp(l.x, lookTarget.current.x, LOOK_SMOOTHING, dt),
      THREE.MathUtils.damp(l.y, lookTarget.current.y, LOOK_SMOOTHING, dt),
      THREE.MathUtils.damp(l.z, lookTarget.current.z, LOOK_SMOOTHING, dt),
    );

    camera.lookAt(l);
    camera.rotateY(d.yaw);
    camera.rotateX(d.pitch);

    const moving =
      d.active ||
      Math.abs(d.yaw) > SETTLED ||
      Math.abs(d.pitch) > SETTLED ||
      p.distanceTo(target.current) > SETTLED ||
      l.distanceTo(lookTarget.current) > SETTLED;
    if (moving) invalidate();
  });

  return null;
}
