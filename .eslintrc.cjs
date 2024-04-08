module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["*.astro"],
      extends: [
        "plugin:@typescript-eslint/recommended",
      ],
      parser: "astro-eslint-parser",
      parserOptions: {
        ecmaversion: "latest",
        sourcetype: "module",
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
  ],
};