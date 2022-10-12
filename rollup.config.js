import { terser } from "rollup-plugin-terser";
import buildStatistics from "rollup-plugin-build-statistics";
import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: {
    dir: "./dist",
    format: "iife",
  },
  plugins: [
    buildStatistics({
      projectName: packageJson.name,
    }),
    typescript(),
    terser(),
  ],
};
