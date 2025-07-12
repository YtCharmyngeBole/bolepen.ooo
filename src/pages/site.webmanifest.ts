import { SITE } from "#src/config.ts";

/**
 * Generates a web manifest file for the site.
 */
export async function GET() {
  const data = {
    name: SITE.metadata.title,
    short_name: SITE.metadata.shortTitle,
    description: SITE.metadata.shortDescription,
    icons: [
      {
        src: "/favicons/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicons/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicons/pwa-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    start_url: "/",
    display: "minimal-ui",
    background_color: SITE.theme.backgroundColor,
    theme_color: SITE.theme.color,
  };
  return new Response(JSON.stringify(data));
}
