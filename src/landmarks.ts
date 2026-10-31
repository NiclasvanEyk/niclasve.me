// One identity for each section, from homepage to overview to detail navigation.
export const landmarks = {
  projects: {
    section: "projects" as const,
    heading: "Projects",
    href: "/projects",
    glyph: "*",
    glyphClass: "bg-red-800 text-red-100 dark:bg-red-900",
    headingClass: "text-red-950 dark:text-red-100",
    transitionName: "projects-landmark",
  },
  blog: {
    section: "blog" as const,
    heading: "Blog",
    href: "/blog",
    glyph: "#",
    glyphClass:
      "bg-violet-300 text-violet-950 dark:bg-violet-800 dark:text-violet-100",
    headingClass: "text-violet-900 dark:text-violet-200",
    transitionName: "blog-landmark",
  },
  tools: {
    section: "uses" as const,
    heading: "Tools",
    href: "/uses",
    glyph: "$",
    glyphClass: "bg-black text-green-400 dark:bg-zinc-800",
    headingClass: "text-green-950 dark:text-green-100",
    transitionName: "tools-landmark",
  },
};

export type Landmark = keyof typeof landmarks;
