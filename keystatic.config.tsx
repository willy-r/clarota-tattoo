import { config, fields, singleton } from "@keystatic/core";
import { PORTFOLIO_CATEGORIES, categoryLabel } from "./lib/categories";

// Mesmas opções do select de estilo do portfólio. Ao criar um estilo novo em "Estilos",
// adicione aqui também para ele aparecer na lista.
const PORTFOLIO_STYLES = ["Trash Tattoo", "Blackwork", "Geek"] as const;

const ASPECTS = [
  { label: "Vertical (3:4)", value: "tall" },
  { label: "Quadrada (1:1)", value: "square" },
  { label: "Horizontal (16:9)", value: "wide" },
] as const;

function BrandMark() {
  return (
    <svg width={24} height={24} viewBox="0 0 32 32" fill="none" aria-hidden>
      <defs>
        <linearGradient id="clarota-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8e0f0" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="#0a0a0a" />
      <text
        x="16"
        y="23"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="22"
        fontWeight="900"
        fontStyle="italic"
        fill="url(#clarota-mark)"
      >
        C
      </text>
    </svg>
  );
}

export default config({
  // Em dev grava nos arquivos locais. NEXT_PUBLIC_KEYSTATIC_STORAGE=github força o modo GitHub
  // em dev — é assim que o GitHub App é criado na primeira vez (docs/PAINEL.md).
  storage:
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
      ? { kind: "github", repo: "willy-r/clarota-tattoo" }
      : { kind: "local" },
  locale: "pt-BR",
  ui: {
    brand: { name: "Clarota · Painel", mark: BrandMark },
    navigation: {
      Perfil: ["artist", "contact"],
      Trabalhos: ["portfolio", "styles"],
      "Prova social": ["testimonials"],
    },
  },
  singletons: {
    artist: singleton({
      label: "Sobre a artista",
      path: "content/artist",
      format: { data: "json" },
      schema: {
        name: fields.text({
          label: "Nome artístico",
          description: "Aparece no topo do site, no menu e no rodapé. Ex: Clarota",
          validation: { isRequired: true, length: { max: 30 } },
        }),
        title: fields.text({
          label: "Como se apresenta",
          description:
            "Linha curta logo abaixo do nome, no topo do site. Ex: Tatuadora · Ilustração · Character Design",
          validation: { isRequired: true, length: { max: 80 } },
        }),
        city: fields.text({
          label: "Cidade",
          description: "Ex: Fortaleza, CE",
          validation: { isRequired: true },
        }),
        bio: fields.text({
          label: "Bio",
          description:
            "Texto da seção \"Sobre\". Escreva como falaria com um cliente, em primeira pessoa. Até 400 caracteres.",
          multiline: true,
          validation: { isRequired: true, length: { max: 400 } },
        }),
        specialties: fields.array(
          fields.text({ label: "Especialidade", validation: { isRequired: true } }),
          {
            label: "Especialidades",
            description: "Etiquetas que aparecem na seção \"Sobre\". Arraste para reordenar.",
            itemLabel: (props) => props.value || "Nova especialidade",
          },
        ),
      },
    }),

    contact: singleton({
      label: "Contato",
      path: "content/contact",
      format: { data: "json" },
      schema: {
        whatsapp: fields.text({
          label: "WhatsApp",
          description:
            "Só números, com 55 e DDD. Ex: 5585999998888. É para onde vão todos os botões de agendar.",
          validation: {
            isRequired: true,
            pattern: { regex: /^55\d{10,11}$/, message: "Use só números: 55 + DDD + número" },
          },
        }),
        whatsappMessage: fields.text({
          label: "Mensagem pronta do WhatsApp",
          description: "Texto que já vem digitado quando a pessoa clica para chamar no WhatsApp.",
          multiline: true,
          validation: { isRequired: true },
        }),
        instagram: fields.text({
          label: "Instagram (@)",
          description: "Ex: @clarota.ttt",
          validation: {
            isRequired: true,
            pattern: { regex: /^@[\w.]+$/, message: "Comece com @ e use só letras, números, . e _" },
          },
        }),
        instagramUrl: fields.url({
          label: "Link do Instagram",
          description: "Ex: https://instagram.com/clarota.ttt",
          validation: { isRequired: true },
        }),
        email: fields.text({
          label: "E-mail",
          validation: {
            isRequired: true,
            pattern: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" },
          },
        }),
      },
    }),

    portfolio: singleton({
      label: "Portfólio",
      path: "content/portfolio",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.slug({
              name: {
                label: "Título",
                description:
                  "Aparece ao passar o mouse na foto, no zoom, no museu 3D e no Google (texto alternativo da imagem).",
                validation: { isRequired: true },
              },
              slug: {
                label: "Nome da pasta da foto",
                description: "Gerado sozinho. Precisa ser único — se repetir um título, mude aqui.",
              },
            }),
            category: fields.select({
              label: "Categoria",
              description: "Em qual aba do portfólio a arte aparece. No museu 3D vira a etiqueta da obra.",
              options: PORTFOLIO_CATEGORIES.map((c) => ({ label: c.label, value: c.value })),
              defaultValue: "tatuagens",
            }),
            style: fields.select({
              label: "Estilo",
              description: "Usado na descrição da imagem para o Google.",
              options: PORTFOLIO_STYLES.map((s) => ({ label: s, value: s })),
              defaultValue: "Blackwork",
            }),
            aspect: fields.select({
              label: "Formato no mosaico",
              description: "Como o card aparece na grade do site. A foto é cortada para caber.",
              options: ASPECTS,
              defaultValue: "square",
            }),
            image: fields.image({
              label: "Foto",
              description: "JPG ou WebP, até ~1600px no lado maior. Fotos muito grandes deixam o site lento.",
              directory: "public/portfolio",
              publicPath: "/portfolio/",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Trabalhos",
            description:
              "A ordem aqui é a ordem dentro de cada aba do site e no museu 3D. Arraste para reordenar.",
            slugField: "title",
            itemLabel: (props) =>
              `${props.fields.title.value.name || "Novo trabalho"} · ${categoryLabel(props.fields.category.value)}`,
          },
        ),
      },
    }),

    styles: singleton({
      label: "Estilos",
      path: "content/styles",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Nome", validation: { isRequired: true } }),
            description: fields.text({
              label: "Descrição",
              multiline: true,
              validation: { isRequired: true, length: { max: 220 } },
            }),
            icon: fields.text({
              label: "Ícone",
              description: "Um símbolo só. Ex: ☠ ◆ ⬡ ✦",
              validation: { isRequired: true, length: { max: 2 } },
            }),
          }),
          {
            label: "Estilos",
            description: "Cards da seção \"Estilos\". Arraste para reordenar.",
            itemLabel: (props) => `${props.fields.icon.value} ${props.fields.name.value || "Novo estilo"}`,
          },
        ),
      },
    }),

    testimonials: singleton({
      label: "Depoimentos",
      path: "content/testimonials",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            quote: fields.text({
              label: "Depoimento",
              multiline: true,
              validation: { isRequired: true, length: { max: 240 } },
            }),
            author: fields.text({ label: "Nome do cliente", validation: { isRequired: true } }),
            detail: fields.text({
              label: "Detalhe",
              description: "Estilo e local da tattoo. Ex: Blackwork · Antebraço",
            }),
          }),
          {
            label: "Depoimentos",
            description:
              "A seção de depoimentos está desligada no site por enquanto. O que for salvo aqui fica guardado para quando ela voltar.",
            itemLabel: (props) => props.fields.author.value || "Novo depoimento",
          },
        ),
      },
    }),
  },
});
