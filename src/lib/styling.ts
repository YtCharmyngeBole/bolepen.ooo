/**
 * Utility functions for generating CSS values,
 * especially useful for Tailwind CSS.
 */
import _ from "lodash";

/**
 * Round a number to 7 decimal places and remove trailing zeros.
 */
export function round(num: number, fractionDigits: number = 7): string {
  return num
    .toFixed(fractionDigits)
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
 * Format OKLAB color value suitable for Tailwind CSS.
 */
export function oklab(
  l: number | string,
  a: number | string,
  b: number | string,
): string {
  return `oklab(${l}% ${a} ${b} / <alpha-value>)`;
}

const luminancesPresets = {
  standard: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95],
  extended: [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  ],
} as Record<string, number[]>;

function valueFromLuminance(l: number): string {
  if (0 <= l && l <= 100) {
    return ((100 - l) * 10).toFixed();
  }
  throw new Error(`Invalid luminance value: ${l}`);
}

/**
 * Generate an OKLCH palette based on the given chroma and hue.
 */
export function oklchPalette(
  c: number,
  h: number,
  ls: keyof typeof luminancesPresets | number[] = "standard",
): Record<string, string> {
  const luminances = typeof ls === "string" ? luminancesPresets[ls] : ls;
  return _.fromPairs(
    _.map(luminances, (l) => [valueFromLuminance(l), oklch(l, c, h)]),
  );
}

/**
 * Generate an OKLCH palette based on the given chroma and hue.
 */
export function oklabPalette(
  a: number,
  b: number,
  ls: keyof typeof luminancesPresets | number[] = "standard",
): Record<string, string> {
  const luminances = typeof ls === "string" ? luminancesPresets[ls] : ls;
  return _.fromPairs(
    _.map(luminances, (l) => [valueFromLuminance(l), oklab(l, a, b)]),
  );
}
