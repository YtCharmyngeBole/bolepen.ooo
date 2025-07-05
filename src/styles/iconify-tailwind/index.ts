import { addIconSelectors } from "@iconify/tailwind";
import socialIcons from "./social.json";

export default addIconSelectors([
  {
    prefix: "social",
    source: socialIcons,
  },
  "mingcute", // Check out: https://icon-sets.iconify.design/mingcute/
]);
