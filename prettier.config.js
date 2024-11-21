/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
    // "prettier-plugin-classnames",
  ],
  tabWidth: 2,
  endPosition: "relative",
  printWidth: 60, // Set the desired line length
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.svelte",
      options: { parser: "svelte" },
    },
  ],
};
