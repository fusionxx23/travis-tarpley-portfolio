// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
// https://astro.build/config
export default defineConfig({
  site: "https://.com",
  integrations: [mdx(), sitemap(), tailwind(), svelte()],
  output: "hybrid",
  adapter: vercel(),
});