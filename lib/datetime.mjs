// @ts-check
import { format, formatISO } from "date-fns";

/**
 * @template Human, Machine
 * @typedef {import("./types.mjs").HumanMachineReadable<Human, Machine>} HumanMachineReadable
 */

/**
 * Returns the formatted date in both human- and machine-readable format,
 * especially useful in <date> HTML element.
 * @param {Date} date
 * @param {{ humanFormat: string }} options
 * @returns {HumanMachineReadable<string, string>}
 */
export function formatDate(date, options) {
  return {
    human: format(date, options.humanFormat),
    machine: formatISO(date, { representation: "date" }),
  };
}
