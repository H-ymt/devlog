module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:astro/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['*.astro'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        sourcetype: 'module',
        ecmaversion: 'latest',
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  ],
}
