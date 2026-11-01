import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import type { Card } from "@/og/cards";
import { renderCardPng } from "@/og/render";

/**
 * One PNG per card, generated at build time:
 *
 *   /og/home.png
 *   /og/projects.png, /og/blog.png, /og/uses.png
 *   /og/projects/<slug>.png, /og/blog/<slug>.png
 */
export const getStaticPaths = (async () => {
  // Drafts are visible during development, so their cards have to exist there too.
  const blogEntries =
    import.meta.env.MODE === "development"
      ? await getCollection("blog")
      : await getCollection("blog", (entry) => entry.data.pubDate);

  const projects = await getCollection("projects");

  const cards: Array<{ slug: string; card: Card }> = [
    { slug: "home", card: { variant: "home" } },
    {
      slug: "projects",
      card: {
        variant: "page",
        theme: "projects",
        href: "/projects",
        title: "Projects",
        description: "A list of my personal side projects.",
      },
    },
    {
      slug: "blog",
      card: {
        variant: "page",
        theme: "blog",
        href: "/blog",
        title: "Blog",
      },
    },
    {
      slug: "uses",
      card: {
        variant: "page",
        theme: "tools",
        href: "/uses",
        title: "Tools",
        description: "The tools and software I use every day.",
      },
    },
    ...projects.map((project) => ({
      slug: `projects/${project.id}`,
      card: {
        variant: "page",
        theme: "projects",
        href: `/projects/${project.id}`,
        eyebrow: "Projects",
        title: project.data.title,
        description: project.data.description,
      } satisfies Card,
    })),
    ...blogEntries.map((post) => ({
      slug: `blog/${post.id}`,
      card: {
        variant: "page",
        theme: "blog",
        href: `/blog/${post.id}`,
        eyebrow: "Blog",
        title: post.data.title,
        description: post.data.description || undefined,
      } satisfies Card,
    })),
  ];

  return cards.map(({ slug, card }) => ({ params: { slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderCardPng((props as { card: Card }).card);

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
