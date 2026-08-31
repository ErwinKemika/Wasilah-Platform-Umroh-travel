import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Golden Linen" — warm golden-brown on a linen base
        wasilah: {
          50: "#faf6ec",
          100: "#f2e8d0",
          200: "#e6d3a9",
          300: "#d8ba7c",
          400: "#c99f4f",
          500: "#b8873b",
          600: "#9c6f30",
          700: "#7d5827",
          800: "#5f4420",
          900: "#43301a",
        },
        gold: {
          400: "#e0b354",
          500: "#c99a3f",
        },
        linen: {
          DEFAULT: "#f4efe2",
          card: "#faf7ef",
          border: "#e4dac2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
