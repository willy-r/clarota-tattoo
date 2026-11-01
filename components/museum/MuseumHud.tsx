"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useProgress } from "@react-three/drei";
import { ARTIST, CONTACT, type PortfolioItem } from "@/lib/content";

type MuseumHudProps = {
  items: PortfolioItem[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

function whatsappLink(title: string): string {
  const text = `${CONTACT.whatsappMessage} (vi a arte "${title}" no museu do site)`;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function MuseumHud({ items, index, onPrev, onNext }: MuseumHudProps) {
  const { progress, active } = useProgress();
  const loading = active || progress < 100;
  const current = index >= 0 ? items[index] : null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      {/* Topo */}
      <div className="flex items-center justify-between px-8 py-6">
        <Link
          href="/#portfolio"
          className="pointer-events-auto inline-flex items-center gap-2 font-heading text-sm tracking-[0.3em] text-[#6b7280] hover:text-[#e8e0f0] transition-colors"
        >
          <ArrowLeft size={16} />
          VOLTAR AO SITE
        </Link>
        <p className="font-display text-xl font-black italic text-[#e8e0f0]">
          {ARTIST.name}
          <span className="text-[#a855f7]">.</span>{" "}
          <span className="font-heading text-sm not-italic font-normal tracking-[0.4em] text-[#7c3aed]">
            MUSEU
          </span>
        </p>
      </div>

      {/* Escurece o rodapé para a plaqueta e os controles lerem bem sobre o neon do piso */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />

      {/* Plaqueta da obra / boas-vindas */}
      <div className="absolute bottom-8 left-8">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-auto w-[360px] rounded-sm border border-[#1e1e1e] bg-[#0a0a0a]/85 p-6 backdrop-blur-md"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-sm tracking-[0.4em] text-[#7c3aed]">
                  {current.style.toUpperCase()}
                </span>
                <span className="font-heading text-sm tracking-[0.2em] text-[#6b7280]">
                  {pad(index + 1)} / {pad(items.length)}
                </span>
              </div>
              <h1 className="mt-2 font-display text-2xl font-bold italic leading-tight text-[#e8e0f0]">
                {current.title}
              </h1>
              <p className="mt-1 font-editorial text-lg italic text-[#6b7280]">
                Arte por {ARTIST.name}
              </p>
              <div className="mt-5 flex items-center gap-2">
                <button
                  onClick={onPrev}
                  aria-label="Obra anterior"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e1e1e] text-[#e8e0f0] hover:bg-[#7c3aed] transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={onNext}
                  disabled={index === items.length - 1}
                  aria-label="Próxima obra"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e1e1e] text-[#e8e0f0] hover:bg-[#7c3aed] transition-colors disabled:opacity-30 disabled:hover:bg-[#1e1e1e]"
                >
                  <ChevronRight size={16} />
                </button>
                <a
                  href={whatsappLink(current.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-4 py-2 font-heading text-sm tracking-[0.15em] text-white hover:bg-[#a855f7] transition-colors"
                >
                  <MessageCircle size={14} />
                  QUERO UMA ASSIM
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-auto w-[380px] rounded-sm border border-[#1e1e1e] bg-[#0a0a0a]/85 p-6 backdrop-blur-md"
            >
              <span className="font-heading text-sm tracking-[0.4em] text-[#7c3aed]">
                BEM-VINDO
              </span>
              <h1 className="mt-2 font-display text-3xl font-black italic leading-tight text-[#e8e0f0]">
                {items.length} obras em <span className="text-[#a855f7]">exposição</span>
              </h1>
              <p className="mt-2 font-sans text-sm text-[#6b7280]">
                Caminhe pelo corredor e veja cada trabalho de perto.
              </p>
              <button
                onClick={onNext}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-5 py-2 font-heading text-sm tracking-[0.2em] text-white hover:bg-[#a855f7] transition-colors"
              >
                COMEÇAR A VISITA
                <ChevronRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controles */}
      <ul className="absolute bottom-8 right-8 space-y-1 text-right font-heading text-xs tracking-[0.25em] text-[#6b7280]">
        <li>← → OU A D · NAVEGAR</li>
        <li>CLIQUE NA OBRA · CHEGAR PERTO</li>
        <li>ARRASTE · OLHAR EM VOLTA</li>
        <li>ESC · VOLTAR À ENTRADA</li>
      </ul>

      {/* Carregamento */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]"
          >
            <span className="font-heading text-sm tracking-[0.4em] text-[#7c3aed]">
              MONTANDO A EXPOSIÇÃO
            </span>
            <div className="h-px w-48 bg-[#1e1e1e]">
              <div
                className="h-px bg-[#a855f7] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
