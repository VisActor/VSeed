import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://vbi_be:3030',
        changeOrigin: true,
        secure: false,
      },
      '/collaboration': {
        target: 'http://vbi_be:1234',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  tools: {
    rspack: {
      resolve: {
        conditionNames: ['source', '...'],
      },
    },
  },
});
