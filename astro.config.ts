import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";
import {
  astroExpressiveCode,
  type AstroExpressiveCodeOptions,
} from "astro-expressive-code";
import { glob } from "glob";
import type * as hast from "hast";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";

import { SITE } from "#src/config.ts";
import { pluginPlaceholderMarker } from "#lib/expressive-code/plugin-placeholder-marker.ts";
import rehypeCustomAlert from "#lib/unified/rehype-custom-alert.ts";
import rehypeCustomTwemoji from "#lib/unified/rehype-custom-twemoji.ts";

const basePath = fileURLToPath(new URL(".", import.meta.url));
const extraLanguagesPath = path.join(
  basePath,
  "src/lib/shiki/*.tmLanguage.json",
);
const extraLanguages = glob
  .sync(extraLanguagesPath)
  .map((path) => JSON.parse(fs.readFileSync(path, "utf8")));

/*
 *  _____                              _              ____          _         ____             __ _
 * | ____|_  ___ __  _ __ ___  ___ ___(_)_   _____   / ___|___   __| | ___   / ___|___  _ __  / _(_) __ _
 * |  _| \ \/ / '_ \| '__/ _ \/ __/ __| \ \ / / _ \ | |   / _ \ / _` |/ _ \ | |   / _ \| '_ \| |_| |/ _` |
 * | |___ >  <| |_) | | |  __/\__ \__ \ |\ V /  __/ | |__| (_) | (_| |  __/ | |__| (_) | | | |  _| | (_| |
 * |_____/_/\_\ .__/|_|  \___||___/___/_| \_/ \___|  \____\___/ \__,_|\___|  \____\___/|_| |_|_| |_|\__, |
 *            |_|                                                                                   |___/
 */
const expressiveCodeConfig: AstroExpressiveCodeOptions = {
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
};

/*
 *  ____      _                         ____             __ _
 * |  _ \ ___| |__  _   _ _ __   ___   / ___|___  _ __  / _(_) __ _ ___
 * | |_) / _ \ '_ \| | | | '_ \ / _ \ | |   / _ \| '_ \| |_| |/ _` / __|
 * |  _ <  __/ | | | |_| | |_) |  __/ | |__| (_) | | | |  _| | (_| \__ \
 * |_| \_\___|_| |_|\__, | .__/ \___|  \____\___/|_| |_|_| |_|\__, |___/
 *                  |___/|_|                                  |___/
 */

// Configuration for Autolink Headings plugin
const autolinkHeadingsConfig = {
  behavior: "append",
  content: h("span.icon.icon--autolink-heading", {
    "aria-hidden": "true",
  }),
  properties: {
    title: "Link to this heading",
  },
  test(element: hast.Element) {
    return element.tagName !== "h1";
  },
};

// Configuration for External Links plugin
const externalLinksConfig = {
  rel: ["noopener", "noreferrer"],
  properties: {
    "aria-description": "Link to external site",
  },
  content: {
    type: "text",
    value: "",
  },
  contentProperties: {
    class: "icon icon--external-link",
    title: "Link to external site",
    "aria-hidden": "true",
  },
};

// Configuration for Custom Alert plugin
const customAlertConfig = {
  allowedTypes: true,
};

// Configuration for Custom Twemoji plugin
const customTwemojiConfig = {
  className: "twemoji",
  callback(icon: string): string {
    return `/twemoji/${icon}.svg`;
  },
};

/*
 *  __  __       _            _        _                ____             __ _
 * |  \/  | __ _(_)_ __      / \   ___| |_ _ __ ___    / ___|___  _ __  / _(_) __ _
 * | |\/| |/ _` | | '_ \    / _ \ / __| __| '__/ _ \  | |   / _ \| '_ \| |_| |/ _` |
 * | |  | | (_| | | | | |  / ___ \\__ \ |_| | | (_) | | |__| (_) | | | |  _| | (_| |
 * |_|  |_|\__,_|_|_| |_| /_/   \_\___/\__|_|  \___/   \____\___/|_| |_|_| |_|\__, |
 *                                                                            |___/
 */
export default defineConfig({
  site: SITE.baseUrl,
  prefetch: true,
  integrations: [
    sitemap(),
    astroExpressiveCode(expressiveCodeConfig),
    mdx(),
    solidJs(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, autolinkHeadingsConfig],
      [rehypeExternalLinks, externalLinksConfig],
      rehypeUnwrapImages,
      [rehypeCustomAlert, customAlertConfig],
      [rehypeCustomTwemoji, customTwemojiConfig],
    ],
    smartypants: false,
  },
  experimental: {
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
  },
}) as AstroUserConfig;
