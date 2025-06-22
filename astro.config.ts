import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import {
  astroExpressiveCode,
  ExpressiveCodeTheme,
} from "astro-expressive-code";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import { SITE } from "#src/config.ts";
import { PathBuilder } from "#lib/fs.ts";

const basePathBuilder = PathBuilder.fromImportMetaURL(import.meta.url);

// For astro-expressive-code: prepare textmate grammars and a theme
const extraLanguages = basePathBuilder
  .glob("src/lib/shiki/*.tmLanguage.json")
  .map((path) => JSON.parse(fs.readFileSync(path, "utf8")));
const ayuDarkTheme = ExpressiveCodeTheme.fromJSONString(
  fs.readFileSync(
    basePathBuilder.join("src/lib/shiki/ayu-dark-theme.json"),
    "utf8",
  ),
);

export default defineConfig({
  site: SITE.url,
  prefetch: true,
  integrations: [
    sitemap(),
    astroExpressiveCode({
      themes: [ayuDarkTheme],
      styleOverrides: {
        codeFontFamily:
          "'Iosevka Custom Web Mono', 'Iosevka Custom Web fallback', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        codeFontSize: "0.85rem",
        uiFontFamily:
          "'Iosevka Custom Web Mono', 'Iosevka Custom Web fallback', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        uiFontSize: "0.75rem",
      },
      shiki: {
        langs: extraLanguages,
      },
    }),
    mdx(),
    solidJs(),
  ],
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  vite: {
    plugins: [tailwindcss()],
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
    ],
  },
  experimental: {
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
  },
});
