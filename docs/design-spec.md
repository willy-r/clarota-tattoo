# Design Spec — Portfólio Clarota Tattoo

> Diretrizes de identidade visual, estética e estrutura de seções do site.

---

## Identidade Visual & Direção Estética

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

**Palavras-chave:** Raw. Preciso. Eterno. Noturno. Artesanal. Ritualístico.

### Tipografia

- **Display / Títulos:** `Playfair Display` (serif dramático, peso 900 italic)
- **Sub-títulos / UI:** `Bebas Neue` (condensado, todo maiúsculo)
- **Corpo / Parágrafos:** `DM Sans`
- **Detalhe / Quote:** `Cormorant Garamond` italic

---

## Seções da Landing Page

### `<Hero />`

- Nome gigante com clipping mask (gradiente roxa aparece através das letras)
- Stagger de entrada letra a letra (Framer Motion)
- CTA: "Ver Portfólio" (outline) + "Agendar agora" (filled, WhatsApp)
- Badge "✦ AGENDA ABERTA ✦" — spinning conic gradient, visível só em desktop
- Scroll indicator: linha vertical animada

### `<About />`

- Grid assimétrico: foto (aspect 3/4, duotone roxo) à esquerda, bio + stats à direita
- Stats animados com counter ao entrar no viewport: tatuagens, anos, estilos

### `<Portfolio />`

- Masonry grid com items de aspect variável (`tall`, `wide`, `square`)
- Hover: overlay com título e estilo
- Click: abre Dialog fullscreen
- Filtros por estilo (Blackwork, Geek, Trash Tattoo…)

### `<Styles />`

- Cards em scroll horizontal no mobile, grid no desktop
- Cada card: ícone + nome + descrição curta

### `<Testimonials />`

- Carousel automático, pausa no hover
- Quotes em Cormorant Garamond italic

### `<Booking />`

- Timeline vertical animada com 5 etapas
- CTA "QUERO MINHA TATTOO" linkando para WhatsApp

### `<Contact />`

- Grid 3 colunas: WhatsApp, Instagram, Email
- Hover levanta card com sombra roxa

### `<Footer />`

- Frase: _"A pele é o canvas mais honesto que existe."_

---

## Responsividade

| Breakpoint          | Layout                                          |
| ------------------- | ----------------------------------------------- |
| Mobile (< 768px)    | Stack vertical, menu hamburger (Sheet shadcn)   |
| Tablet (768–1024px) | Grid 2 colunas, ajustes tipográficos            |
| Desktop (> 1024px)  | Layout completo com assimetrias e efeitos hover |

---

## Elementos Especiais

- **CursorGlow** — cursor custom com glow roxo, lerp suavizado, oculto em touch
- **NoiseOverlay** — SVG grain semi-transparente (opacity 0.03–0.05)
- **ScrollProgress** — barra roxa 2px no topo, cresce com o scroll

---

_"A pele é o canvas mais honesto que existe."_ 🖤
