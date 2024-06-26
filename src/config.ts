import type { SocialObject } from "#helpers/types.ts";
import ogImage from "#root/src/images/ogimage.png";

export const SITE = {
  author: "That Charming BOLE",
  title: "In The Bolepen",
  description:
    "Welcome to the home base of That Charming BOLE, your friendly free-spirited doggo. I love belly rubs, making new friends, and sharing my adventures. Come on in and have a look around! Why wait? I don’t bite!",
  url: "https://bolepen.ooo",
  themeColor: "#48215b",
  ogImage: ogImage.src,
  startYear: 2023,
} as const;

export const SOCIALS: SocialObject[] = [
  {
    name: "Facebook",
    href: "https://facebook.com/YtCharmyngeBole",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/YtCharmyngeBole",
  },
  {
    name: "Mastodon",
    href: "https://furry.engineer/@YtCharmyngeBole",
  },
  {
    name: "Discord",
    href: "https://discordapp.com/users/1218406319124512821",
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/me.bolepen.ooo",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/YtCharmyngeBole",
  },
  {
    name: "Plurk",
    href: "https://www.plurk.com/YtCharmyngeBole",
  },
  {
    name: "GitHub",
    href: "https://github.com/YtCharmyngeBole",
  },
];
