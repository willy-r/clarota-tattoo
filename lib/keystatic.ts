// Em produção o painel grava no GitHub e precisa das credenciais do GitHub App.
// Sem elas o painel fica desligado em vez de quebrar o build (setup em docs/PAINEL.md).
export function isKeystaticEnabled(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  );
}
