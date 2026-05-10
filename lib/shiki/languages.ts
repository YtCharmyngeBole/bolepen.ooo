import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { glob } from "glob";

// List all textmate language files in the current directory
const basePath = fileURLToPath(new URL(".", import.meta.url));
const langFiles = glob.sync(path.join(basePath, "*.tmLanguage.json"));

// Load JSON files and export
export const langs = langFiles.map((path) =>
  JSON.parse(fs.readFileSync(path, "utf-8")),
);
