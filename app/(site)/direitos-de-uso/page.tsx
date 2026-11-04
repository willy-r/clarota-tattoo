import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { ARTIST, CONTACT } from "@/lib/content";
import { IMAGE_RIGHTS_PATH, IMAGE_RIGHTS_REQUEST_ANCHOR } from "@/lib/site";

const title = "Direitos de uso das imagens";
const description = `As fotos e desenhos de ${ARTIST.name} são protegidos por direitos autorais. Veja como pedir autorização de uso.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: IMAGE_RIGHTS_PATH },
};

const requestMessage = `Olá ${ARTIST.name}! Gostaria de pedir autorização para usar uma imagem do seu portfólio.`;

export default function ImageRightsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 font-heading text-sm tracking-[0.3em] text-[#6b7280] hover:text-[#e8e0f0] transition-colors"
        >
          <ArrowLeft size={16} />
          VOLTAR AO PORTFÓLIO
        </Link>

        <p className="mt-12 font-heading text-sm tracking-[0.4em] text-[#7c3aed]">DIREITOS DE USO</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-black italic leading-tight text-[#e8e0f0]">
          Todos os direitos <span className="text-[#a855f7]">reservados</span>
        </h1>

        <div className="mt-10 space-y-6 font-sans text-base leading-relaxed text-[#b4adc0]">
          <p>
            Todas as fotos de tatuagens, flashes e ilustrações publicadas neste site são de autoria de{" "}
            <strong className="text-[#e8e0f0]">{ARTIST.name}</strong> e protegidas pela Lei de Direitos
            Autorais (Lei nº 9.610/98).
          </p>
          <p>
            Sem autorização por escrito, não é permitido copiar, reproduzir, modificar, redistribuir ou usar
            essas imagens para fins comerciais, nem tatuar os desenhos com outro profissional.
          </p>
          <p>
            Os <strong className="text-[#e8e0f0]">flashes disponíveis</strong> são desenhos exclusivos: para
            tatuar um deles, é só agendar com a própria {ARTIST.name}.
          </p>
          <p>
            Compartilhar o link do site ou repostar com crédito nas redes sociais (marcando{" "}
            <a href={CONTACT.instagramUrl} className="text-[#a855f7] hover:underline" target="_blank" rel="noopener noreferrer">
              {CONTACT.instagram}
            </a>
            ) é sempre bem-vindo.
          </p>
        </div>

        <section
          id={IMAGE_RIGHTS_REQUEST_ANCHOR}
          className="mt-14 rounded-sm border border-[#1e1e1e] bg-[#111111] p-8"
        >
          <h2 className="font-display text-2xl font-bold italic text-[#e8e0f0]">Pedir autorização</h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[#6b7280]">
            Quer usar uma imagem em matéria, divulgação ou outro projeto? Conte qual imagem e como pretende
            usar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(requestMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-6 py-3 font-heading text-sm tracking-[0.2em] text-white hover:bg-[#a855f7] transition-colors"
            >
              <MessageCircle size={16} />
              WHATSAPP
            </a>
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Autorização de uso de imagem")}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/40 px-6 py-3 font-heading text-sm tracking-[0.2em] text-[#a855f7] hover:bg-[#7c3aed] hover:text-white transition-colors"
            >
              <Mail size={16} />
              E-MAIL
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
