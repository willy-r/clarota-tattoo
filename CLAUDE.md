@AGENTS.md

# CLAUDE.md — Portfólio Clara Tattoo

> Documento de planejamento e diretrizes para o desenvolvimento do site portfólio da tatuadora Clara.

---

## 🎯 Visão Geral do Projeto

Site **landing page + portfólio** para a tatuadora Clara. O objetivo é transmitir identidade artística forte, atrair novos clientes, e facilitar o contato direto. O site deve parecer uma peça de arte por si só — não um template genérico.

---

## 🖤💜 Identidade Visual & Direção Estética

### Paleta de Cores

```
--color-bg:         #0a0a0a       /* quase preto, fundo base */
--color-surface:    #111111       /* superfícies elevadas */
--color-border:     #1e1e1e       /* bordas sutis */
--color-purple:     #7c3aed       /* roxo primário (Violet 600) */
--color-purple-dim: #4c1d95       /* roxo escuro, profundidade */
--color-purple-glow:#a855f7       /* roxo brilhante, accent/glow */
--color-ink:        #e8e0f0       /* texto principal (levemente lilás) */
--color-muted:      #6b7280       /* texto secundário */
--color-white:      #fafafa       /* branco puro para contraste */
```

### Tom Estético

**Dark Editorial com toque de Arte Macabra Elegante.**

Referências visuais:

- Revistas de arte underground (Juxtapoz, Inked)
- Pôsteres de shows de rock/metal com tipografia impactante
- Exposições de galeria contemporânea de arte dark
- Motion design de tatuagens em slow-motion

**Palavras-chave:** Raw. Preciso. Eterno. Noturno. Artesanal. Ritualístico.

### Tipografia

- **Display / Títulos:** `Playfair Display` (serif dramático, peso 900 italic) — evoca tradição e arte
- **Sub-títulos / UI:** `Bebas Neue` (condensado, todo maiúsculo) — força, impacto
- **Corpo / Parágrafos:** `DM Sans` (limpo, moderno, boa leitura em dark mode)
- **Detalhe / Quote:** `Cormorant Garamond` italic — elegância editorial

Importar via `next/font/google`.

---

## 🏗️ Stack Técnica

| Tecnologia    | Versão          | Uso                                    |
| ------------- | --------------- | -------------------------------------- |
| Next.js       | 15 (App Router) | Framework principal                    |
| Tailwind CSS  | v4              | Estilização utilitária                 |
| shadcn/ui     | latest          | Componentes base (Dialog, Sheet, etc.) |
| Framer Motion | latest          | Animações e transições                 |
| next/image    | built-in        | Otimização de imagens do portfólio     |
| next/font     | built-in        | Fontes otimizadas                      |
| TypeScript    | 5+              | Tipagem                                |

### Notas de Configuração Tailwind v4

- Configurar via `@import "tailwindcss"` no CSS global (sem `tailwind.config.js` obrigatório)
- Usar CSS variables para o tema: `@theme { --color-purple: #7c3aed; }`
- Aproveitar as novas utilities de `text-shadow`, `mask-*`, e container queries

---

## 📐 Arquitetura de Páginas

### Estrutura de Arquivos

```
app/
  layout.tsx          # Root layout com fontes e metadados
  page.tsx            # Landing page (single-page com sections)
  globals.css         # Tema Tailwind v4 + CSS customizado

components/
  ui/                 # shadcn/ui components
  sections/
    Hero.tsx
    About.tsx
    Portfolio.tsx
    Styles.tsx
    Testimonials.tsx
    Booking.tsx
    Contact.tsx
    Footer.tsx
  shared/
    Navbar.tsx
    CursorGlow.tsx    # Cursor customizado com glow roxo
    NoiseOverlay.tsx  # Textura grain sobre o fundo
    ScrollProgress.tsx
```

---

## 📄 Seções da Landing Page

### 1. `<Hero />`

**O impacto inicial — onde o visitante decide ficar ou sair.**

