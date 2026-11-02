import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Só vale em `next dev`: libera abrir o servidor local pelo celular via túnel do ngrok
  // (o subdomínio muda a cada sessão, por isso o curinga).
  allowedDevOrigins: ["*.ngrok-free.app"],
};

export default nextConfig;
