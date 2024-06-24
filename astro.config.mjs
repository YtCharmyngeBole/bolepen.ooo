import fs from "node:fs";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { shield } from "@kindspells/astro-shield";
import { defineConfig } from "astro/config";
import {
  astroExpressiveCode,
  ExpressiveCodeTheme,
} from "astro-expressive-code";
import astroIcon from "astro-icon";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import defaultTheme from "tailwindcss/defaultTheme";

import { SITE } from "./src/config.ts";
import { PathBuilder } from "./src/lib/fs.ts";

const basePathBuilder = PathBuilder.fromImportMetaURL(import.meta.url);

// For astro-expressive-code: prepare textmate grammars and a theme
const extraLanguages = basePathBuilder
  .glob("src/shiki/*.tmLanguage.json")
  .map((path) => JSON.parse(fs.readFileSync(path, "utf-8")));
const ayuDarkTheme = ExpressiveCodeTheme.fromJSONString(
  fs.readFileSync(
    basePathBuilder.join("src/shiki/ayu-dark-theme.json"),
    "utf-8",
  ),
);

export default defineConfig({
  site: SITE.url,
  prefetch: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    astroIcon(),
    sitemap(),
    astroExpressiveCode({
      themes: [ayuDarkTheme],
      styleOverrides: {
        codeFontFamily: [
          "'Iosevka Custom Web Mono'",
          "'Iosevka Custom Web Propo'",
          "'Iosevka Custom Web fallback'",
          ...defaultTheme.fontFamily.mono,
        ],
        codeFontSize: "1rem",
      },
      shiki: {
        langs: extraLanguages,
      },
    }),
    mdx(),
    solidJs(),
    shield({}),
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: h("span.icon.icon--autolink-heading", {
            title: "Link to this heading",
            "aria-hidden": "true",
          }),
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
});
