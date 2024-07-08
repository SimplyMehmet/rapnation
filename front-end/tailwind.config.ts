import type { Config } from "tailwindcss";
import plugin from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "c-light-green": "#2BA84A",
      "c-dark-green": "#248232",
      "c-black": "#040F0F",
      "c-white": "#ffffff",
    },
    extend: {
      fontFamily: {
        rokkitt: "var(--rokkitt)",
      },
    },
  },
  plugins: [
    {
      handler: ({ addUtilities }) => {
        addUtilities({
          ".no-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
        });
      },
    },
  ],
};
export default config;
