import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/consts";
import { renderCard, type Card } from "./cards";

// The build runs from the project root, and `import.meta.url` points into the
// bundled output by then, so the fonts are resolved relative to the cwd.
const FONT_DIRECTORY = join(process.cwd(), "src/og/fonts");

function loadFont(name: string, weight: 400 | 900, file: string) {
  return {
    name,
    weight,
    style: "normal" as const,
    data: readFileSync(join(FONT_DIRECTORY, file)),
  };
}

// Read once: every card reuses the same font data.
const fonts = [
  loadFont("JetBrains Mono", 400, "JetBrainsMono-Regular.ttf"),
  loadFont("Merriweather", 900, "Merriweather-Black.ttf"),
];

/**
 * Renders a card with Satori into an SVG, which is then rasterized to a PNG.
 * Both steps only run during `astro build`.
 */
export async function renderCardPng(card: Card): Promise<Uint8Array> {
  // Satori's public signature uses React types; its built-in JSX runtime
  // produces compatible elements without requiring React.
  const svg = await satori(renderCard(card) as Parameters<typeof satori>[0], {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts,
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(png);
}
