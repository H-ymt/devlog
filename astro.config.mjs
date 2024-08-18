import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import rlc from 'remark-link-card'

import expressiveCode, { astroExpressiveCode } from 'astro-expressive-code'

export default defineConfig({
  site: 'https://devlog-xk2.pages.dev/',
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
    react(),
    astroExpressiveCode({
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
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "src/styles/variables.scss" as *;',
        },
      },
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
})
