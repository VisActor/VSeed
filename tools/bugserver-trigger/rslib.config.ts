import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      format: 'umd',
      // umdName: 'VSeed',
      performance: {
        chunkSplit: {
          strategy: 'all-in-one',
        },
      },
      output: {
        sourceMap: true,
        target: 'web',
        distPath: {
          root: './dist',
        },
      },
    },
  ],
})
