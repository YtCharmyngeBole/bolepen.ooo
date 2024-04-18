import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import tailwindTypography from "@tailwindcss/typography";
import { oklch, oklchPalette, rem, round } from "./src/lib/styling.ts";

/**
 * Custom component in Tailwind
 */
const customComponent: PluginCreator = ({ addComponents }) => {
  addComponents({});
};

export default {
  content: [
    "./src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,cjsx,tsx,mtsx,ctsx,astro,svelte,vue,html,md,mdx}",
  ],
  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      "ambient-bg": oklch(15, 0.02, 313),
      orange: oklchPalette(0.1914, 31),
      lemon: oklchPalette(0.0891, 78),
      fadecream: oklchPalette(0.03, 54),
    },
    fontFamily: {
      display: ["Barlow", ...defaultTheme.fontFamily.sans],
      body: ["Inconsolata", ...defaultTheme.fontFamily.mono],
    },
    screens: {
      phone: "480px",
      tablet: "640px",
      laptop: "960px",
      desktop: "1280px",
    },
    extend: {
      lineHeight: {
        "extra-tight": "1.125",
        "more-relaxed": "1.75",
        "almost-loose": "1.875",
        "extra-loose": "2.125",
        "overly-loose": "2.25",
      },
      typography: {
        sm: {
          css: {
            fontSize: rem(14),
            lineHeight: rem(20),
          },
        },
        base: {
          css: {
            fontSize: rem(16),
            lineHeight: rem(24),
          },
        },
        lg: {
          css: {
            fontSize: rem(18),
            lineHeight: rem(28),
          },
        },
        xl: {
          css: {
            fontSize: rem(20),
            lineHeight: round(28),
          },
        },
        "2xl": {
          css: {
            fontSize: rem(24),
            lineHeight: round(32),
          },
        },
      },
    },
  },
  plugins: [tailwindTypography, customComponent],
} as Config;
