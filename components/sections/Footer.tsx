import Link from "next/link";
import { ARTIST, CONTACT } from "@/lib/content";
import { IMAGE_RIGHTS_PATH } from "@/lib/site";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Estilos", href: "#estilos" },
  { label: "Processo", href: "#processo" },
  // { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#1e1e1e] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-display text-3xl font-black italic text-[#e8e0f0]">
              {ARTIST.name}
              <span className="text-[#a855f7]">.</span>
            </span>
            <span className="font-sans text-sm text-[#6b7280]">
              {ARTIST.title} ·{" "}
              <strong className="text-[#a855f7] font-sans">
                {ARTIST.city}
              </strong>
            </span>
          </div>

          {/* Nav */}
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-heading text-sm tracking-wide text-[#6b7280] hover:text-[#e8e0f0] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex gap-4">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs tracking-[0.3em] px-4 py-2 border border-[#1e1e1e] text-[#6b7280] rounded-full hover:border-[#7c3aed]/50 hover:text-[#a855f7] transition-all"
            >
              INSTAGRAM
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs tracking-[0.3em] px-4 py-2 border border-[#1e1e1e] text-[#6b7280] rounded-full hover:border-[#7c3aed]/50 hover:text-[#a855f7] transition-all"
            >
              WHATSAPP
            </a>
          </div>
        </div>

        <div className="border-t border-[#1e1e1e] pt-8 flex flex-col items-center gap-4">
          {/* <p className="font-editorial text-xl md:text-2xl italic text-[#e8e0f0]/40 text-center">
            "A pele é o canvas mais honesto que existe."
          </p> */}
          <p className="font-sans text-xs text-[#6b7280]">
            © {new Date().getFullYear()} {ARTIST.name} · Feito com 🖤 ·{" "}
            <Link href={IMAGE_RIGHTS_PATH} className="hover:text-[#a855f7] transition-colors">
              Direitos de uso das imagens
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
