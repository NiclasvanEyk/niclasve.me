import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import serviceWorker from "astrojs-service-worker";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://niclasve.me",
  integrations: [mdx(), sitemap(), serviceWorker()],
});
