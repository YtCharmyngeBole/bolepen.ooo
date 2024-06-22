import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "#root/tailwind.config.ts";

const resolvedConfig = resolveConfig(tailwindConfig);
export default resolvedConfig;
