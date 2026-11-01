/** @jsxRuntime automatic */
/** @jsxImportSource satori/jsx */

import type { JSXNode } from "satori/jsx";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_TITLE } from "@/consts";
import { themes, pageColors, type ThemeName } from "@/theme";

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

// Cards use the light palette because preview images cannot follow system theme.
const colors = pageColors.light;

function Badge({
  theme,
  size,
  fontSize,
}: {
  theme: ThemeName;
  size: number;
  fontSize: number;
}) {
  const {
    glyph,
    light: { badgeBackground, badgeForeground },
  } = themes[theme];

  return (
    <div
      style={{
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
      }}
    >
      {glyph}
    </div>
  );
}

function Footer({
  path,
  signature,
}: {
  path: string;
  signature: string | null;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "22px",
        color: colors.subtle,
        letterSpacing: "0.02em",
      }}
    >
      <span>{path}</span>
      {signature ? <span>{signature}</span> : null}
    </div>
  );
}

function CardShell({
  header,
  children,
  path,
  signature = SITE_TITLE,
}: {
  header: JSXNode;
  children: JSXNode;
  path: string;
  signature?: string | null;
}) {
  return (
    <div
      style={{
        width: `${OG_IMAGE_WIDTH}px`,
        height: `${OG_IMAGE_HEIGHT}px`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
        color: colors.foreground,
        padding: "72px 80px",
        fontFamily: "JetBrains Mono",
      }}
    >
      {header}
      {/* Center short and long titles between the header and footer. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {children}
      </div>
      <Footer path={path} signature={signature} />
    </div>
  );
}

/** Longer titles get smaller type so that they still fit on three lines. */
function titleSize(title: string, base: number): number {
  if (title.length > 90) return base * 0.62;
  if (title.length > 60) return base * 0.72;
  if (title.length > 36) return base * 0.84;
  return base;
}

function HomeCard() {
  const order: ThemeName[] = [
    "welcome",
    "projects",
    "blog",
    "tools",
    "socials",
  ];

  return (
    <CardShell
      path="niclasve.me"
      signature={null}
      header={
        <div style={{ display: "flex", gap: "20px" }}>
          {order.map((theme) => (
            <Badge key={theme} theme={theme} size={116} fontSize={64} />
          ))}
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div
          style={{
            fontFamily: "Merriweather",
            fontWeight: 900,
            fontSize: "92px",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {SITE_TITLE}
        </div>
        <div style={{ fontSize: "26px", color: colors.muted }}>
          Side projects, notes and the tools I use.
        </div>
      </div>
    </CardShell>
  );
}

function PageCard(card: Extract<Card, { variant: "page" }>) {
  const { heading } = themes[card.theme].light;
  const eyebrow = card.eyebrow?.toUpperCase();

  return (
    <CardShell
      path={`niclasve.me${card.href}`}
      header={
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <Badge theme={card.theme} size={88} fontSize={48} />
          {eyebrow ? (
            <div
              style={{
                fontSize: "26px",
                letterSpacing: "0.18em",
                color: heading,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "1000px",
        }}
      >
        <div
          style={{
            fontFamily: "Merriweather",
            fontWeight: 900,
            fontSize: `${titleSize(card.title, card.eyebrow ? 76 : 96)}px`,
            lineHeight: 1.16,
            letterSpacing: "-0.025em",
            color: heading,
          }}
        >
          {card.title}
        </div>
        {card.description ? (
          <div
            style={{
              fontSize: "27px",
              lineHeight: 1.45,
              color: colors.muted,
              lineClamp: 2,
            }}
          >
            {card.description}
          </div>
        ) : null}
      </div>
    </CardShell>
  );
}

export function renderCard(card: Card) {
  return card.variant === "home" ? <HomeCard /> : <PageCard {...card} />;
}
