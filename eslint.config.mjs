import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: globals.node },
    overrides: [
      {
        files: ["tests/**/*"],
        env: {
          jest: true,
        },
      },
    ],
  },
  pluginJs.configs.recommended,
];
