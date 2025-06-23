import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { defineEcConfig } from "astro-expressive-code";
import { glob } from "glob";

const basePath = fileURLToPath(new URL(".", import.meta.url));
const extraLanguagesPath = path.join(basePath, "src/shiki/*.tmLanguage.json");
const extraLanguages = glob
  .sync(extraLanguagesPath)
  .map((path) => JSON.parse(fs.readFileSync(path, "utf8")));

/**
 * @see https://expressive-code.com/reference/configuration/#using-an-ecconfigmjs-file
 * @type import('astro-expressive-code').AstroExpressiveCodeOptions
 */
export default defineEcConfig({
  themes: ["catppuccin-mocha"],
  styleOverrides: {
    codeFontFamily:
      "'Iosevka Custom Web Mono', 'Iosevka Custom Web fallback', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    codeFontSize: "0.9rem",
    uiFontFamily:
      "'Iosevka Custom Web Mono', 'Iosevka Custom Web fallback', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    uiFontSize: "0.8rem",
    frames: {
      shadowColor: "#00000033",
    },
  },
  shiki: {
    langs: extraLanguages,
  },
});
