/**
 * Utility functions for generating CSS values,
 * especially useful for Tailwind CSS.
 */

import { isPercentageString, type PercentageString } from "./types.ts";

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
export function rem(px: number): `${number}rem` {
  return `${round(px / 16)}rem` as `${number}rem`;
}

/**
 * Convert pixel to em using the given base font size.
 */
export function em(px: number, base: number): `${number}em` {
  return `${round(px / base)}em` as `${number}em`;
}

/**
 * Color value in oklch space suitable for TailwindCss.
 */
export class Oklch {
  l: number;
  c: number;
  h: number;

  constructor(l: number | PercentageString, c: number, h: number) {
    this.l = isPercentageString(l) ? parseFloat(l) / 100 : l;
    this.c = c;
    this.h = h;
  }

  toString(): string {
    return `oklch(${this.l * 100}% ${this.c} ${this.h} / <alpha-value>)`;
  }

  /**
   * Interpolate between two Oklch colors.
   */
  static interpolate(lambda: number, start: Oklch, end: Oklch): Oklch {
    return new Oklch(
      start.l + lambda * (end.l - start.l),
      start.c + lambda * (end.c - start.c),
      start.h + lambda * (end.h - start.h),
    );
  }
}

/**
 * Create an Oklch color value
 */
export function oklch(
  l: number | PercentageString,
  c: number,
  h: number,
): Oklch {
  return new Oklch(l, c, h);
}
