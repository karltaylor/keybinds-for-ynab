import { chromeExtension, simpleReloader } from "rollup-plugin-chrome-extension";
import { terser } from "rollup-plugin-terser";
import buildStatistics from "rollup-plugin-build-statistics";
import copy from "rollup-plugin-copy";
import progress from "rollup-plugin-progress";
import typescript from "@rollup/plugin-typescript";

import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "src/manifest.json",
  output: {
    dir: "./dist",
    format: "esm",
  },
  plugins: [
    chromeExtension(),
    simpleReloader(),
    buildStatistics({
      projectName: packageJson.name,
    }),
    progress({
      clearLine: false,
    }),
    typescript(),
    terser(),
    copy({
      targets: [{ src: "./manifest.json", dest: "dist" }],
    }),
  ],
};
