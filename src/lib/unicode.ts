export const spaceChars = {
  nbsp: "\u00a0", // non-breaking version of normal whitespace
  ensp: "\u2002", // half of an em space (LaTeX-borrowed alias)
  emsp: "\u2003", // equal to size type in points (LaTeX-borrowed alias)
  emsp13: "\u2004", // a third of an em space (HTML entities-borrowed alias)
  emsp14: "\u2005", // a quarter of an em space (HTML entities-borrowed alias)
  emsp16: "\u2006", // a sixth of an em space (HTML entities-adapted alias)
  numsp: "\u2007", // a space whose width matches that of numbers (HTML entities-borrowed alias)
  puncsp: "\u2008", // a space whose width matches that of a period '.' (HTML entities-borrowed alias)
  thinsp: "\u2009", // a space approximately between M/5 and M/6 (LaTeX-borrowed alias)
  hairsp: "\u200a", // a space with the smallest width (LaTeX-borrowed alias)
  nnbsp: "\u202f", // non-breaking version of thin space
  mmsp: "\u205f", // medium mathematical space, 3/18 of an em
  wj: "\u2060", // following a regular spacing character to turn it into non-breaking version
} as Record<string, string>;
