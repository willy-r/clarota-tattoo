import * as THREE from "three";

// Toda a "iluminação" do museu é pintada em texturas de canvas: zero luzes reais na cena
// para as superfícies grandes, o que mantém a GPU tranquila até em notebook fraco.

const PURPLE = "#7c3aed";
const PURPLE_GLOW = "#a855f7";
const INK = "#e8e0f0";
const MUTED = "#8b8597";

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D indisponível");
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Família da fonte carregada pelo next/font, lida da variável CSS que o layout do site define. */
function siteFont(variable: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

export type MuseumFonts = { display: string; heading: string; editorial: string };

let fontsPromise: Promise<MuseumFonts> | null = null;

/** Garante que as fontes do site estejam baixadas antes de desenhar texto em canvas. */
export function loadMuseumFonts(): Promise<MuseumFonts> {
  fontsPromise ??= (async () => {
    const fonts: MuseumFonts = {
      display: siteFont("--font-playfair", "Georgia, serif"),
      heading: siteFont("--font-bebas", "Impact, sans-serif"),
      editorial: siteFont("--font-cormorant", "Georgia, serif"),
    };
    // Só a família principal: o "… Fallback" do next/font usa local() e rejeita o load()
    // inteiro quando a fonte de sistema não existe na máquina.
    const primary = (family: string) => family.split(",")[0].trim();
    try {
      await Promise.all([
        document.fonts.load(`italic 900 64px ${primary(fonts.display)}`),
        document.fonts.load(`400 64px ${primary(fonts.heading)}`),
        document.fonts.load(`italic 400 64px ${primary(fonts.editorial)}`),
      ]);
    } catch (error) {
      console.warn("Museu: fontes do site não carregaram, usando fallback nas plaquetas", error);
    }
    return fonts;
  })();
  return fontsPromise;
}

/** Reboco escuro: gradiente vertical (mais claro na altura das obras) + granulado fino. */
export function createWallTexture(): THREE.CanvasTexture {
  const size = 512;
  const { canvas, ctx } = makeCanvas(size, size);
  const gradient = ctx.createLinearGradient(0, 0, 0, size);
  gradient.addColorStop(0, "#0e0d11");
  gradient.addColorStop(0.35, "#25212d");
  gradient.addColorStop(0.7, "#1e1b25");
  gradient.addColorStop(1, "#111015");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Granulado determinístico para a textura não "pular" entre recargas.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 9000; i++) {
    const shade = rand() > 0.5 ? 255 : 0;
    ctx.fillStyle = `rgba(${shade},${shade},${shade},${rand() * 0.035})`;
    ctx.fillRect(rand() * size, rand() * size, 1.5, 1.5);
  }
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

/** Piso: escuro e levemente translúcido — os reflexos das obras ficam embaixo dele. */
export function createFloorTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = makeCanvas(size, size);
  const gradient = ctx.createLinearGradient(0, 0, size, 0);
  gradient.addColorStop(0, "#050506");
  gradient.addColorStop(0.5, "#0d0c10");
  gradient.addColorStop(1, "#050506");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = toTexture(canvas);
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Tapete central: roxo bem escuro com friso fino nas bordas. */
export function createRugTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(128, 128);
  ctx.fillStyle = "#150d1f";
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = "#3b1d6b";
  ctx.fillRect(6, 0, 3, 128);
  ctx.fillRect(119, 0, 3, 128);
  const texture = toTexture(canvas);
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Mancha de luz do spot na parede (somada à parede com blending aditivo). */
export function createLightPoolTexture(): THREE.CanvasTexture {
  const size = 256;
  const { canvas, ctx } = makeCanvas(size, size);
  const cx = size / 2;
  const cy = size * 0.4;
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
  gradient.addColorStop(0, "rgba(255, 240, 225, 1)");
  gradient.addColorStop(0.4, "rgba(255, 236, 220, 0.28)");
  gradient.addColorStop(1, "rgba(255, 236, 220, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return toTexture(canvas);
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let cut = text;
  while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxWidth) cut = cut.slice(0, -1);
  return `${cut.trimEnd()}…`;
}

/** Quebra o texto em até `maxLines` linhas; a última leva reticências se sobrar texto. */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  while (words.length > 0 && lines.length < maxLines - 1) {
    let line = words.shift() as string;
    while (words.length > 0 && ctx.measureText(`${line} ${words[0]}`).width <= maxWidth) {
      line += ` ${words.shift()}`;
    }
    lines.push(line);
  }
  if (words.length > 0) lines.push(fitText(ctx, words.join(" "), maxWidth));
  return lines;
}

/** Plaqueta ao lado da obra, no mesmo tom das plaquetas do HUD. */
export function createPlaqueTexture(
  fonts: MuseumFonts,
  plaque: { label: string; title: string; artist: string; number: number },
): THREE.CanvasTexture {
  const w = 800;
  const h = 450;
  const { canvas, ctx } = makeCanvas(w, h);
  ctx.fillStyle = "#0c0b0f";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#2a2433";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, w - 4, h - 4);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = PURPLE_GLOW;
  ctx.font = `400 40px ${fonts.heading}`;
  ctx.letterSpacing = "8px";
  ctx.fillText(plaque.label.toUpperCase(), 40, 80);
  ctx.textAlign = "right";
  ctx.fillStyle = MUTED;
  ctx.fillText(String(plaque.number).padStart(2, "0"), w - 40, 80);
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";

  ctx.fillStyle = INK;
  ctx.font = `italic 900 60px ${fonts.display}`;
  wrapText(ctx, plaque.title, w - 80, 2).forEach((line, i) => ctx.fillText(line, 40, 175 + i * 72));

  ctx.fillStyle = MUTED;
  ctx.font = `italic 400 44px ${fonts.editorial}`;
  ctx.fillText(`Arte por ${plaque.artist}`, 40, 390);
  return toTexture(canvas);
}

/** Letreiro neon da parede do fundo. */
export function createSignTexture(fonts: MuseumFonts, name: string, subtitle: string): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const { canvas, ctx } = makeCanvas(w, h);
  ctx.textAlign = "center";

  ctx.font = `italic 900 200px ${fonts.display}`;
  const nameWidth = ctx.measureText(name).width;
  const dotWidth = ctx.measureText(".").width;
  const x = w / 2 - dotWidth / 2;
  ctx.shadowColor = PURPLE_GLOW;
  ctx.shadowBlur = 40;
  ctx.fillStyle = INK;
  ctx.fillText(name, x, 270);
  ctx.textAlign = "left";
  ctx.fillStyle = PURPLE_GLOW;
  ctx.fillText(".", x + nameWidth / 2, 270);

  ctx.textAlign = "center";
  ctx.shadowBlur = 16;
  ctx.shadowColor = PURPLE;
  ctx.fillStyle = PURPLE_GLOW;
  ctx.font = `400 34px ${fonts.heading}`;
  ctx.letterSpacing = "8px";
  ctx.fillText(subtitle.toUpperCase(), w / 2, 380);
  return toTexture(canvas);
}
