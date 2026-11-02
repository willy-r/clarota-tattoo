"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Em tela de toque não há cursor: nada de listeners nem loop de animação gastando bateria.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.translate = `${e.clientX - 4}px ${e.clientY - 4}px`;
      }
    };

    const animate = () => {
      glow.current.x = lerp(glow.current.x, mouse.current.x, 0.08);
      glow.current.y = lerp(glow.current.y, mouse.current.y, 0.08);
      if (glowRef.current) {
        glowRef.current.style.translate = `${glow.current.x - 20}px ${glow.current.y - 20}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Event delegation — picks up all elements, including those rendered later by React
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role=button]")) {
        if (dotRef.current) dotRef.current.style.scale = "3";
        if (glowRef.current) {
          glowRef.current.style.scale = "2";
          glowRef.current.style.opacity = "0.8";
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role=button]")) {
        if (dotRef.current) dotRef.current.style.scale = "1";
        if (glowRef.current) {
          glowRef.current.style.scale = "1";
          glowRef.current.style.opacity = "";
        }
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-coarse:hidden pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-[#a855f7] transition-[scale] duration-150 ease-out"
        aria-hidden
      />
      <div
        ref={glowRef}
        className="pointer-coarse:hidden pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 rounded-full bg-[#a855f7]/20 blur-md transition-[scale,opacity] duration-200"
        aria-hidden
      />
    </>
  );
}
