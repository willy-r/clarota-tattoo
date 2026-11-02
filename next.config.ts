import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Só vale em `next dev`. Origens além de localhost que podem usar o servidor de dev:
  // - 127.0.0.1: o Keystatic em modo GitHub sempre redireciona o login para esse host;
  // - *.ngrok-free.app: abrir o servidor local pelo celular (o subdomínio muda a cada sessão).
  allowedDevOrigins: ["127.0.0.1", "*.ngrok-free.app"],
};

export default nextConfig;
