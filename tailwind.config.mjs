import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translate(0px,9px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0,0)",
          },
        },
        fadeDown: {
          "0%": {
            opacity: "0",
            transform: "translate(0px,-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0,0)",
          },
        },
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "border-beam":
          "border-beam calc(var(--duration)*1s) infinite linear",
        "fade-in": "fadeIn 0.6s ease-in-out forwards",
        "fade-down": "fadeDown 0.7s ease-out forwards",
        orbit:
          "orbit calc(var(--duration)*1s) linear infinite",
      },
      colors: {
        background: {
          100: "hsl(var(--background-100), <alpha-value>)",
          200: "hsl(var(--background-200), <alpha-value>)",
          600: "hsl(var(--background-600), <alpha-value>)",
        },
        primary: {
          100: "hsl(var(--primary-100), <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
