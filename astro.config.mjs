// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
     resolve: {
        alias: {
          '@components': '/src/components',
          '@layouts': '/src/layouts',
          '@styles': '/src/styles',
          '@assets': '/src/assets'
        }
      },
  },

  integrations: [react()],
  adapter: vercel(),
});