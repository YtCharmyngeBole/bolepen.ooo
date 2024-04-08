import _ from "lodash";

/**
 * Round a number to 7 decimal places and remove trailing zeros.
 */
export function round(num: number): string {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
}

/**
 * Convert pixel to rem assuming 16px base font size.
 */
export function rem(px: number): string {
  return `${round(px / 16)}rem`;
}

/**
 * Convert pixel to em using the given base font size.
 */
export function em(px: number, base: number): string {
  return `${round(px / base)}em`;
}

/**
 * Format OKLCH color value suitable for Tailwind CSS.
 */
export function oklch(
  l: number | string,
  c: number | string,
  h: number | string,
): string {
  return `oklch(${l}% ${c} ${h} / <alpha-value>)`;
}

/**
 * Generate an OKLCH palette based on the given chroma and hue.
 */
export function oklchPalette(
  c: number,
  h: number,
  ls: number[] = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95],
): Record<string, string> {
  return _.fromPairs(_.map(ls, (l) => [valueFromLuminance(l), oklch(l, c, h)]));
}

function valueFromLuminance(l: number): string {
  if (0 <= l && l <= 100) {
    return ((100 - l) * 10).toString();
  }
  throw new Error(`Invalid luminance value: ${l}`);
}
