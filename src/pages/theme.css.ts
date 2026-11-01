import type { APIRoute } from "astro";
import { pageColors, themes, type Palette } from "@/theme";

const properties: Record<keyof Palette, string> = {
  badgeBackground: "--glyph-background",
  badgeForeground: "--glyph-foreground",
  heading: "--heading-color",
  link: "--link-color",
  focus: "--focus-color",
  selectionBackground: "--selection-background",
  selectionForeground: "--selection-foreground",
};

function rules(mode: "light" | "dark") {
  return Object.values(themes)
    .map(
      (theme) =>
        `[data-section="${theme.section}"] {${Object.entries(properties)
          .map(
            ([key, property]) =>
              `${property}: ${theme[mode][key as keyof Palette]};`,
          )
          .join("\n")}}`,
    )
    .join("\n");
}

export const GET: APIRoute = () =>
  new Response(
    `
  @layer base {
    :root { --page-background: ${pageColors.light.background}; }
    ${rules("light")}
    @media (prefers-color-scheme: dark) {
      :root { --page-background: ${pageColors.dark.background}; }
      ${rules("dark")}
    }
  }
`,
    { headers: { "Content-Type": "text/css; charset=utf-8" } },
  );
