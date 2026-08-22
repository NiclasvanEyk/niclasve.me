import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import serviceWorker from "astrojs-service-worker";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import autolinkHeadings from "rehype-autolink-headings";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://niclasve.me",
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    sitemap(),
    serviceWorker(),
    react(),
    expressiveCode({
      themes: ["dark-plus", "light-plus"],
      styleOverrides: {
        codeFontFamily:
          "'Berkeley Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      },
    }),
    mdx(),
  ],
  output: "static",
  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeHeadingIds,
        [autolinkHeadings, { behavior: "wrap" }],
      ],
    }),
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
