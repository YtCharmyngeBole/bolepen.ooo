import { addIconSelectors } from "@iconify/tailwind";
import socialIcons from "./social.json";
import twemojiIcons from "./twemoji.json";

export default addIconSelectors([
  {
    prefix: "social",
    source: socialIcons,
  },
  {
    prefix: "twemoji",
    source: twemojiIcons,
  },
]);
