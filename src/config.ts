import ogImage from "#src/images/ogimage.png";

export const SITE = {
  baseUrl: "https://bolepen.ooo",
  metadata: {
    author: "That Charming BOLE",
    shortTitle: "Bolepen",
    title: "In the Bolepen",
    fullTitle: "In the Bolepen: Habitat of That Charming BOLE",
    shortDescription: "Fursonal website for That Charming BOLE",
    description:
      "Welcome to the home base of That Charming BOLE, your friendly free-spirited doggo. I love belly rubs, making new friends, and sharing my adventures. Come on in and have a look around! Why wait? I don’t bite!",
    startYear: 2023,
  },
  theme: {
    color: "#48215b",
    backgroundColor: "#0e0911",
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
    iconifyClass: "media--feesubukku",
    href: "https://facebook.com/YtCharmyngeBole",
  },
  {
    name: "Instagram",
    iconifyClass: "media--innsuta",
    href: "https://instagram.com/YtCharmyngeBole",
  },
  {
    name: "Bluesky",
    iconifyClass: "media--bluesky",
    href: "https://bsky.app/profile/bolepen.ooo",
  },
  {
    name: "GitHub",
    iconifyClass: "media--github",
    href: "https://github.com/YtCharmyngeBole",
  },
  {
    name: "Discord",
    iconifyClass: "media--discord",
    href: "https://discordapp.com/users/1218406319124512821",
  },
  {
    name: "BARQ!",
    iconifyClass: "media--barq",
    href: "https://barq.app/@YtCharmyngeBole",
  },
  {
    name: "Plurk",
    iconifyClass: "media--plurk",
    href: "https://plurk.com/YtCharmyngeBole",
  },
  {
    name: "Mastodon",
    iconifyClass: "media--mastodon",
    href: "https://furry.engineer/@YtCharmyngeBole",
  },
];

/**
 * Represents a social media link with essential details,
 * including the name, the class name, and target URL.
 */
type MediaLink = {
  name: string;
  iconifyClass: string;
  href: string;
};
