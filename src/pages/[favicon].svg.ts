import type { APIRoute, GetStaticPaths } from "astro";
import { themes, type SectionTheme } from "@/theme";
import { SITE_TITLE } from "@/consts";

export const getStaticPaths = (() =>
  Object.values(themes).flatMap((theme) =>
    "favicon" in theme
      ? [
          {
            params: { favicon: theme.favicon.slice(1, -4) },
            props: { theme },
          },
        ]
      : [],
  )) satisfies GetStaticPaths;

function escapeXml(value: string): string {
  return value.replace(
    /[<>&"']/g,
    (character) => `&#${character.charCodeAt(0)};`,
  );
}

export const GET: APIRoute = ({ props }) => {
  const { theme } = props as { theme: SectionTheme };
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <title>${escapeXml(theme.section === "welcome" ? SITE_TITLE : theme.heading)}</title>
  <style>
    rect { fill: ${theme.light.badgeBackground}; }
    text { fill: ${theme.light.badgeForeground}; }
    @media (prefers-color-scheme: dark) {
      rect { fill: ${theme.dark.badgeBackground}; }
      text { fill: ${theme.dark.badgeForeground}; }
    }
  </style>
  <rect width="32" height="32" rx="10" />
  <text x="16" y="16" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-size="20" font-weight="400">${escapeXml(theme.glyph)}</text>
</svg>`,
    { headers: { "Content-Type": "image/svg+xml; charset=utf-8" } },
  );
};
