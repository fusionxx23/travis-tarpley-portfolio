// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";
// https://astro.build/config
export default defineConfig({
  site: "https://travis-tarpley-portfolio-4aov.vercel.app",
  integrations: [sitemap(), tailwind(), svelte(), auth()],
  output: "server",
  adapter: vercel({}),
});
