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
    name: "Facebook",
    icon: "facebook",
    href: "https://facebook.com/YtCharmyngeBole",
  },
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://instagram.com/YtCharmyngeBole",
  },
  {
    name: "Bluesky",
    icon: "bluesky",
    href: "https://bsky.app/profile/me.bolepen.ooo",
  },
  {
    name: "Twitter",
    icon: "twitter",
    href: "https://twitter.com/YtCharmyngeBole",
  },
  {
    name: "All Links",
    icon: "ellipsis",
    href: "/links",
  },
];

export const SOCIALS_FULL: SocialObject[] = [
  {
    name: "Facebook",
    icon: "facebook",
    href: "https://facebook.com/YtCharmyngeBole",
  },
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://instagram.com/YtCharmyngeBole",
  },
  {
    name: "Mastodon",
    icon: "mastodon",
    href: "https://furry.engineer/@YtCharmyngeBole",
  },
  {
    name: "Discord",
    icon: "discord",
    href: "https://discordapp.com/users/1218406319124512821",
  },
  {
    name: "Bluesky",
    icon: "bluesky",
    href: "https://bsky.app/profile/me.bolepen.ooo",
  },
  {
    name: "Twitter",
    icon: "twitter",
    href: "https://twitter.com/YtCharmyngeBole",
  },
  {
    name: "Plurk",
    icon: "plurk",
    href: "https://www.plurk.com/YtCharmyngeBole",
  },
  {
    name: "GitHub",
    icon: "github",
    href: "https://github.com/YtCharmyngeBole",
  },
];
