import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import { shield } from "@kindspells/astro-shield";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import type { AstroUserConfig } from "astro";
import { astroExpressiveCode } from "astro-expressive-code";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

import { SITE } from "#src/config.ts";

export default defineConfig({
  site: SITE.url,
  prefetch: true,
  integrations: [
    sitemap(),
    astroExpressiveCode(),
    mdx(),
    solidJs(),
    shield({
      securityHeaders: {
        enableOnStaticPages: { provider: "netlify" },
        contentSecurityPolicy: {
          cspDirectives: {
            "default-src": "'none'",
            "script-src": "'self'",
            "style-src": "'self' 'unsafe-inline'",
            "img-src": "'self' data:",
            "font-src": "'self' data:",
            "frame-src": "'self'",
            "form-action": "'self'",
            "frame-ancestors": "'self'",
            "base-uri": "'self'",
            "worker-src": "'self'",
            "manifest-src": "'self'",
            // "upgrade-insecure-requests": "",
          },
        },
      },
    }),
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
}) as AstroUserConfig;
