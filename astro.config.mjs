import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import rlc from 'remark-link-card'

import expressiveCode, { astroExpressiveCode } from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  site: 'https://devlog-xk2.pages.dev/',
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
    react(),
    astroExpressiveCode({
      // Replace the default themes with a custom set of bundled themes:
      // "dracula" (a dark theme) and "solarized-light"
      themes: ['github-dark'],
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
    remarkPlugins: [rlc],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "src/styles/_variables.scss" as *;',
        },
      },
    },
  },
})
