"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { ARTIST, CONTACT, type PortfolioItem } from "@/lib/content";
import { categoryLabel } from "@/lib/categories";

type MuseumHudProps = {
  items: PortfolioItem[];
  index: number;
  /** 0 a 1: fração das obras já carregadas. */
  progress: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

function whatsappLink(title: string): string {
  const text = `${CONTACT.whatsappMessage} (vi a arte "${title}" no museu do site)`;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

const CARD =
  "pointer-events-auto rounded-sm border border-[#2a2433] bg-[#0a0a0a]/80 p-6 backdrop-blur-md shadow-[0_0_60px_-20px_rgba(124,58,237,0.45)]";

const ROUND_BUTTON =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[#2a2433] text-[#e8e0f0] hover:bg-[#7c3aed] hover:border-[#7c3aed] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-[#2a2433]";

export default function MuseumHud({ items, index, progress, onSelect, onPrev, onNext }: MuseumHudProps) {
  const loading = progress < 1;
  const current = index >= 0 ? items[index] : null;
  const thumbsRef = useRef<HTMLElement>(null);

  // Com muitas obras a faixa de miniaturas rola: mantém a obra atual visível.
  useEffect(() => {
    if (index < 0) return;
    const thumb = thumbsRef.current?.children[index];
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      {/* Vinheta: escurece as bordas e puxa o olhar para o centro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#08080a]/95 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#08080a]/80 to-transparent" />

      {/* Topo */}
      <div className="relative flex items-center justify-between px-8 py-6">
        <Link
          href="/#portfolio"
          className="pointer-events-auto inline-flex items-center gap-2 font-heading text-sm tracking-[0.3em] text-[#8b8597] hover:text-[#e8e0f0] transition-colors"
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
              className={`${CARD} w-[360px]`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-sm tracking-[0.4em] text-[#a855f7]">
                  {categoryLabel(current.category).toUpperCase()}
                </span>
                <span className="font-heading text-sm tracking-[0.2em] text-[#8b8597]">
                  {pad(index + 1)} / {pad(items.length)}
                </span>
              </div>
              <h1 className="mt-2 font-display text-2xl font-bold italic leading-tight text-[#e8e0f0]">
                {current.title}
              </h1>
              <p className="mt-1 font-editorial text-lg italic text-[#8b8597]">
                Arte por {ARTIST.name}
              </p>
              <div className="mt-5 flex items-center gap-2">
                <button onClick={onPrev} aria-label="Obra anterior" className={ROUND_BUTTON}>
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={onNext}
                  disabled={index === items.length - 1}
                  aria-label="Próxima obra"
                  className={ROUND_BUTTON}
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
              className={`${CARD} w-[380px]`}
            >
              <span className="font-heading text-sm tracking-[0.4em] text-[#a855f7]">BEM-VINDO</span>
              <h1 className="mt-2 font-display text-3xl font-black italic leading-tight text-[#e8e0f0]">
                {items.length} obras em <span className="text-[#a855f7]">exposição</span>
              </h1>
              <p className="mt-2 font-sans text-sm text-[#8b8597]">
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

      {/* Miniaturas: pular direto para qualquer obra */}
      <nav
        ref={thumbsRef}
        aria-label="Obras"
        className="pointer-events-auto absolute bottom-8 left-1/2 flex max-w-[34vw] -translate-x-1/2 gap-2 overflow-x-auto p-1"
      >
        {items.map((item, i) => (
          <button
            key={item.slug}
            onClick={() => onSelect(i)}
            aria-label={item.title}
            aria-current={i === index}
            className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border transition-all duration-300 ${
              i === index
                ? "border-[#a855f7] opacity-100 -translate-y-1 shadow-[0_0_18px_-2px_rgba(168,85,247,0.7)]"
                : "border-[#2a2433] opacity-50 hover:opacity-90"
            }`}
          >
            {/* Mesmo arquivo da textura 3D: já está em cache, não baixa de novo */}
            <img src={item.image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </nav>

      {/* Controles */}
      <ul className="absolute bottom-8 right-8 space-y-1 text-right font-heading text-xs tracking-[0.25em] text-[#8b8597]">
        <li>
          <span className="text-[#e8e0f0]">← →</span> NAVEGAR
        </li>
        <li>
          <span className="text-[#e8e0f0]">CLIQUE</span> CHEGAR PERTO
        </li>
        <li>
          <span className="text-[#e8e0f0]">ARRASTE</span> OLHAR EM VOLTA
        </li>
        <li>
          <span className="text-[#e8e0f0]">ESC</span> ENTRADA
        </li>
      </ul>

      {/* Carregamento */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#08080a]"
          >
            <p className="font-display text-4xl font-black italic text-[#e8e0f0]">
              {ARTIST.name}
              <span className="text-[#a855f7]">.</span>
            </p>
            <span className="font-heading text-sm tracking-[0.4em] text-[#7c3aed]">
              MONTANDO A EXPOSIÇÃO
            </span>
            <div className="h-px w-48 bg-[#1e1e1e]">
              <div
                className="h-px bg-[#a855f7] transition-[width] duration-300"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
