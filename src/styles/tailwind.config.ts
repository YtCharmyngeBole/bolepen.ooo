import type { Config } from "tailwindcss";

/**
 * Round a number to 7 decimal places and remove trailing zeros.
 * [Reference](https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js)
 */
export function round(num: number, fractionDigits: number = 7): string {
  return num
    .toFixed(fractionDigits)
    .replace(/(\.\d+?)0+$/, "$1")
    .replace(/\.0$/, "");
}

/**
 * Convert pixel to rem assuming 16px base font size.
 * [Reference](https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js)
 */
export function rem(px: number): `${number}rem` {
  return `${round(px / 16)}rem` as `${number}rem`;
}

/**
 * Convert pixel to em using the given base font size.
 * [Reference](https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js)
 */
export function em(px: number, base: number): `${number}em` {
  return `${round(px / base)}em` as `${number}em`;
}

export default {
  theme: {
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
} as Config;
