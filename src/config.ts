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
    ogImage: {
      src: ogImage.src,
      alt: 'A cartoon illustration features a muscular, purple and pink dog-like character with a large chest and belly, wearing yellow and white briefs. The character has an open-mouthed smile, showing white teeth and a normal-colored tongue, with orange face paint markings on its cheeks. Its right arm is raised in a thumbs-up gesture. Behind the character are light pink cloud shapes. To the left, text reads "That Charming BOLE" in purple, followed by some non-descriptive text in light pink. Below that is "https://bolepen.ooo" the URL of the website. The background is a light pink with a subtle pattern of vertical dashed lines.',
    },
    mainFont: {
      path: "/fonts/IosevkaCustomPropo-33.2.7-2/IosevkaCustomPropo-Regular-Latin.woff2",
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
