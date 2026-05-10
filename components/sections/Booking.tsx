"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT } from "@/lib/content";

const STEPS = [
  {
    icon: "📩",
    title: "Envie sua ideia",
    description: "Mande referências e descrição do que você imagina.",
  },
  {
    icon: "💬",
    title: "Consulta",
    description: "Uma conversa para entender sua visão, estilo e localização.",
  },
  {
    icon: "✏️",
    title: "Projeto",
    description: "Eu crio o design exclusivo para a sua pele e a gente discute o orçamento.",
  },
  {
    icon: "🪡",
    title: "Sessão",
    description: "Hora de tatuar. Ambiente seguro, materiais esterilizados.",
  },
  {
    icon: "🖤",
    title: "Arte eterna",
    description: "Sua história marcada para sempre.",
  },
];

export default function Booking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="processo" className="py-16 md:py-32 bg-[#111111]">
      <div className="mx-auto max-w-2xl px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="font-heading text-sm tracking-[0.4em] text-[#7c3aed] mb-3">PROCESSO</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black italic text-[#e8e0f0] leading-tight">
            Como funciona<br />
            <span className="text-[#a855f7]">o agendamento</span>
          </h2>
        </motion.div>

        {/* Timeline — single column, always */}
        <div className="relative pl-14">
          {/* Vertical line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-[#1e1e1e]" />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative"
              >
                {/* Node */}
                <div className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#7c3aed] bg-[#111111] text-lg">
                  {step.icon}
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-heading text-[10px] tracking-[0.3em] text-[#7c3aed]">
                    ETAPA {i + 1}
                  </span>
                  <h3 className="font-display font-bold italic text-lg md:text-xl text-[#e8e0f0]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-[#6b7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-heading text-lg md:text-2xl tracking-[0.15em] px-10 py-4 md:px-12 md:py-5 bg-[#7c3aed] text-white rounded-full hover:bg-[#a855f7] transition-all duration-300 purple-glow overflow-hidden"
          >
            <span className="relative z-10">QUERO MINHA TATTOO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
