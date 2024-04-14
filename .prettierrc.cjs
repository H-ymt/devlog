module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
  printWidth: 85,
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  singleAttributePerLine: true,
}
