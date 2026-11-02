import type { Metadata } from "next";
import KeystaticApp from "./keystatic";
import { isKeystaticEnabled } from "@/lib/keystatic";

export const metadata: Metadata = {
  title: "Painel · Clarota Tattoo",
  robots: { index: false, follow: false },
};

// Root layout próprio: o CSS do site (cursor: none, fontes, tema) não pode vazar para o painel.
export default function KeystaticLayout() {
  return (
    <html lang="pt-BR">
      <body>
        {isKeystaticEnabled() ? (
          <KeystaticApp />
        ) : (
          <p style={{ fontFamily: "system-ui", padding: 32 }}>
            Painel ainda não configurado. Veja docs/PAINEL.md.
          </p>
        )}
      </body>
    </html>
  );
}
