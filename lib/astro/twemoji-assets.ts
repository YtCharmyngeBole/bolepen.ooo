import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { AstroIntegration } from "astro";

/**
 * URL path prefix under which Twemoji SVGs are served in dev and emitted at build.
 * This is the single source of truth shared with the rehype callback in astro.config.ts.
 */
export const TWEMOJI_URL_PREFIX = "/twemoji/";

/**
 * Directory holding the full set of Twemoji SVGs.
 * This is the `vendor/twemoji` git submodule, which is the only copy of the icons:
 * the individual SVGs are not committed to this repository.
 */
const TWEMOJI_SOURCE_DIR = path.resolve("vendor/twemoji/assets/svg");

/** Builds the public URL for a Twemoji icon id such as "1f436" or "1f1fa-1f1f8". */
export function twemojiIconUrl(icon: string): string {
  return `${TWEMOJI_URL_PREFIX}${icon}.svg`;
}

const ICON_SUFFIX = ".svg";

/** Icon ids are lowercase hex codepoints joined by hyphens; reject anything else. */
const ICON_ID_PATTERN = /^[0-9a-f-]+$/;

/** Matches emitted Twemoji SVG URLs, capturing the icon id. */
const TWEMOJI_URL_PATTERN = new RegExp(
  `${escapeRegExp(TWEMOJI_URL_PREFIX)}([0-9a-f-]+)${escapeRegExp(ICON_SUFFIX)}`,
  "g",
);

/**
 * Astro integration that serves Twemoji SVGs on demand and ships only the ones the site
 * actually references.
 *
 * The icons live wholesale in the `vendor/twemoji` submodule (~3800 files). Symlinking that
 * directory into `public/` would copy every icon into the build even though a handful are used.
 * Instead this integration:
 *
 * - in dev, serves any requested icon straight from the submodule, so authoring an emoji into
 *   text just works with no manual step;
 * - at build, scans the generated output for referenced icons and copies only those into the
 *   output `/twemoji/` directory.
 *
 * Because the shipped set is derived from the emitted HTML and feeds, it can never drift from
 * what the pages request.
 */
export function twemojiAssets(): AstroIntegration {
  return {
    name: "twemoji-assets",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const icon = iconFromUrl(req.url);
          const source = icon && iconSourcePath(icon);
          if (!source) {
            next();
            return;
          }
          fs.readFile(source, (err, data) => {
            if (err) {
              next();
              return;
            }
            res.setHeader("Content-Type", "image/svg+xml");
            res.end(data);
          });
        });
      },
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const used = await collectReferencedIcons(outDir);

        // A referenced icon with no source file means the submodule is absent or out of date.
        // Fail loudly rather than shipping pages with broken emoji images.
        const missing = [...used].filter(
          (icon) => !fs.existsSync(iconSourcePath(icon)!),
        );
        if (missing.length > 0) {
          throw new Error(
            `Missing Twemoji SVGs for [${missing.join(", ")}] under ${TWEMOJI_SOURCE_DIR}. ` +
              `Check out the vendor/twemoji submodule: ` +
              `git submodule update --init --checkout vendor/twemoji`,
          );
        }

        const destDir = path.join(outDir, "twemoji");
        await fs.promises.mkdir(destDir, { recursive: true });
        await Promise.all(
          [...used].map((icon) =>
            fs.promises.copyFile(
              iconSourcePath(icon)!,
              path.join(destDir, `${icon}${ICON_SUFFIX}`),
            ),
          ),
        );
        logger.info(
          `Emitted ${used.size} referenced Twemoji SVG${used.size === 1 ? "" : "s"}.`,
        );
      },
    },
  };
}

/** Extracts the icon id from a request URL, or null when the URL is not a Twemoji icon. */
function iconFromUrl(url: string | undefined): string | null {
  const pathname = url?.split("?", 1)[0];
  if (
    !pathname?.startsWith(TWEMOJI_URL_PREFIX) ||
    !pathname.endsWith(ICON_SUFFIX)
  ) {
    return null;
  }
  return pathname.slice(TWEMOJI_URL_PREFIX.length, -ICON_SUFFIX.length);
}

/**
 * Resolves an icon id to its source SVG path, or null when the id is malformed.
 * The pattern check also blocks path traversal, since the id becomes a filename.
 */
function iconSourcePath(icon: string): string | null {
  if (!ICON_ID_PATTERN.test(icon)) {
    return null;
  }
  return path.join(TWEMOJI_SOURCE_DIR, `${icon}${ICON_SUFFIX}`);
}

/** Walks the built output and collects every referenced Twemoji icon id. */
async function collectReferencedIcons(rootDir: string): Promise<Set<string>> {
  const icons = new Set<string>();
  const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(rootDir, entry.name);
      if (entry.isDirectory()) {
        for (const icon of await collectReferencedIcons(full)) {
          icons.add(icon);
        }
      } else if (/\.(html|xml)$/.test(entry.name)) {
        const text = await fs.promises.readFile(full, "utf-8");
        for (const match of text.matchAll(TWEMOJI_URL_PATTERN)) {
          icons.add(match[1]);
        }
      }
    }),
  );
  return icons;
}

/** Escapes a literal string for safe interpolation into a regular expression. */
function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
