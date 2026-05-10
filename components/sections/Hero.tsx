"use client";

import { motion } from "framer-motion";
import { ARTIST, CONTACT } from "@/lib/content";

const letters = ARTIST.name.split("");

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4c1d95]/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-[#7c3aed]/10 blur-[100px]" />
      </div>

      {/* Floating badge */}
      <div className="hidden md:block absolute top-32 right-16 z-10">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div
            className="animate-spin-slow absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, #7c3aed, transparent)",
            }}
          />
          <div className="absolute inset-[2px] rounded-full bg-[#0a0a0a]" />
          <span className="relative font-heading text-[8px] tracking-[0.3em] text-[#a855f7] leading-tight text-center">
            ✦ ACEITANDO
            <br />
            CLIENTES ✦
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Sub-label above */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.35em] text-[#6b7280] mb-6 flex flex-wrap justify-center gap-x-2"
        >
          <span>{ARTIST.title}</span>
          <span>·</span>
          <strong className="text-[#a855f7] font-heading">{ARTIST.city}</strong>
        </motion.p>

        {/* Giant clipping mask name */}
        <div className="flex overflow-hidden">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display font-black italic text-[clamp(2.5rem,13vw,16rem)] leading-none select-none"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #e8e0f0 0%, #a855f7 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="my-6 h-px w-48 origin-left bg-gradient-to-r from-[#7c3aed] to-transparent"
        />

        {/* Tagline */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="font-editorial text-xl md:text-2xl italic text-[#6b7280] mb-10 max-w-md"
        >
          "Cada traço conta uma história que dura para sempre."
        </motion.p> */}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-heading text-base tracking-widest px-8 py-3 border border-[#7c3aed] text-[#e8e0f0] rounded-full hover:bg-[#7c3aed] transition-all duration-300"
          >
            Ver Portfólio
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-base tracking-widest px-8 py-3 bg-[#7c3aed] text-white rounded-full hover:bg-[#a855f7] transition-all duration-300 purple-glow"
          >
            Agendar agora
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="h-12 w-px overflow-hidden bg-[#1e1e1e]">
          <div
            className="h-full w-full bg-[#a855f7]"
            style={{ animation: "scroll-indicator 1.8s ease-in-out infinite" }}
          />
        </div>
        <span className="font-heading text-[10px] tracking-[0.4em] text-[#6b7280]">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
