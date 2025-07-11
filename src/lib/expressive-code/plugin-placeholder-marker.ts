import {
  type AnnotationRenderOptions,
  definePlugin,
  ExpressiveCodeAnnotation,
  ExpressiveCodeBlock,
  type ExpressiveCodeInlineRange,
} from "@expressive-code/core";
import { h, type Parents } from "@expressive-code/core/hast";

/**
 * A single appearance of a prop which is either a string or a regular expression.
 * - A string prop represents a fixed text match.
 * - A regular expression prop enables more complex, pattern-based matching.
 */
export type MarkerDefinition = string | RegExp;

/**
 * Props for the Placeholder Markers plugin,
 * extending the Expressive Code Block props.
 */
export interface PluginPlaceholderMarkersProps {
  placeholder: MarkerDefinition | MarkerDefinition[];
}

declare module "@expressive-code/core" {
  export interface ExpressiveCodeBlockProps
    extends PluginPlaceholderMarkersProps {}
}

/**
 * An Expressive Code plugin that provides markers similar to the native Text Marker plugin.
 * Specifically, it marks an inline text as a placeholder, typically styled in italics.
 *
 * For example,
 * ````markdown
 * Create a new directory of your choice and move file there.
 * ```bash placeholder="my-directory"
 * $ mkdir my-directory
 * $ mv file.txt my-directory/
 * ```
 * ````
 */
export function pluginPlaceholderMarker() {
  return definePlugin({
    name: "Placeholder Marker",
    hooks: {
      preprocessMetadata: ({ codeBlock }) => {
        codeBlock.metaOptions.list("placeholder").forEach((option) => {
          const { kind, value } = option;
          if (kind !== "string" && kind !== "regexp") {
            return; // Skip if not a string or regexp
          }

          // Ensures that the `context.codeBlock.props.placeholder` is always an array
          // and appends the new value to it.
          const definitions = toDefinitionsArray(codeBlock.props.placeholder);
          definitions.push(value);
          codeBlock.props.placeholder = definitions;
        });
      },
      annotateCode: ({ codeBlock }) => {
        codeBlock.getLines().forEach((line, i) => {
          const markerRanges = getInlineSearchTermMatches(line.text, codeBlock);
          const mergedRanges = mergeInlineMarkerRanges(markerRanges);
          mergedRanges.forEach((range) => {
            line.addAnnotation(
              new PlaceholderMarkerAnnotation({ inlineRange: range }),
            );
          });
        });
      },
    },
  });
}

/* _____         _        _                      _        _   _
 * |_   _|____  _| |_     / \   _ __  _ __   ___ | |_ __ _| |_(_) ___  _ __
 *   | |/ _ \ \/ / __|   / _ \ | '_ \| '_ \ / _ \| __/ _` | __| |/ _ \| '_ \
 *   | |  __/>  <| |_   / ___ \| | | | | | | (_) | || (_| | |_| | (_) | | | |
 *   |_|\___/_/\_\\__| /_/   \_\_| |_|_| |_|\___/ \__\__,_|\__|_|\___/|_| |_|
 *
 */

class PlaceholderMarkerAnnotation extends ExpressiveCodeAnnotation {
  render({ nodesToTransform }: AnnotationRenderOptions): Parents[] {
    return nodesToTransform.map((node) => h("span.placeholder", node));
  }
}

/*  ___       _ _              __  __            _
 * |_ _|_ __ | (_)_ __   ___  |  \/  | __ _ _ __| | _____ _ __ ___
 *  | || '_ \| | | '_ \ / _ \ | |\/| |/ _` | '__| |/ / _ \ '__/ __|
 *  | || | | | | | | | |  __/ | |  | | (_| | |  |   <  __/ |  \__ \
 * |___|_| |_|_|_|_| |_|\___| |_|  |_|\__,_|_|  |_|\_\___|_|  |___/
 *
 */

/**
 * Goes through all search terms in the given block data and returns an array of
 * inline marker ranges that match the given line text.
 *
 * @param lineText - The text content of the current line being processed
 * @param codeBlock - The code block containing marker definitions in its props
 * @returns Array of marker ranges indicating which portions of texts to highlight
 */
