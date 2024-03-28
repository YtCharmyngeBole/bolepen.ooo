import type { SocialObject } from "./helpers/types.ts";
import ogImage from "./images/pauline-loroy-U3aF7hgUSrk-unsplash.jpg";

export const SITE = {
  author: "That Charming BOLE",
  title: "In The Bolepen",
  description: "Fursonal website for That Charming BOLE",
  ogImage: ogImage.src,
  themeColor: "#48215B",
  url: "https://bolepen.ooo",
};

// TODO: Use social objects in website
export const SOCIALS: SocialObject[] = [
  {
    name: "Facebook",
    href: "https://facebook.com/YtCharmyngeBole",
    active: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/YtCharmyngeBole",
    active: true,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/ytcharmyngebole.bsky.social",
    active: true,
  },
  {
    name: "Mastodon",
    href: "https://furry.engineer/@YtCharmyngeBole",
    active: true,
  },
  {
    name: "Plurk",
    href: "https://www.plurk.com/YtCharmyngeBole",
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/YtCharmyngeBole",
    active: true,
  },
  {
    name: "Discord",
    href: "https://discordapp.com/users/1218406319124512821",
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/YtCharmyngeBole",
    active: false,
  },
];
