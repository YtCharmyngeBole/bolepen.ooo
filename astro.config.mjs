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
import defaultTheme from "tailwindcss/defaultTheme";

import { SITE } from "#src/config.ts";
import { PathBuilder } from "#lib/fs.ts";

import netlify from "@astrojs/netlify";

const basePathBuilder = PathBuilder.fromImportMetaURL(import.meta.url);

// For astro-expressive-code: prepare textmate grammars and a theme
const extraLanguages = basePathBuilder
  .glob("src/lib/shiki/*.tmLanguage.json")
  .map((path) => JSON.parse(fs.readFileSync(path, "utf-8")));
const ayuDarkTheme = ExpressiveCodeTheme.fromJSONString(
  fs.readFileSync(
    basePathBuilder.join("src/lib/shiki/ayu-dark-theme.json"),
    "utf-8",
  ),
);

export default defineConfig({
  site: SITE.url,
  adapter: netlify({
    experimentalStaticHeaders: true,
  }),
  prefetch: true,
  integrations: [
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
        codeFontSize: "0.85rem",
        uiFontFamily: [
          "'Iosevka Custom Web Mono'",
          "'Iosevka Custom Web Propo'",
          "'Iosevka Custom Web fallback'",
          ...defaultTheme.fontFamily.mono,
        ],
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
