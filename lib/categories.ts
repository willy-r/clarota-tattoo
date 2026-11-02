// Categorias do portfólio. Usadas pelo painel (opções do select), pelas abas do site e pelo museu.
// A ordem aqui é a ordem das abas.
export const PORTFOLIO_CATEGORIES = [
  {
    value: "tatuagens",
    label: "Tatuagens feitas",
    description: "Trabalhos que já estão na pele.",
  },
  {
    value: "disponiveis",
    label: "Disponíveis",
    description: "Desenhos prontos esperando uma pele. Gostou de algum? É só chamar no WhatsApp.",
  },
  {
    value: "autorais",
    label: "Arte autoral",
    description: "Ilustrações e estudos: o traço fora da pele.",
  },
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number]["value"];

export function categoryLabel(category: PortfolioCategory): string {
  return PORTFOLIO_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}
