import { format, formatISO } from "date-fns";

import type { HumanMachineReadable } from "./types.ts";

/**
 * Returns the formatted date in both human- and machine-readable format,
 * especially useful in <date> HTML element.
 */
export const formatDate = (
  date: Date,
  options: {
    humanFormat: string;
  },
): HumanMachineReadable<string, string> => {
  const { humanFormat } = options;
  return {
    human: format(date, humanFormat),
    machine: formatISO(date, { representation: "date" }),
  };
};
