"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Landmark, MessageCircle, Share2, X } from "lucide-react";
import {
  PORTFOLIO_ITEMS,
  ARTIST,
  CONTACT,
  portfolioAlt,
  type PortfolioItem,
} from "@/lib/content";
import {
  PORTFOLIO_CATEGORIES,
  categoryLabel,
  type PortfolioCategory,
} from "@/lib/categories";

const PAGE_SIZE = 9;

// Proporção usada até a foto carregar e informar a real (largura / altura).
const ASPECT_RATIO: Record<PortfolioItem["aspect"], number> = {
  tall: 3 / 4,
  square: 1,
  wide: 16 / 9,
};

// Só vira aba a categoria que tem pelo menos uma arte cadastrada.
const TABS = PORTFOLIO_CATEGORIES.map((category) => ({
  ...category,
  items: PORTFOLIO_ITEMS.filter((item) => item.category === category.value),
})).filter((tab) => tab.items.length > 0);

function flashWhatsappLink(title: string): string {
  const text = `${CONTACT.whatsappMessage} (quero tatuar o flash "${title}")`;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function Portfolio() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [activeTab, setActiveTab] = useState<PortfolioCategory>(TABS[0].value);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const tab = TABS.find((t) => t.value === activeTab) ?? TABS[0];
  const visibleItems = tab.items.slice(0, visibleCount);

  const selectTab = (value: PortfolioCategory) => {
    setActiveTab(value);
    setVisibleCount(PAGE_SIZE);
  };
  // Proporção real de cada foto já aberta: a área do zoom segue a foto em vez de sobrar faixa preta.
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const zoomedRef = useRef(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    zoomedRef.current = false;
    if (imgRef.current) {
      imgRef.current.style.transition = "transform 0.3s ease";
      imgRef.current.style.transform = "scale(1)";
      imgRef.current.style.transformOrigin = "50% 50%";
    }
    if (containerRef.current) {
      containerRef.current.style.cursor = "zoom-in";
      containerRef.current.style.touchAction = "manipulation";
    }
  }, [selected]);

  const getXY = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !containerRef.current) return;
    if (!zoomedRef.current) {
      const { x, y } = getXY(e);
      imgRef.current.style.transition = "transform 0.3s ease";
      imgRef.current.style.transformOrigin = `${x}% ${y}%`;
      imgRef.current.style.transform = "scale(2.5)";
      containerRef.current.style.cursor = "zoom-out";
      // Com zoom, arrastar o dedo explora a foto em vez de rolar a página
      containerRef.current.style.touchAction = "none";
      zoomedRef.current = true;
    } else {
      imgRef.current.style.transition = "transform 0.3s ease";
      imgRef.current.style.transform = "scale(1)";
      containerRef.current.style.cursor = "zoom-in";
      containerRef.current.style.touchAction = "manipulation";
      zoomedRef.current = false;
    }
  };

  // Pointer events cobrem mouse e toque: no celular, arrastar com zoom move a área ampliada.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!zoomedRef.current || !imgRef.current) return;
    const { x, y } = getXY(e);
    imgRef.current.style.transition = "none";
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <section id="portfolio" className="py-16 md:py-32 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between gap-6"
        >
          <div>
            <p className="font-heading text-sm tracking-[0.4em] text-[#7c3aed] mb-3">
              PORTFÓLIO
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic text-[#e8e0f0] leading-tight">
              Minhas
              <br />
              <span className="text-[#a855f7]">artes</span>
            </h2>
          </div>

          {/* O museu 3D é só para desktop; no celular fica só o mosaico */}
          <Link
            href="/museu"
            className="hidden md:inline-flex items-center gap-3 font-heading text-sm tracking-[0.3em] px-6 py-3 border border-[#7c3aed]/40 text-[#a855f7] rounded-full hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all duration-300"
          >
            <Landmark size={16} />
            VER EM MODO MUSEU
          </Link>
        </motion.div>

        {/* Abas por categoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8"
        >
          <div
            role="tablist"
            aria-label="Categorias do portfólio"
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1"
          >
            {TABS.map((t) => {
              const active = t.value === tab.value;
              return (
                <button
                  key={t.value}
                  role="tab"
                  id={`portfolio-tab-${t.value}`}
                  aria-selected={active}
                  aria-controls="portfolio-panel"
                  onClick={() => selectTab(t.value)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-5 py-2 font-heading text-sm tracking-[0.2em] transition-all duration-300 ${
                    active
                      ? "border-[#7c3aed] bg-[#7c3aed] text-white"
                      : "border-[#1e1e1e] text-[#6b7280] hover:border-[#7c3aed]/50 hover:text-[#e8e0f0]"
                  }`}
                >
                  {t.label.toUpperCase()}
                  <span className={active ? "text-white/70" : "text-[#4b5563]"}>
                    {t.items.length}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 font-editorial text-lg italic text-[#6b7280]">
            {tab.description}
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div
          id="portfolio-panel"
          role="tabpanel"
          aria-labelledby={`portfolio-tab-${tab.value}`}
          className="columns-2 md:columns-3 gap-3 space-y-3"
        >
          {visibleItems.map((item, i) => (
            <motion.div
              key={`${tab.value}-${item.slug}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % PAGE_SIZE) * 0.06 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setSelected(item)}
                className="group relative block w-full overflow-hidden rounded-sm border border-[#1e1e1e] hover:border-[#7c3aed]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                style={{
                  aspectRatio:
                    item.aspect === "tall"
                      ? "3/4"
                      : item.aspect === "wide"
                        ? "16/9"
                        : "1/1",
                }}
              >
                <Image
                  src={item.image}
                  alt={portfolioAlt(item)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <span className="font-display font-bold italic text-[#e8e0f0] text-sm">
                    {item.title}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {visibleCount < tab.items.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              className="font-heading text-sm tracking-[0.3em] px-8 py-3 border border-[#1e1e1e] text-[#e8e0f0] rounded-full hover:border-[#7c3aed] hover:text-[#a855f7] transition-all duration-300"
            >
              VER MAIS ({tab.items.length - visibleCount})
            </button>
          </div>
        )}

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="font-editorial text-lg italic text-[#6b7280]">
            Quer ver mais trabalhos?
          </p>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-heading text-sm tracking-[0.3em] px-8 py-3 border border-[#7c3aed]/40 text-[#a855f7] rounded-full hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed] transition-all duration-300"
          >
            <Share2 size={16} />
            VER MAIS NO INSTAGRAM
          </a>
        </motion.div>
      </div>

      {/* Lightbox dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="flex flex-col w-[92vw] max-w-[92vw] sm:max-w-4xl max-h-[90vh] gap-0 p-0 bg-[#0d0d0d] border-[#1e1e1e] text-[#e8e0f0] overflow-hidden"
        >
          <DialogTitle className="sr-only">{selected?.title}</DialogTitle>

          {/* Image area */}
          <div
            ref={containerRef}
            // A imagem usa `fill` (absoluta) e não dá altura ao container: a altura vem da
            // proporção da foto, com teto para caber na tela junto com o rodapé.
            className="relative w-full max-h-[60vh] sm:max-h-[72vh] shrink-0 bg-[#0d0d0d] overflow-hidden"
            style={{
              cursor: "zoom-in",
              aspectRatio: selected
                ? (ratios[selected.slug] ?? ASPECT_RATIO[selected.aspect])
                : undefined,
            }}
            onClick={handleImageClick}
            onPointerMove={handlePointerMove}
          >
            {selected && (
              <Image
                ref={imgRef as React.Ref<HTMLImageElement>}
                src={selected.image}
                alt={portfolioAlt(selected)}
                fill
                // Resolução cheia: o zoom amplia 2.5x, e a versão de 768px ficaria borrada.
                sizes="(max-width: 768px) 100vw, 1440px"
                onLoad={(e) => {
                  const { naturalWidth, naturalHeight } = e.currentTarget;
                  const slug = selected.slug;
                  setRatios((prev) =>
                    prev[slug] ? prev : { ...prev, [slug]: naturalWidth / naturalHeight },
                  );
                }}
                style={{ objectFit: "contain", willChange: "transform" }}
              />
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-3 border-t border-[#1e1e1e]">
            <div className="flex flex-col gap-0.5 min-w-0">
              <h3 className="font-display text-base font-bold italic text-[#e8e0f0] truncate">
                {selected?.title}
              </h3>
              <p className="font-sans text-xs text-[#6b7280]">
                {selected && categoryLabel(selected.category)} · Arte por{" "}
                {ARTIST.name}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {selected?.category === "disponiveis" ? (
                <a
                  href={flashWhatsappLink(selected.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-heading text-xs tracking-[0.2em] px-3 py-1.5 bg-[#7c3aed] text-white rounded-full hover:bg-[#a855f7] transition-all duration-200"
                >
                  <MessageCircle size={12} />
                  QUERO TATUAR
                </a>
              ) : (
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs tracking-[0.2em] px-3 py-1.5 border border-[#7c3aed]/40 text-[#a855f7] rounded-full hover:bg-[#7c3aed] hover:text-white transition-all duration-200"
                >
                  INSTAGRAM
                </a>
              )}
              <button
                onClick={() => setSelected(null)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e1e1e] text-[#6b7280] hover:bg-[#7c3aed] hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Fechar"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
