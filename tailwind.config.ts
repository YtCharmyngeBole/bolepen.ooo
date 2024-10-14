import { addIconSelectors } from "@iconify/tailwind";
import tailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import type { PluginCreator } from "tailwindcss/types/config";

import { rem, round } from "#lib/styling.ts";

/**
 * Custom component in Tailwind
 */
const customComponent: PluginCreator = ({ addComponents, addVariant }) => {
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
  });
  addVariant("hocus", ["&:hover", "&:focus"]);
  addVariant("group-hocus", [
    ":merge(.group):hover &",
    ":merge(.group):focus &",
  ]);
  addVariant("peer-hocus", [
    ":merge(.peer):hover ~ &",
    ":merge(.peer):focus ~ &",
  ]);
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
      custom: {
        bg: "oklch(15% 0.02 313)",
        text: "oklch(79.27% 0.014 259.83)",
        touch: "oklch(90.06% 0.0373 85.99)",
        muted: "oklch(53.41% 0.0434 313.07)",
        ground: "oklch(70.77% 0.1844 27.61)",
        excited: "oklch(94.55% 0.0661 88.89)",
        beetroot: "oklch(65.17% 0.103 360)",
        orange: "oklch(70.96% 0.147 25.44)",
        lemon: "oklch(85.52% 0.107 88.56)",
        eggplant: "oklch(69.12% 0.126 314.07)",
      },
    },
    fontFamily: {
      display: ["Barlow", "'Barlow fallback'", ...defaultTheme.fontFamily.sans],
      body: [
        "'Iosevka Custom Web Propo'",
        "'Iosevka Custom Web fallback'",
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
  plugins: [
    tailwindTypography,
    addIconSelectors([
      {
        prefix: "social",
        source: "src/icons/social.json",
      },
      {
        prefix: "twemoji",
        source: "src/icons/twemoji.json",
      },
    ]),
    customComponent,
  ],
} as Config;
