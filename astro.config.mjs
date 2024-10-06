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

import { SITE } from "#src/config.ts";
import { PathBuilder } from "#lib/fs.ts";

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
    shield({
      // securityHeaders: {
      //   enableOnStaticPages: { provider: "netlify" },
      //   contentSecurityPolicy: {
      //     cspDirectives: {
      //       "default-src": "'none'",
      //       "script-src": "'self'",
      //       "style-src": "'self' 'unsafe-inline'",
      //       "img-src": "'self' data:",
      //       "font-src": "'self' data:",
      //       "frame-src": "'self'",
      //       "form-action": "'self'",
      //       "frame-ancestors": "'self'",
      //       "base-uri": "'self'",
      //       "worker-src": "'self'",
      //       "manifest-src": "'self'",
      //       "upgrade-insecure-requests": "",
      //     },
      //   },
      // },
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
