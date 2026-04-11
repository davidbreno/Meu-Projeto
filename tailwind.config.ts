import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        matteBlack: "#0F0F10",
        agedGold: "#B89B5E",
        graphite: "#2D2E32",
        vintageBeige: "#E7D9BF",
        leatherBrown: "#3B2A20",
        softWhite: "#F6F2E9"
      }
    }
  },
  plugins: []
};

export default config;
