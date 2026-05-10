export const ARTIST = {
  name: "Clarota",
  title: "Tatuadora · Ilustração · Character Design",
  city: "Fortaleza, CE",
  bio: "Me chamo Clara, tatuadora apaixonada por transformar ideias em arte na pele. Especialista em Blackwork e tatuagens Geek, trazendo referências de anime, games, cultura pop e artes autorais em cada projeto.",
  experience: "5",
  specialties: ["Blackwork", "Geek"],
};

export const CONTACT = {
  whatsapp: "558893211041",
  whatsappMessage:
    "Olá Clara! Vi seu portfólio e gostaria de conversar sobre um possível orçamento",
  instagram: "@clarota.ttt",
  instagramUrl: "https://instagram.com/clarota.ttt",
  email: "thatclara@gmail.com",
};

export const STATS = {
  tattoos: 500,
  years: 5,
  styles: 6,
};

export const STYLES = [
  {
    name: "Blackwork",
    description:
      "Composições em preto puro com alto contraste e impacto visual máximo. Linhas fortes, manchas densas e simbolismo marcante.",
    icon: "◆",
  },
  {
    name: "Geek",
    description:
      "Arte inspirada em games, anime, HQs e cultura pop. Personagens e universos que você ama eternizados na pele.",
    icon: "⬡",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "A Clara transformou completamente minha visão em arte. O resultado ficou ainda mais bonito do que eu imaginava.",
    author: "Ana Paula",
    detail: "Blackwork · Braço inteiro",
  },
  {
    quote:
      "Profissionalismo e sensibilidade em cada etapa. Me senti completamente segura durante todo o processo.",
    author: "Mariana S.",
    detail: "Fine Line · Costela",
  },
  {
    quote:
      "Já é minha terceira tattoo com a Clara. Não consigo imaginar confiar essa arte a mais ninguém.",
    author: "Luísa M.",
    detail: "Lettering · Antebraço",
  },
  {
    quote:
      "O cover-up que ela fez ficou perfeito. Apagou completamente o que eu queria esquecer e criou algo lindo.",
    author: "Fernanda C.",
    detail: "Cover-up · Costas",
  },
];

// Para adicionar imagens reais: baixe do Instagram, coloque em public/portfolio/
// e preencha o campo image com o caminho, ex: image: "/portfolio/nome.jpg"
export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    style: "Blackwork",
    title: "Máscara Noh — Hannya",
    aspect: "tall",
    image: "/portfolio/hannya.webp",
  },
  {
    id: 2,
    style: "Geek",
    title: "Cartelinha — Nostalgia Pessoal",
    aspect: "square",
    image: "/portfolio/cartelinha-nostalgia.webp",
  },
  {
    id: 3,
    style: "Blackwork",
    title: "Arte Autoral",
    aspect: "wide",
    image: "/portfolio/arte-autoral-2.webp",
  },
  {
    id: 4,
    style: "Geek",
    title: "Coelhinhos — Watership Down",
    aspect: "square",
    image: "/portfolio/coelhos-watership-down.webp",
  },
  {
    id: 5,
    style: "Blackwork",
    title: "Cartelinha — Pokemons",
    aspect: "tall",
    image: "/portfolio/cartelinha-pokemons.webp",
  },
  {
    id: 6,
    style: "Geek",
    title: "Molenga — Saudades",
    aspect: "tall",
    image: "/portfolio/molenga.webp",
  },
  {
    id: 7,
    style: "Blackwork",
    title: "Patinhos — A Viagem de Chihiro",
    aspect: "square",
    image: "/portfolio/patinhos-a-viagem-de-chihiro.webp",
  },
  {
    id: 8,
    style: "Geek",
    title: "Lucy",
    aspect: "wide",
    image: "/portfolio/lucy.webp",
  },
  {
    id: 9,
    style: "Blackwork",
    title: "Arte Autoral",
    aspect: "square",
    image: "/portfolio/arte-autoral.webp",
  },
];
