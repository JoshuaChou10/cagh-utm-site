import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        uoft: {
          navy: "#1B587D",
          blue: "#57A9D6",
          sky: "#9BD8F2",
          pale: "#E7F6FD",
          ice: "#F5FBFE",
          ink: "#173B52"
        },
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0,42,92,.12)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle at 1px 1px, rgba(0,42,92,.12) 1px, transparent 0)"
      }
    },
  },
  plugins: [],
};
export default config;
