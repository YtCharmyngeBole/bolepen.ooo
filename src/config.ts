import type { SocialObject } from "#helpers/types.ts";
import ogImage from "#src/images/ogimage.png?url";

export const SITE = {
  author: "That Charming BOLE",
  title: "In The Bolepen",
  description:
    "Welcome to the home base of That Charming BOLE, your friendly free-spirited doggo. I love belly rubs, making new friends, and sharing my adventures. Come on in and have a look around! Why wait? I don’t bite!",
  url: "https://bolepen.ooo",
  themeColor: "#48215b",
  ogImage: ogImage as string,
  startYear: 2023,
} as const;

export const SOCIALS: SocialObject[] = [
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
    name: "Mastodon",
    iconifyClass: "social--mastodon",
    href: "https://furry.engineer/@YtCharmyngeBole",
  },
  {
    name: "Discord",
    iconifyClass: "social--discord",
    href: "https://discordapp.com/users/1218406319124512821",
  },
  {
    name: "Bluesky",
    iconifyClass: "social--bluesky",
    href: "https://bsky.app/profile/bolepen.ooo",
  },
  {
    name: "Plurk",
    iconifyClass: "social--plurk",
    href: "https://www.plurk.com/YtCharmyngeBole",
  },
  {
    name: "GitHub",
    iconifyClass: "social--github",
    href: "https://github.com/YtCharmyngeBole",
  },
];
