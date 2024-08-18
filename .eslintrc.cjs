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
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      project: './tsconfig.json',
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
