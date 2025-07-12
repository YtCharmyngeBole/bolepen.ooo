import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineEcConfig } from "astro-expressive-code";
import { glob } from "glob";

import { pluginPlaceholderMarker } from "#lib/expressive-code/plugin-placeholder-marker.ts";

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
  styleOverrides: {
    borderColor: "var(--ec-border-color)",
    borderRadius: "var(--ec-border-radius)",
    borderWidth: "var(--ec-border-width)",
    codeFontFamily: "var(--font-mono)",
    codeFontSize: "var(--ec-code-font-size)",
    uiFontFamily: "var(--font-sans)",
    uiFontSize: "var(--ec-ui-font-size)",
    frames: {
      shadowColor: "var(--ec-frame-shadow-color)",
    },
  },
  themes: ["catppuccin-mocha", "catppuccin-latte"],
  useDarkModeMediaQuery: false,
  useStyleReset: false,
  shiki: {
    langs: extraLanguages,
  },
  plugins: [pluginPlaceholderMarker()],
});
