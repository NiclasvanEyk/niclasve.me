import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import autolinkHeadings from 'rehype-autolink-headings';
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://niclasve.me",
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    expressiveCode({
      themes: ['dark-plus', 'light-plus'],
      styleOverrides: {
        codeFontFamily: "'Berkeley Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
      },
    }),
    mdx(),
  ],
  output: "static",
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [autolinkHeadings, { behavior: 'wrap' }],
    ],
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});
