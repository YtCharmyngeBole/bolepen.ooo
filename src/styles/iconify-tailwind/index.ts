import { addIconSelectors } from "@iconify/tailwind";
import mediaIcons from "./media.json";

export default addIconSelectors([
  {
    prefix: "media",
    source: mediaIcons,
  },
  "mingcute", // Check out: https://icon-sets.iconify.design/mingcute/
  "octicon", // Check out: https://icon-sets.iconify.design/octicon/
]);
