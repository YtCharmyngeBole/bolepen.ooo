import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import tailwindTypography from "@tailwindcss/typography";

const round = (num: number): string =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px: number): string => `${round(px / 16)}rem`;
const em = (px: number, base: number): string => `${round(px / base)}em`;
const oklch = (l: number, c: number, h: number): string =>
  `oklch(${l}% ${c} ${h} / <alpha-value>)`;

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
    },
    fontFamily: {
      display: ["Rubik", ...defaultTheme.fontFamily.sans],
      body: ["Inconsolata", ...defaultTheme.fontFamily.mono],
    },
    extend: {
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
