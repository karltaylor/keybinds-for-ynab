import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "./dist",
    format: "iife",
  },
  plugins: [typescript(), terser()],
};
