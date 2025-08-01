import config from "#root/config.toml";

/**
 * Generates a web manifest file for the site.
 */
export async function GET() {
  const data = {
    name: config.site.metadata.title,
    short_name: config.site.metadata.shortTitle,
    description: config.site.metadata.shortDescription,
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
    background_color: config.site.theme.backgroundColor,
    theme_color: config.site.theme.color,
  };
  return new Response(JSON.stringify(data));
}
