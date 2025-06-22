import path from "node:path";
import { fileURLToPath } from "node:url";

import { glob } from "glob";

export function dirnameFromImportMetaURL(importMetaURL: string) {
  return fileURLToPath(new URL(".", importMetaURL));
}

export class PathBuilder {
  constructor(private readonly base: string) {}

  static fromImportMetaURL(importMetaURL: string) {
    return new PathBuilder(dirnameFromImportMetaURL(importMetaURL));
  }

  join(...paths: string[]): string {
    return path.join(this.base, ...paths);
  }

  glob(pattern: string): string[] {
    return glob.sync(this.join(pattern));
  }
}
