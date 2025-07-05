import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import type { AstroUserConfig } from "astro";
import { astroExpressiveCode } from "astro-expressive-code";
import type * as hast from "hast";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSlug from "rehype-slug";

import { SITE } from "#root/src/config.ts";
import rehypeCustomTwemoji from "#lib/unified/rehype-custom-twemoji.ts";

export default defineConfig({
  site: SITE.baseUrl,
  prefetch: true,
  integrations: [sitemap(), astroExpressiveCode(), mdx(), solidJs()],
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
      rehypeCustomTwemoji,
    ],
    smartypants: false,
  },
  experimental: {
    contentIntellisense: true,
    headingIdCompat: true,
    preserveScriptOrder: true,
  },
}) as AstroUserConfig;
