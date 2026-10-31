export function article(slug: string): string {
  return `/blog/${slug}`;
}

export function project(slug: string): string {
  return `/projects/${slug}`;
}

export type IconName =
  | "github"
  | "linkedin"
  | "x"
  | "twitter"
  | "envelope"
  | "rss";

export const socials: ReadonlyArray<{
  name: string;
  href: string;
  icon: IconName;
  /** Icon shown while hovering, if it differs from `icon`. */
  hoverIcon?: IconName;
}> = [
  {
    name: "GitHub",
    href: "https://github.com/NiclasvanEyk",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/niclas-van-eyk/",
    icon: "linkedin",
  },
  {
    name: "Email",
    href: "mailto:hi@niclasve.me",
    icon: "envelope",
  },
  {
    name: "RSS",
    href: "/feed.xml",
    icon: "rss",
  },
  {
    name: "X",
    href: "https://x.com/NiclasvanEijk",
    icon: "x",
    hoverIcon: "twitter",
  },
];
