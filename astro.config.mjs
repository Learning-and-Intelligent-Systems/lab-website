// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// PR previews are served from a sub-path on GitHub Pages, so CI passes BASE_PATH.
// Production (lis.csail.mit.edu) is served from the root.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://lis.csail.mit.edu',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  // GitHub Pages (used for PR previews) runs Jekyll, which hides folders starting with "_".
  build: { assets: 'assets' },
  // Fonts are downloaded at build time and served from this site, with size-matched fallbacks,
  // so text does not jump when the web font arrives.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Jost',
      cssVariable: '--font-jost',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Open Sans',
      cssVariable: '--font-open-sans',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      fallbacks: ['sans-serif'],
    },
  ],
});
