import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import serviceWorker from "astrojs-service-worker";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";
import tailwind from "@astrojs/tailwind";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import autolinkHeadings from 'rehype-autolink-headings';
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://niclasve.me",
  prefetch: true,
  integrations: [
    sitemap(),
    serviceWorker(),
    tailwind(),
    react(),
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
