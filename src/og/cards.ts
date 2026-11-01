import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_TITLE } from "@/consts";
import { landmarks } from "@/landmarks";

/**
 * The visual identity of the OpenGraph images mirrors the glyph badges from
 * `landmarks.ts`. Satori only understands inline styles, so the Tailwind
 * classes of the badges cannot be reused directly and the colors are spelled
 * out here instead. These are the light-mode variants of the site.
 *
 * OpenGraph images cannot follow `prefers-color-scheme`, so this is a single
 * fixed scheme; swap the values for their `dark:` counterparts to flip it.
 */
const themes = {
  welcome: {
    glyph: "~",
    badgeBackground: "#fde047",
    badgeForeground: "#422006",
    heading: "#a16207",
  },
  projects: {
    glyph: landmarks.projects.glyph,
    badgeBackground: "#991b1b",
    badgeForeground: "#fee2e2",
    heading: "#450a0a",
  },
  blog: {
    glyph: landmarks.blog.glyph,
    badgeBackground: "#c4b5fd",
    badgeForeground: "#2e1065",
    heading: "#4c1d95",
  },
  tools: {
    glyph: landmarks.tools.glyph,
    badgeBackground: "#000000",
    badgeForeground: "#4ade80",
    heading: "#052e16",
  },
  socials: {
    glyph: "@",
    badgeBackground: "#93c5fd",
    badgeForeground: "#172554",
    heading: "#1e3a8a",
  },
} as const;

export type ThemeName = keyof typeof themes;

export type Card =
  | { variant: "home" }
  | {
      variant: "page";
      theme: ThemeName;
      /** Path shown in the footer, without the domain. */
      href: string;
      /** Small label above the title, e.g. "projects" on a project page. */
      eyebrow?: string;
      title: string;
      description?: string;
    };

const colors = {
  background: "#faf9f6",
  foreground: "#18181b",
  muted: "#52525b",
  subtle: "#71717a",
} as const;

type Props = Record<string, unknown> & { style?: Record<string, unknown> };
type Element = { type: string; props: Props };

/** Minimal JSX factory, so we do not need a JSX runtime for the cards. */
function el(type: string, props: Props, ...children: unknown[]): Element {
  return {
    type,
    props: {
      ...props,
      children:
        children.length === 0
          ? undefined
          : children.length === 1
            ? children[0]
            : children,
    },
  };
}

function badge(theme: ThemeName, size: number, fontSize: number): Element {
  const { glyph, badgeBackground, badgeForeground } = themes[theme];

  return el(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${Math.round(size * 0.28)}px`,
        backgroundColor: badgeBackground,
        color: badgeForeground,
        fontFamily: "JetBrains Mono",
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        paddingTop: `${Math.round(size * 0.04)}px`,
      },
    },
    glyph,
  );
}

function footer(path: string, signature: string | null): Element {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "22px",
    color: colors.subtle,
    letterSpacing: "0.02em",
  };

  return signature
    ? el("div", { style }, el("span", {}, path), el("span", {}, signature))
    : el("div", { style }, el("span", {}, path));
}

function shell(
  header: Element,
  main: Element,
  path: string,
  signature: string | null = SITE_TITLE,
): Element {
  return el(
    "div",
    {
      style: {
        width: `${OG_IMAGE_WIDTH}px`,
        height: `${OG_IMAGE_HEIGHT}px`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
        color: colors.foreground,
        padding: "72px 80px",
        fontFamily: "JetBrains Mono",
      },
    },
    header,
    // The card content is centered in the space between header and footer,
    // which keeps short and long titles balanced.
    el(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        },
      },
      main,
    ),
    footer(path, signature),
  );
}

/** Longer titles get smaller type so that they still fit on three lines. */
function titleSize(title: string, base: number): number {
  if (title.length > 90) return base * 0.62;
  if (title.length > 60) return base * 0.72;
  if (title.length > 36) return base * 0.84;
  return base;
}

function homeCard(): Element {
  const order: ThemeName[] = [
    "welcome",
    "projects",
    "blog",
    "tools",
    "socials",
  ];

  const header = el(
    "div",
    { style: { display: "flex", gap: "20px" } },
    ...order.map((theme) => badge(theme, 116, 64)),
  );

  const main = el(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: "18px" } },
    el(
      "div",
      {
        style: {
          fontFamily: "Merriweather",
          fontWeight: 900,
          fontSize: "92px",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        },
      },
      SITE_TITLE,
    ),
    el(
      "div",
      { style: { fontSize: "26px", color: colors.muted } },
      "Side projects, notes and the tools I use.",
    ),
  );

  return shell(header, main, "niclasve.me", null);
}

function pageCard(card: Extract<Card, { variant: "page" }>): Element {
  const { heading } = themes[card.theme];
  const eyebrow = card.eyebrow?.toUpperCase();

  const header = el(
    "div",
    { style: { display: "flex", alignItems: "center", gap: "28px" } },
    badge(card.theme, 88, 48),
    eyebrow
      ? el(
          "div",
          {
            style: {
              fontSize: "26px",
              letterSpacing: "0.18em",
              color: heading,
            },
          },
          eyebrow,
        )
      : null,
  );

  const main = el(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "1000px",
      },
    },
    el(
      "div",
      {
        style: {
          fontFamily: "Merriweather",
          fontWeight: 900,
          fontSize: `${titleSize(card.title, card.eyebrow ? 76 : 96)}px`,
          lineHeight: 1.16,
          letterSpacing: "-0.025em",
          color: heading,
        },
      },
      card.title,
    ),
    card.description
      ? el(
          "div",
          {
            style: {
              fontSize: "27px",
              lineHeight: 1.45,
              color: colors.muted,
              lineClamp: 2,
            },
          },
          card.description,
        )
      : null,
  );

  return shell(header, main, `niclasve.me${card.href}`);
}

export function renderCard(card: Card): Element {
  return card.variant === "home" ? homeCard() : pageCard(card);
}
