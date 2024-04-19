import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import tailwindTypography from "@tailwindcss/typography";
import { oklch, rem, round } from "./src/lib/styling.ts";

/**
 * Custom component in Tailwind
 */
const customComponent: PluginCreator = ({ addComponents }) => {
  addComponents({
    ".roman": {
      fontStyle: "normal",
    },
    ".italic": {
      fontStyle: "italic",
    },
    ".oblique": {
      fontStyle: "oblique",
    },
  });
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
      beetroot: {
        50: "oklch(97.23% 0.007 354.79 / <alpha-value>)",
        100: "oklch(94.73% 0.014 0.27 / <alpha-value>)",
        200: "oklch(89.28% 0.03 356.35 / <alpha-value>)",
        300: "oklch(82.95% 0.047 357.76 / <alpha-value>)",
        400: "oklch(74.88% 0.072 358.31 / <alpha-value>)",
        500: "oklch(65.17% 0.103 360 / <alpha-value>)",
        600: "oklch(50.12% 0.119 2.91 / <alpha-value>)",
        700: "oklch(45.89% 0.109 1.92 / <alpha-value>)",
        800: "oklch(39.99% 0.091 1.72 / <alpha-value>)",
        900: "oklch(31.88% 0.068 1.58 / <alpha-value>)",
        950: "oklch(22.24% 0.043 0.76 / <alpha-value>)",
      },
      eggplant: {
        50: "oklch(97.3% 0.011 316.49 / <alpha-value>)",
        100: "oklch(93.52% 0.024 315.47 / <alpha-value>)",
        200: "oklch(87.81% 0.048 314.97 / <alpha-value>)",
        300: "oklch(81.32% 0.075 314.38 / <alpha-value>)",
        400: "oklch(75.78% 0.097 313.97 / <alpha-value>)",
        500: "oklch(69.12% 0.126 314.07 / <alpha-value>)",
        600: "oklch(57.52% 0.173 313.15 / <alpha-value>)",
        700: "oklch(46.21% 0.157 312.6 / <alpha-value>)",
        800: "oklch(35.48% 0.114 313.07 / <alpha-value>)",
        900: "oklch(22.73% 0.063 312.22 / <alpha-value>)",
        950: "oklch(16.93% 0.036 314.62 / <alpha-value>)",
      },
      fadecream: {
        50: "oklch(97.69% 0.008 48.66 / <alpha-value>)",
        100: "oklch(96.27% 0.012 59.57 / <alpha-value>)",
        200: "oklch(91.66% 0.027 53.14 / <alpha-value>)",
        300: "oklch(87.16% 0.043 54.36 / <alpha-value>)",
        400: "oklch(81.7% 0.062 53.75 / <alpha-value>)",
        500: "oklch(77.38% 0.078 52.66 / <alpha-value>)",
        600: "oklch(72.25% 0.097 52.46 / <alpha-value>)",
        700: "oklch(65.82% 0.122 51.1 / <alpha-value>)",
        800: "oklch(57.51% 0.12 49.7 / <alpha-value>)",
        900: "oklch(45.96% 0.092 50.82 / <alpha-value>)",
        950: "oklch(34.48% 0.066 50.29 / <alpha-value>)",
      },
      lemon: {
        50: "oklch(98.52% 0.011 89.72 / <alpha-value>)",
        100: "oklch(97.03% 0.023 90.75 / <alpha-value>)",
        200: "oklch(93.04% 0.052 89.04 / <alpha-value>)",
        300: "oklch(89.67% 0.079 88.89 / <alpha-value>)",
        400: "oklch(85.52% 0.107 88.56 / <alpha-value>)",
        500: "oklch(80.73% 0.134 87.23 / <alpha-value>)",
        600: "oklch(75.15% 0.147 84.06 / <alpha-value>)",
        700: "oklch(68.36% 0.133 83.93 / <alpha-value>)",
        800: "oklch(60.08% 0.116 85.17 / <alpha-value>)",
        900: "oklch(46.2% 0.088 84.99 / <alpha-value>)",
        950: "oklch(37.12% 0.068 86.19 / <alpha-value>)",
      },
      orange: {
        50: "oklch(94.89% 0.021 21.18 / <alpha-value>)",
        100: "oklch(90.12% 0.043 23.31 / <alpha-value>)",
        200: "oklch(80.63% 0.091 24.28 / <alpha-value>)",
        300: "oklch(70.96% 0.147 25.44 / <alpha-value>)",
        400: "oklch(63.87% 0.194 27.61 / <alpha-value>)",
        500: "oklch(58.59% 0.22 29.69 / <alpha-value>)",
        600: "oklch(49.54% 0.184 29.6 / <alpha-value>)",
        700: "oklch(41.13% 0.15 29.63 / <alpha-value>)",
        800: "oklch(31.17% 0.109 29.35 / <alpha-value>)",
        900: "oklch(20.44% 0.063 29.42 / <alpha-value>)",
        950: "oklch(14.46% 0.038 27.87 / <alpha-value>)",
      },
    },
    fontFamily: {
      display: ["Barlow", ...defaultTheme.fontFamily.sans],
      body: ["'Iosevka Custom Web'", ...defaultTheme.fontFamily.mono],
    },
    screens: {
      phone: "480px",
      tablet: "640px",
      laptop: "960px",
      desktop: "1280px",
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
