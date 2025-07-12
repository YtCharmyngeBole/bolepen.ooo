/**
 * @fileoverview A rehype plugin that supports rendering GitHub style alerts with customizations
 */
import type * as hast from "hast";
import { whitespace } from "hast-util-whitespace";
import { visit } from "unist-util-visit";
import { is } from "unist-util-is";
import { h, s } from "hastscript";

/** Plugin options for Rehype Custom Alert plugin */
export interface RehypeCustomAlertOptions {
  allowedTypes?: boolean | string[];
  classPrefix?: string;
}

/** Default alert types */
const defaultTypes = ["note", "tip", "important", "warning", "caution"];

/**
 * Pattern that matches GitHub-style alert syntax at the beginning of a paragraph
 * followed by the optional display name of the alert.
 */
const alertRegex = /^\[!([A-Z]+)]([^\n]*)\n?/;

/**
 * A custom rehype plugin for handling GitHub flavored Markdown alerts.
 */
export default function rehypeCustomAlert(
  options: RehypeCustomAlertOptions = {},
) {
  const { allowedTypes = false, classPrefix = "alert" } = options;

  function isAllowedType(type: string): boolean {
    if (allowedTypes === true) {
      return true;
    } else if (Array.isArray(allowedTypes)) {
      return allowedTypes.includes(type);
    } else {
      return defaultTypes.includes(type);
    }
  }

  return function (tree: hast.Root): void {
    visit(
      tree,
      { type: "element", tagName: "blockquote" },
      function (node, index, parent) {
        if (typeof index !== "number" || !parent) return;

        // Within the blockquote, first we skip some early whitespace-only child nodes
        // towards the first non-whitespace child node, then work from there.
        // We call this child node the "head" of the blockquote.
        let headIndex = 0;
        while (
          headIndex < node.children.length &&
          whitespace(node.children[headIndex])
        ) {
          headIndex++;
        }
        const head = node.children[headIndex];

        // For the blockquote to be a valid alert,
        // we expect its head to be a paragraph node
        // whose first child is a text that matches the alert syntax.
        // The alert syntax is a pattern like "[!NOTE]" or "[!TIP]",
        // followed by an optional display name up until the first newline character.
        // Within the brackets, the alert type is expected to be in uppercase
        // preceded by an exclamation mark.
        if (!is(head, { type: "element", tagName: "p" })) return;
        const text = head.children[0];
        if (!is(text, "text")) return;
        const match = text.value.match(alertRegex);
        if (!match || match.index === undefined) return;

        // We extract the alert type as well as the display name from the match,
        // and check if the alert type is allowed based on the plugin options.
        const alertType = match[1].toLowerCase();
        const displayName = match[2].trim() || capitalize(match[1]);
        if (!isAllowedType(alertType)) return;

        // Following the alert syntax pattern, an optional newline character is allowed.
        // Anything after that, if any, will be split into the alert content.
        const endColumn = match.index + match[0].length;
        if (endColumn < text.value.length) {
          text.value = text.value.slice(endColumn);
        } else {
          // Otherwise, we need extra checks to see it the rest of the head node
          // after the alert text contains any valid and non-empty content.
          const next = head.children[1];
          if (next) {
            // If so, it must be a line break <br> element followed by non-empty content.
            if (!is(next, { type: "element", tagName: "br" })) return;
            if (!head.children[2]) return;
            // Everything after the <br> becomes the content of the alert
            head.children = head.children.slice(2);
            // Also drops the '\n' character that typically (in markdown) follows <br>
            const firstChild = head.children[0];
            if (is(firstChild, "text") && firstChild.value.charAt(0) === "\n") {
              firstChild.value = firstChild.value.slice(1);
            }
          } else {
            // Moves along the head index to the next child element in blockquote
            // until finding the next non-whitespace node.
            headIndex++;
            while (
              headIndex < node.children.length &&
              whitespace(node.children[headIndex])
            ) {
              headIndex++;
            }
            // If we reached the end of the blockquote without encountering any non-whitespace nodes,
            // or if the next node is not an HTML element, we stop processing.
            if (
              headIndex === node.children.length ||
              !is(node.children[headIndex], "element")
            ) {
              return;
            }
          }
        }

        // Replace the blockquote with the alert block element.
        parent.children[index] = createAlertElement({
          alertType,
          displayName,
          classPrefix,
          children: node.children.slice(headIndex),
        });
      },
    );
  };
}

function createAlertElement({
  alertType,
  displayName,
  classPrefix,
  children,
}: {
  alertType: string;
  displayName: string;
  classPrefix: string;
  children: hast.ElementContent[];
}): hast.Element {
  return h(`aside.${classPrefix}.${classPrefix}--${alertType}`, [
    h(`h5.${classPrefix}-heading`, [
      h(`span.${classPrefix}-icon.${classPrefix}--${alertType}`),
      h(`span.${classPrefix}-display`, [displayName]),
    ]),
    ...children,
  ]);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
