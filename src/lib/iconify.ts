/**
 * @fileoverview Iconify utilities to convert folder containing SVGs into a CSS file.
 */
import {
  cleanupSVG,
  type IconSet,
  importDirectory,
  isEmptyColor,
  parseColors,
  runSVGO,
} from "@iconify/tools";
import { getIconsCSS } from "@iconify/utils";
import type { IconifyInfo } from "@iconify/types";

type SvgToCssOptions = {
  svgDir: string;
  prefix: string;
  iconInfo: IconifyInfo | undefined;
};

export async function svgsToCss({
  svgDir,
  prefix,
  iconInfo,
}: SvgToCssOptions): Promise<string> {
  console.log(`${prefix}: Importing SVG from directory: ${svgDir}`);
  const iconSet = await importDirectory(svgDir, { prefix });
  iconSet.info = iconInfo;

  console.log(`${prefix}: Cleaning up SVG icons`);
  await cleanupIconSet(iconSet);
  const iconSetJson = iconSet.export();

  console.log(`${prefix}: Convert to CSS content`);
  return getIconsCSS(iconSetJson, Object.keys(iconSetJson.icons));
}

export async function cleanupIconSet(iconSet: IconSet) {
  await iconSet.forEach((name, type) => {
    if (type !== "icon") {
      return; // skip non-icon
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
      iconSet.remove(name);
      return; // skip invalid icon
    }

    try {
      cleanupSVG(svg);
      parseColors(svg, {
        defaultColor: "currentColor",
        callback: (attr, colorStr, color) => {
          return !color || isEmptyColor(color) ? colorStr : "currentColor";
        },
      });
      runSVGO(svg);
    } catch (err) {
      console.error(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return; // skip invalid icon
    }

    iconSet.fromSVG(name, svg);
  });
}
