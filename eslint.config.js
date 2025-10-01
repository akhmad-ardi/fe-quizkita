import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import tailwind from "@poupe/eslint-plugin-tailwindcss";
import globals from "globals"; // ✅ ambil globals environment

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      "dist",
      "**/*.css",
      "eslint.config.js",
      "prettier.config.js",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}", "**/*.css"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        // project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node
        // window: "readonly",
        // document: "readonly",
        // KeyboardEvent: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "@poupe/tailwindcss": tailwind,
    },
    rules: {
      "semi": ["error"],

      // General
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import order
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "@/components/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],

      // ✅ Tailwind v4 rules (pakai prefix @poupe/tailwindcss)
      "@poupe/tailwindcss/valid-theme-function": "error",
      "@poupe/tailwindcss/valid-modifier-syntax": "error",
      "@poupe/tailwindcss/valid-apply-directive": "error",
      "@poupe/tailwindcss/no-conflicting-utilities": "error",
      "@poupe/tailwindcss/no-arbitrary-value-overuse": "warn",
      "@poupe/tailwindcss/prefer-theme-tokens": "warn",

      // Accessibility
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        typescript: true,
      },
    },
  },
];
