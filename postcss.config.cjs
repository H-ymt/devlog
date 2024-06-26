const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')

const config = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
      },
    }),
    autoprefixer({ flexbox: 'no-2009' }),
  ],
}

module.exports = config
