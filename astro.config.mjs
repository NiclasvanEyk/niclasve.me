import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import serviceWorker from "astrojs-service-worker";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import autolinkHeadings from 'rehype-autolink-headings';
import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

const expressiveCodeIntegration = expressiveCode({
  themes: ['dark-plus', 'light-plus'],
})

// https://astro.build/config
export default defineConfig({
  site: "https://niclasve.me",
  integrations: [sitemap(), serviceWorker(), tailwind(), react(), expressiveCodeIntegration, mdx()],
  output: "server",
  markdown: {
    rehypePlugins: [rehypeHeadingIds, [autolinkHeadings, {
      behavior: 'wrap'
    }]]
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});
