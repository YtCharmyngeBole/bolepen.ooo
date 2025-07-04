import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineEcConfig } from "astro-expressive-code";
import { glob } from "glob";

const basePath = fileURLToPath(new URL(".", import.meta.url));
const extraLanguagesPath = path.join(
  basePath,
  "src/lib/shiki/*.tmLanguage.json",
);
const extraLanguages = glob
  .sync(extraLanguagesPath)
  .map((path) => JSON.parse(fs.readFileSync(path, "utf8")));

/**
 * @see https://expressive-code.com/reference/configuration/#using-an-ecconfigmjs-file
 * @type import('astro-expressive-code').AstroExpressiveCodeOptions
 */
export default defineEcConfig({
  // themes: ["catppuccin-mocha", "catppuccin-latte"],
  themes: ["catppuccin-mocha"],
  styleOverrides: {
    borderColor: "var(--ec-border-color)",
    borderRadius: "var(--ec-border-radius)",
    borderWidth: "var(--ec-border-width)",
    codeFontFamily: "var(--font-mono)",
    codeFontSize: "0.95rem", // NOTE: Not work when specified as a CSS variable
    uiFontFamily: "var(--font-sans)",
    uiFontSize: "0.9rem", // NOTE: Not work when specified as a CSS variable
    frames: {
      shadowColor: "var(--ec-frame-shadow-color)",
    },
  },
  useDarkModeMediaQuery: false,
  shiki: {
    langs: extraLanguages,
  },
});