export function getInlineSearchTermMatches(
  lineText: string,
  codeBlock: ExpressiveCodeBlock,
): ExpressiveCodeInlineRange[] {
  const markerRanges: ExpressiveCodeInlineRange[] = [];

  // Process each marker definition (both strings and regexes)
  toDefinitionsArray(codeBlock.props.placeholder).forEach((definition) => {
    // Handle plaintext string definitions (exact matches)
    if (typeof definition === "string") {
      let idx = lineText.indexOf(definition, 0);
      while (idx > -1) {
        markerRanges.push({
          columnStart: idx,
          columnEnd: idx + definition.length,
        });
        idx = lineText.indexOf(definition, idx + definition.length);
      }
    }

    // Handle regular expression definitions (pattern matches)
    // Note: We preserve the original behavior of the Text Marker plugin
    // by capturing the full match if no participating capture groups are found.
    if (definition instanceof RegExp) {
      const modifiedDefinition = addFlagToRegExp(definition, "d");
      const matches = lineText.matchAll(modifiedDefinition);
      for (const match of matches) {
        let validRanges = getParticipatingRanges(match);

        // Preserve the original fallback behavior of the Text Marker plugin
        if (validRanges.length === 0 && match[0].length > 0) {
          validRanges = [
            {
              columnStart: match.index,
              columnEnd: match.index + match[0].length,
            },
          ];
        }

        // If there is at least one participating capture group
        // (excluding the full match at index 0),
        // then we will only highlight those groups.
        if (validRanges.length > 1) {
          validRanges.shift();
        }

        // Append all ranges to the final result
        markerRanges.push(...validRanges);
      }
    }
  });

  return markerRanges;
}

/**
 * Merges overlapping or adjacent inline marker ranges
 * into a consolidated list of non-overlapping ranges.
 *
 * @param inputRanges - An array of inline marker ranges to be merged,
 *    where each range is defined with a start and end property.
 * @return A new array of merged inline marker ranges sorted by the starting point.
 */
export function mergeInlineMarkerRanges(
  inputRanges: ExpressiveCodeInlineRange[],
): ExpressiveCodeInlineRange[] {
  // Trivial case: return a copy of the input ranges when there is at most one range
  if (inputRanges.length <= 1) {
    return inputRanges.slice();
  }

  // Sort the ranges by their starting point
  const [firstRange, ...restRanges] = inputRanges
    .slice()
    .sort((a, b) => a.columnStart - b.columnStart);

  // Consider each range and see if it overlaps with the last merged range
  const mergedRanges = [firstRange];
  restRanges.forEach((range) => {
    const lastMerged = mergedRanges[mergedRanges.length - 1];
    if (range.columnStart <= lastMerged.columnEnd) {
      lastMerged.columnEnd = Math.max(lastMerged.columnEnd, range.columnEnd);
    } else {
      // Otherwise, add the current range as a new merged range
      mergedRanges.push(range);
    }
  });

  return mergedRanges;
}

/*  _   _ _   _ _   _____                 _   _
 * | | | | |_(_) | |  ___|   _ _ __   ___| |_(_) ___  _ __  ___
 * | | | | __| | | | |_ | | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 * | |_| | |_| | | |  _|| |_| | | | | (__| |_| | (_) | | | \__ \
 *  \___/ \__|_|_| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
 *
 */

type RegExpFlag = "d" | "g" | "i" | "m" | "s" | "u" | "v" | "y";

/**
 * Adds a specified flag to an existing regular expression without duplicating existing flags.
 * If the flag is already present, the original regular expression is returned unchanged.
 *
 * @param regexp - The regular expression to which the flag should be added.
 * @param flag - The flag to add to the regular expression.
 * @return A new regular expression with the specified flag added,
 *     or the original regular expression if the flag was already present.
 */
function addFlagToRegExp(regexp: RegExp, flag: RegExpFlag): RegExp {
  if (regexp.flags.includes(flag)) {
    return regexp; // no changes needed
  } else {
    return new RegExp(regexp.source, `${regexp.flags}${flag}`);
  }
}

/**
 * Extracts and returns an array of ranges representing the start and end indices
 * of each participating capturing group in a regular expression match.
 *
 * @param match - The result of a regular expression match operation,
 *    containing the indices property for the match.
 * @return An array of Range objects where each range contains the start
 *    and end positions of a participating capturing group.
 * @throws Error - This indicates the bug in the library: expected regexp match to have indices.
 */
function getParticipatingRanges(
  match: RegExpMatchArray,
): ExpressiveCodeInlineRange[] {
  if (!match.indices) {
    throw new Error("Unreachable: expected regexp match to have indices");
  }
  return match.indices.filter(Boolean).map((range) => ({
    columnStart: range[0],
    columnEnd: range[1],
  }));
}

/**
 * Ensures that the input value is always an array of InlineMarkerDefinition objects.
 * If the input is undefined, an empty array is returned.
 * If the input is a single InlineMarkerDefinition, it is wrapped in an array.
 *
 * @param value - The input value that can be an InlineMarkerDefinition,
 *    an array of InlineMarkerDefinition, or undefined.
 * @return An array of InlineMarkerDefinition object,
 *    or an empty array if the input is undefined.
 */
function toDefinitionsArray(
  value: MarkerDefinition | MarkerDefinition[] | undefined,
): MarkerDefinition[] {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
