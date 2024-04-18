import type { SocialObject } from "./helpers/types.ts";
import ogImage from "./images/ogimage.png";

export const SITE = {
  author: "That Charming BOLE",
  title: "In The Bolepen",
  description: "A fursonal website for That Charming BOLE",
  url: "https://bolepen.ooo",
  themeColor: "#48215b",
  ogImage: ogImage.src,
  startYear: 2023,
} as const;

export const SOCIALS_SHORT: SocialObject[] = [
  {
    name: "Me on Facebook",
    icon: "facebook",
    href: "https://facebook.com/YtCharmyngeBole",
  },
  {
    name: "Me on Instagram",
    icon: "instagram",
    href: "https://instagram.com/YtCharmyngeBole",
  },
  {
    name: "Me on Bluesky",
    icon: "bluesky",
    href: "https://bsky.app/profile/me.bolepen.ooo",
  },
  {
    name: "Me on Twitter",
    icon: "twitter",
    href: "https://twitter.com/YtCharmyngeBole",
  },
  {
    name: "See all links",
    icon: "ellipsis",
    href: "/links",
  },
];

export const SOCIALS_FULL: SocialObject[] = [
  {
    name: "Me on Facebook",
    icon: "facebook",
    href: "https://facebook.com/YtCharmyngeBole",
  },
  {
    name: "Me on Instagram",
    icon: "instagram",
    href: "https://instagram.com/YtCharmyngeBole",
  },
  {
    name: "Me on Mastodon",
    icon: "mastodon",
    href: "https://furry.engineer/@YtCharmyngeBole",
  },
  {
    name: "Me on Discord",
    icon: "discord",
    href: "https://discordapp.com/users/1218406319124512821",
  },
  {
    name: "Me on Bluesky",
    icon: "bluesky",
    href: "https://bsky.app/profile/me.bolepen.ooo",
  },
  {
    name: "Me on Twitter",
    icon: "twitter",
    href: "https://twitter.com/YtCharmyngeBole",
  },
  {
    name: "Me on Plurk",
    icon: "plurk",
    href: "https://www.plurk.com/YtCharmyngeBole",
  },
  {
    name: "Me on GitHub",
    icon: "github",
    href: "https://github.com/YtCharmyngeBole",
  },
];
