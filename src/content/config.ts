import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    forceTheme: z.enum(["light", "dark"]).optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startedAt: z.coerce.date(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
    forceTheme: z.enum(["light", "dark"]).optional(),
  }),
});

export const collections = { blog, projects };
