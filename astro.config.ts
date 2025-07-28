import { builder as rehypeEnhancedAlert } from "@abhabongse/rehype-enhanced-alert/builder";
import { rehypeReplaceTwemoji } from "@abhabongse/rehype-replace-twemoji";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";
import {
  astroExpressiveCode,
  type AstroExpressiveCodeOptions,
} from "astro-expressive-code";
import type * as hast from "hast";
import { whitespace } from "hast-util-whitespace";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { ViteToml } from "vite-plugin-toml";

import { pluginPlaceholderMarker } from "./lib/expressive-code/plugin-placeholder-marker.ts";
import { langs } from "./lib/shiki/languages.ts";

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
  shiki: { langs },
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

// Configure Autolink Headings plugin
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

// Configure External Links plugin
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

// Configure alert plugin for type "SMALLNOTE"
function smallnoteAlertConfig(
  alertType: string,
  displayText: string,
  children: hast.ElementContent[],
): hast.Element | false {
  if (alertType !== "smallnote") return false;
  if (!whitespace(displayText)) return false; // disallows custom headings

  return h(`aside.smallnote`, [
    h(`span.smallnote-icon`),
    " ",
    h("div.smallnote-body", children),
  ]);
}

// Configure alert plugin for all other alert types
const fallbackAlertConfig = {
  allowedTypes: true,
  allowsCustomHeading: false,
};

// Configure Twemoji plugin to use local SVGs
const replaceTwemojiConfig = {
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
  site: "https://bolepen.ooo",
  prefetch: true,
  integrations: [sitemap(), astroExpressiveCode(expressiveCodeConfig), mdx()],
  vite: {
    plugins: [tailwindcss(), ViteToml()],
  },
  image: {
    responsiveStyles: true,
    layout: "none",
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, autolinkHeadingsConfig],
      [rehypeExternalLinks, externalLinksConfig],
      rehypeUnwrapImages,
      [rehypeEnhancedAlert(), smallnoteAlertConfig],
      [rehypeEnhancedAlert(), fallbackAlertConfig],
      [rehypeReplaceTwemoji, replaceTwemojiConfig],
    ],
    smartypants: false,
  },
  experimental: {
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
  },
}) as AstroUserConfig;
