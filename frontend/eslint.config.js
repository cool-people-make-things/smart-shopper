import js from "@eslint/js";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  jsxA11y.configs.recommended,
  {
    ignores: [
      'eslint.config.js',
      'vite.config.ts',
      'jest.config.js',
      '*.scss',
      '*.css',
    ],
  },
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src"],
        },
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
      import: eslintPluginImport,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "@typescript-eslint": eslintPluginTypeScript,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "prettier/prettier": "warn",
      "max-params": "error",
      "prefer-arrow-callback": "error",
      "prefer-destructuring": "error",
      "no-shadow": "error",
      "react/react-in-jsx-scope": "off",
      "react/state-in-constructor": "off",
      "import/no-default-export": 2,
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "_" },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
]);
