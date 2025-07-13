import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import type { AstroUserConfig } from "astro";
import { astroExpressiveCode } from "astro-expressive-code";
import { glob } from "glob";
import type * as hast from "hast";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSlug from "rehype-slug";

import { SITE } from "#src/config.ts";
import { pluginPlaceholderMarker } from "#lib/expressive-code/plugin-placeholder-marker.ts";
import rehypeCustomTwemoji from "#lib/unified/rehype-custom-twemoji.ts";
import rehypeCustomAlert from "#lib/unified/rehype-custom-alert.ts";

const basePath = fileURLToPath(new URL(".", import.meta.url));
const extraLanguagesPath = path.join(
  basePath,
  "src/lib/shiki/*.tmLanguage.json",
);
const extraLanguages = glob
  .sync(extraLanguagesPath)
  .map((path) => JSON.parse(fs.readFileSync(path, "utf8")));

export default defineConfig({
  site: SITE.baseUrl,
  prefetch: true,
  integrations: [
    sitemap(),
    astroExpressiveCode({
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
    }),
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
      [
        rehypeAutolinkHeadings,
        {
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
        },
      ],
      [
        rehypeExternalLinks,
        {
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
        },
      ],
      rehypeUnwrapImages,
      [rehypeCustomAlert, { allowedTypes: true }],
      [
        rehypeCustomTwemoji,
        {
          className: "twemoji",
          callback(icon: string): string {
            return `/twemoji/${icon}.svg`;
          },
        },
      ],
    ],
    smartypants: false,
  },
  experimental: {
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
  },
}) as AstroUserConfig;
