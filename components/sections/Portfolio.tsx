"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Share2, X } from "lucide-react";
import {
  PORTFOLIO_ITEMS,
  ARTIST,
  CONTACT,
  type PortfolioItem,
} from "@/lib/content";

export default function Portfolio() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
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
    if (containerRef.current) containerRef.current.style.cursor = "zoom-in";
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
      zoomedRef.current = true;
    } else {
      imgRef.current.style.transition = "transform 0.3s ease";
      imgRef.current.style.transform = "scale(1)";
      containerRef.current.style.cursor = "zoom-in";
      zoomedRef.current = false;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
          className="mb-12"
        >
          <p className="font-heading text-sm tracking-[0.4em] text-[#7c3aed] mb-3">
            PORTFÓLIO
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic text-[#e8e0f0] leading-tight">
            Minhas
            <br />
            <span className="text-[#a855f7]">artes</span>
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
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
                  alt={item.title}
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
          className="flex flex-col w-[90vw] max-w-[90vw] sm:max-w-3xl max-h-[85vh] gap-0 p-0 bg-[#0d0d0d] border-[#1e1e1e] text-[#e8e0f0] overflow-hidden"
        >
          <DialogTitle className="sr-only">{selected?.title}</DialogTitle>

          {/* Image area */}
          <div
            ref={containerRef}
            className="relative flex-1 min-h-0 bg-[#0d0d0d] overflow-hidden"
            style={{
              minHeight: "300px",
              cursor: "zoom-in",
            }}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
          >
            {selected && (
              <Image
                ref={imgRef as React.Ref<HTMLImageElement>}
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(max-width: 768px) 90vw, 768px"
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
                Arte por {ARTIST.name}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xs tracking-[0.2em] px-3 py-1.5 border border-[#7c3aed]/40 text-[#a855f7] rounded-full hover:bg-[#7c3aed] hover:text-white transition-all duration-200"
              >
                INSTAGRAM
              </a>
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
