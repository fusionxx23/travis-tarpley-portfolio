import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";
console.log(import.meta.env.GITHUB_CLIENT_ID);
export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
