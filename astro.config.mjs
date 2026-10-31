import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import autolinkHeadings from "rehype-autolink-headings";
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
     build: {
      inlineStylesheets: "always",
    }
  },
});