- Fundo: vídeo em loop OU imagem full-screen de tattoo com overlay de gradiente dark
- Texto principal: nome "CLARA" em tamanho gigante, Playfair Display 900 italic, com efeito de texto em clipping mask (a imagem de tattoo aparece através das letras)
- Sub-texto: "Tatuadora · Arte permanente · [Cidade]"
- Microanimação: letras aparecem uma a uma com stagger (Framer Motion)
- CTA: botão "Ver portfólio" + link "Agendar agora"
- Badge flutuante animado: "✦ Aceitando clientes ✦" em loop circular (CSS animation)
- Scroll indicator: linha vertical animada com "scroll" em Bebas Neue

**Efeito especial:** cursor custom com glow roxo que segue o mouse.

---

### 2. `<About />`

**Quem é a Clara — humano por trás da agulha.**

Layout assimétrico:

- Lado esquerdo: foto da Clara (em P&B com toque roxo via CSS filter ou Duotone)
- Lado direito: texto biográfico + estatísticas

Conteúdo:

```
"Mais de X anos transformando pele em canvas.
Especialista em [estilo: blackwork / fineline / etc].
Cada traço conta uma história que dura para sempre."
```

Stats em destaque (animadas com counter ao entrar no viewport):

- `500+` Tatuagens realizadas
- `X anos` de experiência
- `∞` Clientes satisfeitos

---

### 3. `<Portfolio />`

**A galeria — o coração do site.**

Layout: Masonry grid responsivo (CSS columns ou biblioteca)

- Hover: imagem escala levemente + overlay aparece com título e estilo da tattoo
- Click: abre `Dialog` (shadcn) em fullscreen com detalhes da peça
- Filtros por estilo: Blackwork · Fine Line · Colorido · Cover-up · etc.
- Lazy loading com `next/image` e skeleton

**Placeholder categories (preencher com fotos reais da Clara):**

- Blackwork / Dotwork
- Fine Line
- Lettering
- Geométrico
- Florais
- Cover-ups

---

### 4. `<Styles />`

**Os estilos que a Clara domina.**

Cards horizontais scroll (carousel no mobile):

- Cada card: ícone/ilustração minimalista + nome do estilo + descrição curta
- Animação: cards deslizam da direita com stagger
- Background: cada card tem um gradiente sutil diferente dentro da paleta escura

---

### 5. `<Testimonials />`

**O que os clientes dizem.**

Layout: quotes grandes em destaque, Cormorant Garamond italic

- Carousel automático com pausa no hover
- Avatar circular do cliente (ou ícone genérico se sem foto)
- Rating em estrelas com cor roxa

---

### 6. `<Booking />`

**Como funciona o processo de agendamento.**

Timeline vertical animada:

1. `📩 Envie sua ideia` — Mande referências e descrição
2. `💬 Consulta` — Conversa para entender a visão
3. `✏️ Projeto` — Clara cria o design exclusivo
4. `🪡 Sessão` — Hora de tatuar
5. `🖤 Arte eterna` — Resultado para sempre

CTA grande e contrastante: **"QUERO MINHA TATTOO"** (linka para WhatsApp)

---

### 7. `<Contact />`

**Os canais de contato — rápidos e diretos.**

Grid 3 colunas com cards de contato:

```
[📱 WhatsApp]        [📸 Instagram]       [✉️ Email]
"Respondo rápido"    "@clara.tattoo"      "contato@..."
[Botão: Chamar]      [Botão: Seguir]      [Botão: Escrever]
```

Cada card: hover levanta com sombra roxa, ícone animated

- WhatsApp: abre `wa.me/55...` com mensagem pré-definida
- Instagram: abre perfil em nova aba
- Email: abre `mailto:`

Formulário opcional (toggle) — alternativa ao WhatsApp para quem prefere texto.

---

### 8. `<Footer />`

- Logo / Nome da Clara
- Links de navegação
- Redes sociais (ícones)
- `© 2025 Clara Tattoo · Feito com 🖤`
- Frase artística em Cormorant: _"A pele é o canvas mais honesto que existe."_

---

## 🎨 Elementos de Design Especiais

### Cursor Personalizado

