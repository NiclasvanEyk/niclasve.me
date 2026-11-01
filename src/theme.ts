import colors from "tailwindcss/colors";

export const pageColors = {
  light: {
    background: "#faf9f6",
    foreground: colors.zinc[900],
    muted: colors.zinc[600],
    subtle: colors.zinc[500],
  },
  dark: { background: "#171716" },
};

export interface Palette {
  badgeBackground: string;
  badgeForeground: string;
  heading: string;
  link: string;
  focus: string;
  selectionBackground: string;
  selectionForeground: string;
}

export interface SectionTheme {
  section: string;
  heading: string;
  glyph: string;
  href?: string;
  transitionName?: string;
  favicon?: string;
  light: Palette;
  dark: Palette;
}

// Focus and selection use the same shade scale across sections.
function accents(palette: typeof colors.red, dark = false) {
  return {
    focus: palette[dark ? 400 : 600],
    selectionBackground: palette[dark ? 800 : 200],
    selectionForeground: palette[dark ? 100 : 950],
  };
}

/** Shared by HTML, SVG favicons and OG cards. Use resolved Tailwind colors so
 * standalone images don't depend on the site's CSS or duplicate its palette.
 */
export const themes = {
  welcome: {
    section: "welcome",
    heading: "Welcome",
    glyph: "~",
    favicon: "/favicon.svg",
    light: {
      ...accents(colors.yellow),
      badgeBackground: colors.yellow[300],
      badgeForeground: colors.yellow[950],
      heading: colors.yellow[700],
      link: colors.yellow[700],
    },
    dark: {
      ...accents(colors.yellow, true),
      badgeBackground: colors.yellow[500],
      badgeForeground: pageColors.dark.background,
      heading: colors.yellow[100],
      link: colors.yellow[500],
    },
  },
  projects: {
    section: "projects",
    heading: "Projects",
    href: "/projects",
    glyph: "*",
    transitionName: "projects-landmark",
    favicon: "/favicon-projects.svg",
    light: {
      ...accents(colors.green),
      badgeBackground: colors.red[800],
      badgeForeground: colors.red[100],
      heading: colors.red[950],
      link: colors.red[600],
    },
    dark: {
      ...accents(colors.green, true),
      badgeBackground: colors.red[900],
      badgeForeground: colors.red[100],
      heading: colors.red[100],
      link: colors.red[300],
    },
  },
  blog: {
    section: "blog",
    heading: "Blog",
    href: "/blog",
    glyph: "#",
    transitionName: "blog-landmark",
    favicon: "/favicon-blog.svg",
    light: {
      ...accents(colors.violet),
      badgeBackground: colors.violet[300],
      badgeForeground: colors.violet[950],
      heading: colors.violet[900],
      link: colors.violet[700],
    },
    dark: {
      ...accents(colors.violet, true),
      badgeBackground: colors.violet[800],
      badgeForeground: colors.violet[100],
      heading: colors.violet[200],
      link: colors.violet[300],
    },
  },
  tools: {
    section: "uses",
    heading: "Tools",
    href: "/uses",
    glyph: "$",
    transitionName: "tools-landmark",
    favicon: "/favicon-uses.svg",
    light: {
      ...accents(colors.emerald),
      badgeBackground: colors.black,
      badgeForeground: colors.green[400],
      heading: colors.green[950],
      link: colors.green[700],
    },
    dark: {
      ...accents(colors.emerald, true),
      badgeBackground: colors.zinc[800],
      badgeForeground: colors.green[400],
      heading: colors.green[100],
      link: colors.green[300],
    },
  },
  socials: {
    section: "socials",
    heading: "Socials",
    glyph: "@",
    light: {
      ...accents(colors.blue),
      badgeBackground: colors.blue[300],
      badgeForeground: colors.blue[950],
      heading: colors.blue[900],
      link: colors.zinc[900],
    },
    dark: {
      ...accents(colors.blue, true),
      badgeBackground: colors.blue[800],
      badgeForeground: colors.blue[100],
      heading: colors.blue[50],
      link: colors.zinc[200],
    },
  },
  notFound: {
    section: "not-found",
    heading: "Not Found",
    glyph: "?",
    light: {
      ...accents(colors.red),
      badgeBackground: colors.red[300],
      badgeForeground: colors.red[950],
      heading: colors.red[950],
      link: colors.red[800],
    },
    dark: {
      ...accents(colors.red, true),
      badgeBackground: colors.red[800],
      badgeForeground: colors.red[100],
      heading: colors.red[100],
      link: colors.red[300],
    },
  },
} satisfies Record<string, SectionTheme>;

export type ThemeName = keyof typeof themes;

export function faviconForPath(pathname: string): string {
  const section = pathname.split("/")[1];
  const theme: SectionTheme | undefined = Object.values(themes).find(
    (theme) => theme.section === section,
  );
  return theme?.favicon ?? themes.welcome.favicon;
}
