import twemoji, { type TwemojiOptions } from "@twemoji/api";
import type * as hast from "hast";
import { fromHtml } from "hast-util-from-html";
import { visit, SKIP } from "unist-util-visit";

/**
 * A rehype plugin to replace Unicode emojis with Twemoji images.
 */
export default function rehypeTwemoji() {
  const twemojiOptions: TwemojiOptions = {
    base: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/",
    ext: ".svg",
    className: "twemoji",
    folder: "svg",
  };

  return function (tree: hast.Root) {
    // Visits all text nodes in the HAST tree
    visit(tree, "text", (node, index, parent) => {
      // Text node should have a parent and an index
      if (!parent || index === undefined) {
        return;
      }

      // Replaces Unicode emojis in the text node with Twemoji images
      // See <https://github.com/jdecked/twemoji/blob/main/LEGACY.md#string-parsing>
      const newHtmlString = twemoji.parse(node.value, twemojiOptions);

      // If the parsed HTML remains the same as the original text, skip this node
      if (newHtmlString === node.value) {
        return;
      }

      // Convert HTML string to HAST nodes and insert back into the tree
      const newHtmlNode = fromHtml(newHtmlString, { fragment: true });
      parent.children.splice(index, 1, ...newHtmlNode.children);

      // Skips all the remaining nodes we just added
      return [SKIP, index + newHtmlNode.children.length];
    });
  };
}
