// module.exports = {
//     root: true,
//     env: {
//       es6: true,
//       node: true,
//       browser: true,
//     },
//     parser: "@typescript-eslint/parser",
//     parserOptions: {
//       ecmaFeatures: { jsx: true },
//       jsx: true,
//       useJSXTextNode: true,
//     },
//     extends: [
//       "eslint:recommended",
//       "plugin:@typescript-eslint/recommended",
//       "plugin:react/recommended",
//       "eslint-config-prettier",
//     ],
//     plugins: ["@typescript-eslint", "import", "prettier", "react", "react-hooks"],
//     ignorePatterns: ["node_modules/", "dist/"],
//     settings: {
//       "import/parsers": {
//         "@typescript-eslint/parser": [".ts", ".tsx"],
//       },
//       "import/resolver": {
//         typescript: "./tsconfig.json",
//       },
//     },
//     rules: {
//       "@typescript-eslint/no-non-null-assertion": "off",
//       "react/react-in-jsx-scope": "off",
//       "@typescript-eslint/naming-convention": [
//         "error",
//         {
//           selector: "enum",
//           format: ["UPPER_CASE"],
//           leadingUnderscore: "allow",
//           trailingUnderscore: "allow",
//         },
//         {
//           selector: ["variable"],
//           modifiers: ["const"],
//           format: ["camelCase", "PascalCase", "UPPER_CASE"],
//         },
//         {
//           selector: ["typeParameter"],
//           format: ["PascalCase"],
//         },
//         {
//           selector: ["interface"],
//           format: ["PascalCase"],
//         },
//         {
//           selector: ["function"],
//           format: ["camelCase"],
//           leadingUnderscore: "allow",
//         },
//       ],
//     },
//   };
