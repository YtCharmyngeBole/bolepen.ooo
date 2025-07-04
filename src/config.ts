import type { MediaLink } from "#helpers/types.ts";
import ogImage from "#src/images/ogimage.png";

export const SITE = {
  baseUrl: "https://bolepen.ooo",
  metadata: {
    author: "That Charming BOLE",
    title: "In the Bolepen: Habitat of That Charming BOLE",
    description:
      "Welcome to the home base of That Charming BOLE, your friendly free-spirited doggo. I love belly rubs, making new friends, and sharing my adventures. Come on in and have a look around! Why wait? I don’t bite!",
    startYear: 2023,
  },
  theme: {
    color: "#48215b",
    ogImage: ogImage.src,
    mainFont: {
      path: "/fonts/IosevkaConsolasPropo-33.2.5-1/IosevkaConsolasPropo-Regular-Latin.woff2",
      linkType: "font/woff2",
    },
  },
} as const;

export const MEDIA_LINKS: MediaLink[] = [
  {
    name: "Facebook",
    iconifyClass: "social--feesubukku",
    href: "https://facebook.com/YtCharmyngeBole",
  },
  {
    name: "Instagram",
    iconifyClass: "social--innsuta",
    href: "https://instagram.com/YtCharmyngeBole",
  },
  {
    name: "Bluesky",
    iconifyClass: "social--bluesky",
    href: "https://bsky.app/profile/bolepen.ooo",
  },
  {
    name: "GitHub",
    iconifyClass: "social--github",
    href: "https://github.com/YtCharmyngeBole",
  },
  {
    name: "Discord",
    iconifyClass: "social--discord",
    href: "https://discordapp.com/users/1218406319124512821",
  },
  {
    name: "BARQ!",
    iconifyClass: "social--barq",
    href: "https://barq.app/@YtCharmyngeBole",
  },
  {
    name: "Plurk",
    iconifyClass: "social--plurk",
    href: "https://plurk.com/YtCharmyngeBole",
  },
  {
    name: "Mastodon",
    iconifyClass: "social--mastodon",
    href: "https://furry.engineer/@YtCharmyngeBole",
  },
];
