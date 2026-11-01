"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// three.js só é baixado aqui, e só depois de confirmar que o aparelho aguenta.
const MuseumScene = dynamic(() => import("./MuseumScene"), { ssr: false });

type Support = "checking" | "ok" | "small-screen" | "no-webgl";

function detectSupport(): Support {
  if (window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) return "small-screen";
  const probe = document.createElement("canvas");
  if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return "no-webgl";
  return "ok";
}

let cachedSupport: Support | null = null;
const getSupport = (): Support => (cachedSupport ??= detectSupport());
const subscribe = () => () => {};

const MESSAGES: Record<Exclude<Support, "ok" | "checking">, string> = {
  "small-screen": "O museu 3D foi feito para computador. No celular, o portfólio do site mostra todas as artes.",
  "no-webgl": "Seu navegador não suporta gráficos 3D. O portfólio do site mostra todas as artes.",
};

export default function MuseumLoader() {
  const support = useSyncExternalStore<Support>(subscribe, getSupport, () => "checking");

  if (support === "ok") return <MuseumScene />;
  if (support === "checking") return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-heading text-sm tracking-[0.4em] text-[#7c3aed]">MUSEU</span>
      <p className="max-w-sm font-editorial text-xl italic text-[#e8e0f0]">{MESSAGES[support]}</p>
      <Link
        href="/#portfolio"
        className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/40 px-6 py-2 font-heading text-sm tracking-[0.3em] text-[#a855f7] hover:bg-[#7c3aed] hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        VER PORTFÓLIO
      </Link>
    </div>
  );
}
