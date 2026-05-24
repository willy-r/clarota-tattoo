# Clarota Tattoo — Portfolio

Site de portfólio single-page para a tatuadora Clarota. Construído com Next.js 16, React 19, Tailwind CSS v4 e Framer Motion.

![Preview da página inicial](./docs/page.png)

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** — configurado via `app/globals.css` com `@theme {}`, sem `tailwind.config.js`
- **Framer Motion** — animações de entrada por seção
- **shadcn/ui + Base UI** — componentes de UI

## Estrutura

```
app/
  page.tsx              # página principal — renderiza todas as seções em ordem
  layout.tsx            # layout raiz, metadados SEO
  globals.css           # tokens de design (@theme), classes utilitárias, fontes
  opengraph-image.tsx   # imagem OG gerada dinamicamente

components/
  sections/             # Hero, About, Portfolio, Styles, Testimonials, Booking, Contact, Footer
  shared/               # CursorGlow, Navbar, ScrollProgress, NoiseOverlay

lib/
  content.ts            # todo o conteúdo do site (ARTIST, CONTACT, STATS, STYLES, TESTIMONIALS, PORTFOLIO_ITEMS)

public/
  portfolio/*.webp      # imagens do portfólio
  profile.jpg           # foto da artista

docs/
  design-spec.md        # especificação de cores, tipografia e layout
```

## Comandos

```bash
npm run dev      # servidor de desenvolvimento em http://localhost:3000
npm run build    # build de produção (também valida tipos TypeScript)
npm run start    # serve o build de produção
```

## Conteúdo

**Todo o conteúdo do site está em `lib/content.ts`.** Nunca hardcode textos dentro dos componentes. Para alterar nome, bio, estilos, depoimentos ou itens do portfólio, edite apenas esse arquivo.

## Fontes

| Classe           | Fonte              | Uso                   |
| ---------------- | ------------------ | --------------------- |
| `font-display`   | Playfair Display   | Títulos, nome no hero |
| `font-heading`   | Bebas Neue         | Labels, UI, CTAs      |
| `font-sans`      | DM Sans            | Corpo de texto        |
| `font-editorial` | Cormorant Garamond | Citações em itálico   |

## Deploy

Recomendado via [Vercel](https://vercel.com). Basta conectar o repositório — nenhuma variável de ambiente é necessária.

## Licença

[CC BY-NC 4.0](./LICENSE) — uso não comercial permitido com atribuição.
