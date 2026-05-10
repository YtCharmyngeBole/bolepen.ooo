/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type MediaLink = {
  name: string;
  iconifyClass: string;
  href: string;
};

type Config = {
  site: {
    baseUrl: string;
    metadata: {
      author: string;
      shortTitle: string;
      title: string;
      fullTitle: string;
      shortDescription: string;
      description: string;
      startYear: number;
    };
    theme: {
      color: string;
      backgroundColor: string;
      expressiveCodePrintTheme: string;
      mainFont: {
        path: string;
        linkType: string;
      };
    };
    ogImage: {
      src: string;
      alt: string;
    };
    mediaLinks: MediaLink[];
  };
};

declare module "~/config.toml" {
  const value: Config;
  export default value;
}