```tsx
// CursorGlow.tsx
// Substitui o cursor padrão por um ponto com glow roxo
// Segue o mouse com lerp (suavização)
// Aumenta ao passar sobre elementos clicáveis
```

### Textura Noise / Grain

```tsx
// NoiseOverlay.tsx
// SVG filter noise aplicado como overlay semi-transparente
// Dá sensação de papel/tinta — remete à tatuagem analógica
// opacity: 0.03-0.05 para ser sutil
```

### Barra de Progresso de Scroll

```tsx
// ScrollProgress.tsx
// Linha roxa no topo da página que cresce conforme scroll
// height: 2px, cor: var(--color-purple-glow)
```

### Animações (Framer Motion)

```tsx
// Padrão de entrada para sections:
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
// Usar useInView() para disparar ao entrar no viewport
```

---

## 📱 Responsividade

| Breakpoint            | Layout                                                            |
| --------------------- | ----------------------------------------------------------------- |
| Mobile (`< 768px`)    | Stack vertical, menu hamburger (Sheet shadcn), imagens full-width |
| Tablet (`768–1024px`) | Grid 2 colunas, ajustes tipográficos                              |
| Desktop (`> 1024px`)  | Layout completo com assimetrias e efeitos hover                   |

**Mobile-first sempre.** O menu mobile usa `Sheet` do shadcn com animação de slide lateral.

---

## ⚡ Performance & SEO

### Metadados (layout.tsx)

```tsx
export const metadata: Metadata = {
  title: "Clara Tattoo | Arte na Pele",
  description:
    "Tatuadora especialista em [estilos]. Agendamentos via WhatsApp.",
  openGraph: {
    images: ["/og-image.jpg"], // foto impactante para compartilhamento
  },
};
```

### Otimizações

- Todas as imagens via `next/image` com `loading="lazy"` e `sizes` corretos
- Fontes com `display: swap`
- Animações com `will-change: transform` apenas quando necessário
- `prefers-reduced-motion` respeitado para acessibilidade

---

## 🔧 Variáveis de Conteúdo (preencher)

Criar `lib/content.ts` com:

```ts
export const ARTIST = {
  name: "Clara",
  title: "Tatuadora",
  city: "[Cidade]",
  bio: "[Bio da Clara]",
  experience: "[X] anos",
  specialties: ["Blackwork", "Fine Line", "..."],
};

export const CONTACT = {
  whatsapp: "55[DDD][NÚMERO]",
  whatsappMessage:
    "Olá Clara! Vi seu portfólio e gostaria de agendar uma consulta.",
  instagram: "@[handle]",
  email: "[email]",
};

export const STATS = {
  tattoos: 500,
  years: 5,
  styles: 8,
};
```

---

## 🚀 Comandos de Desenvolvimento

```bash
# Criar projeto
npx create-next-app@latest clara-tattoo --typescript --tailwind --app --src-dir

# Instalar dependências
npm install framer-motion
npm install lucide-react

# Instalar shadcn/ui
npx shadcn@latest init
npx shadcn@latest add dialog sheet button badge card

# Rodar em dev
npm run dev
```

---

## ✅ Checklist de Entrega

- [ ] Hero com efeito de texto em clipping + animação de entrada
- [ ] Cursor customizado com glow roxo
- [ ] Seção About com foto tratada + stats animados
- [ ] Portfolio em grid masonry com modal fullscreen
- [ ] Filtros de estilo funcionais
- [ ] Seção de estilos em carousel
- [ ] Testimonials em carousel automático
- [ ] Timeline de agendamento animada
- [ ] Cards de contato com links reais (WhatsApp, Instagram, Email)
- [ ] Footer com frase artística
- [ ] Menu mobile com Sheet (shadcn)
- [ ] Scroll progress bar roxa
- [ ] Textura noise sutil no fundo
- [ ] Responsivo em mobile, tablet, desktop
- [ ] SEO metadados e OG image
- [ ] `prefers-reduced-motion` respeitado
- [ ] Conteúdo centralizado em `lib/content.ts`
- [ ] Deploy configurado (Vercel recomendado)

---

_"A pele é o canvas mais honesto que existe."_ 🖤
