import fs from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { shield } from "@kindspells/astro-shield";
import defaultTheme from "tailwindcss/defaultTheme";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

import { SITE } from "./src/config.ts";

const rootDir = new URL(".", import.meta.url).pathname;
const modulePath = resolve(rootDir, "src", "generated", "sriHashes.mjs");

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  prefetch: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    icon(),
    sitemap(),
    expressiveCode({
      themes: [JSON.parse(fs.readFileSync("./src/ayu-dark.json", "utf-8"))],
      styleOverrides: {
        codeFontFamily: [
          "'Iosevka Custom Web Mono'",
          ...defaultTheme.fontFamily.mono,
        ],
        codeFontSize: "1rem",
      },
    }),
    mdx(),
    solid(),
    shield({
      sri: {
        hashesModule: modulePath,
      },
    }),
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
