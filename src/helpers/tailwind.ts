import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.ts";

const resolvedConfig = resolveConfig(tailwindConfig);
export default resolvedConfig;
