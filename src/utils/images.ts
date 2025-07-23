import path from "path";
import { fileURLToPath, URL } from "node:url";

import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";

const basePath = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = path.dirname(path.dirname(basePath));
const imagePaths = import.meta.glob(
  [
    "../../**/*.{apng,avif,gif,jfif,jpg,jpeg,pjpeg,pjpg,png,svg,webp}",
    "!../../node_modules/**/*",
    "!../../vendor/**/*",
  ],
  {
    import: "default",
  },
);

export async function loadImageDynamic(
  src: string,
): Promise<GetImageResult | null> {
  const resolvedSrcPath = path.resolve(projectRoot, src);
  for (const p in imagePaths) {
    const resolvedCandidatePath = path.resolve(basePath, p);
    if (resolvedSrcPath === resolvedCandidatePath) {
      const content = await imagePaths[p]();
      // @ts-ignore
      return await getImage({ src: content });
    }
  }
  return null;
}
