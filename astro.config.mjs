// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";
// https://astro.build/config
export default defineConfig({
  site: "https://.com",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    svelte(),
    auth(),
  ],
  output: "hybrid",
  adapter: vercel({
    edgeMiddleware: true,
  }),
});
