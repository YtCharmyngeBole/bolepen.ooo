import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindTypography from "@tailwindcss/typography";
import type { PluginCreator } from "tailwindcss/types/config";
import { Oklch, rem, round } from "./src/lib/styling.ts";

const gray300 = new Oklch(0.8717, 0.009, 258.34);
const gray400 = new Oklch(0.7137, 0.019, 261.32);
const gray500 = new Oklch(0.551, 0.023, 264.36);

/**
 * Custom component in Tailwind
 */
const customComponent: PluginCreator = ({ addComponents }) => {
  addComponents({
    ".icon-masked": {
      display: "inline-block",
      backgroundColor: "currentColor",
      maskImage: "var(--svg)",
      maskRepeat: "no-repeat",
      maskSize: "100% 100%",
    },
    ".roman": {
      fontStyle: "normal",
    },
    ".italic": {
      fontStyle: "italic",
    },
    ".oblique": {
      fontStyle: "oblique",
    },
    ".nolig": {
      fontVariantLigatures: "none",
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
      grayext: {
        325: Oklch.interpolate(0.25, gray300, gray400).toString(),
        350: Oklch.interpolate(0.5, gray300, gray400).toString(),
        375: Oklch.interpolate(0.75, gray300, gray400).toString(),
        425: Oklch.interpolate(0.25, gray400, gray500).toString(),
        450: Oklch.interpolate(0.5, gray400, gray500).toString(),
        475: Oklch.interpolate(0.75, gray400, gray500).toString(),
      },
      "ambient-bg": new Oklch(0.15, 0.02, 313).toString(),
      beetroot: {
        50: new Oklch(0.9723, 0.007, 354.79).toString(),
        100: new Oklch(0.9473, 0.014, 0.27).toString(),
        200: new Oklch(0.8928, 0.03, 356.35).toString(),
        300: new Oklch(0.8295, 0.047, 357.76).toString(),
        400: new Oklch(0.7488, 0.072, 358.31).toString(),
        500: new Oklch(0.6517, 0.103, 360).toString(),
        600: new Oklch(0.5012, 0.119, 2.91).toString(),
        700: new Oklch(0.4589, 0.109, 1.92).toString(),
        800: new Oklch(0.3999, 0.091, 1.72).toString(),
        900: new Oklch(0.3188, 0.068, 1.58).toString(),
        950: new Oklch(0.2224, 0.043, 0.76).toString(),
      },
      eggplant: {
        50: new Oklch(0.973, 0.011, 316.49).toString(),
        100: new Oklch(0.9352, 0.024, 315.47).toString(),
        200: new Oklch(0.8781, 0.048, 314.97).toString(),
        300: new Oklch(0.8132, 0.075, 314.38).toString(),
        400: new Oklch(0.7578, 0.097, 313.97).toString(),
        500: new Oklch(0.6912, 0.126, 314.07).toString(),
        600: new Oklch(0.5752, 0.173, 313.15).toString(),
        700: new Oklch(0.4621, 0.157, 312.6).toString(),
        800: new Oklch(0.3548, 0.114, 313.07).toString(),
        900: new Oklch(0.2273, 0.063, 312.22).toString(),
        950: new Oklch(0.1693, 0.036, 314.62).toString(),
      },
      fadecream: {
        50: new Oklch(0.9769, 0.008, 48.66).toString(),
        100: new Oklch(0.9627, 0.012, 59.57).toString(),
        200: new Oklch(0.9166, 0.027, 53.14).toString(),
        300: new Oklch(0.8716, 0.043, 54.36).toString(),
        400: new Oklch(0.817, 0.062, 53.75).toString(),
        500: new Oklch(0.7738, 0.078, 52.66).toString(),
        600: new Oklch(0.7225, 0.097, 52.46).toString(),
        700: new Oklch(0.6582, 0.122, 51.1).toString(),
        800: new Oklch(0.5751, 0.12, 49.7).toString(),
        900: new Oklch(0.4596, 0.092, 50.82).toString(),
        950: new Oklch(0.3448, 0.066, 50.29).toString(),
      },
      lemon: {
        50: new Oklch(0.9852, 0.011, 89.72).toString(),
        100: new Oklch(0.9703, 0.023, 90.75).toString(),
        200: new Oklch(0.9304, 0.052, 89.04).toString(),
        300: new Oklch(0.8967, 0.079, 88.89).toString(),
        400: new Oklch(0.8552, 0.107, 88.56).toString(),
        500: new Oklch(0.8073, 0.134, 87.23).toString(),
        600: new Oklch(0.7515, 0.147, 84.06).toString(),
        700: new Oklch(0.6836, 0.133, 83.93).toString(),
        800: new Oklch(0.6008, 0.116, 85.17).toString(),
        900: new Oklch(0.462, 0.088, 84.99).toString(),
        950: new Oklch(0.3712, 0.068, 86.19).toString(),
      },
      orange: {
        50: new Oklch(0.9489, 0.021, 21.18).toString(),
        100: new Oklch(0.9012, 0.043, 23.31).toString(),
        200: new Oklch(0.8063, 0.091, 24.28).toString(),
        300: new Oklch(0.7096, 0.147, 25.44).toString(),
        400: new Oklch(0.6387, 0.194, 27.61).toString(),
        500: new Oklch(0.5859, 0.22, 29.69).toString(),
        600: new Oklch(0.4954, 0.184, 29.6).toString(),
        700: new Oklch(0.4113, 0.15, 29.63).toString(),
        800: new Oklch(0.3117, 0.109, 29.35).toString(),
        900: new Oklch(0.2044, 0.063, 29.42).toString(),
        950: new Oklch(0.1446, 0.038, 27.87).toString(),
      },
    },
    fontFamily: {
      display: ["Barlow", "'Barlow override'", ...defaultTheme.fontFamily.sans],
      body: [
        "'Iosevka Custom Web Propo'",
        "'Iosevka Custom Web override'",
        ...defaultTheme.fontFamily.sans,
      ],
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
