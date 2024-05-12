import fs from "node:fs";

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { shield } from "@kindspells/astro-shield";
import defaultTheme from "tailwindcss/defaultTheme";
import astroExpressiveCode, {
  ExpressiveCodeTheme,
} from "astro-expressive-code";
import astroIcon from "astro-icon";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

import { SITE } from "./src/config.ts";

// For astro-expressive-code: read syntax highlight theme from JSON file
const ayuDarkTheme = ExpressiveCodeTheme.fromJSONString(
  fs.readFileSync(new URL("ayu-dark-theme.json", import.meta.url), "utf-8"),
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
          ...defaultTheme.fontFamily.mono,
        ],
        codeFontSize: "1rem",
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
