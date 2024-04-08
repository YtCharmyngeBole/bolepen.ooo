import _ from "lodash";

/**
 * Round a number to 7 decimal places and remove trailing zeros.
 */
export const round = (num: number): string =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");

/**
 * Convert pixel to rem assuming 16px base font size.
 */
export const rem = (px: number): string => `${round(px / 16)}rem`;

/**
 * Convert pixel to em using the given base font size.
 */
export const em = (px: number, base: number): string => `${round(px / base)}em`;

/**
 * Format OKLCH color value suitable for Tailwind CSS.
 */
export const oklch = (
  l: number | string,
  c: number | string,
  h: number | string,
): string => `oklch(${l}% ${c} ${h} / <alpha-value>)`;

const luminances = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95] as const;
const luminanceToValue = (l: (typeof luminances)[number]): string =>
  ((100 - l) * 10).toString();

/**
 * Generate an OKLCH palette based on the given chroma and hue.
 */
export const oklchPalette = (c: number, h: number) =>
  _.fromPairs(_.map(luminances, (l) => [luminanceToValue(l), oklch(l, c, h)]));
