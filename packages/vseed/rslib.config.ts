import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      bundle: false,
      source: {
        entry: {
          index: ['./src/**', '!src/**/*.DS_Store'],
        },
      },
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
    },
    {
      format: 'umd',
      umdName: 'VSeed',
      performance: {
        chunkSplit: {
          strategy: 'all-in-one',
        },
      },
      output: {
        target: 'web',
        distPath: {
          root: './dist/umd',
        },
      },
    },
  ],
  output: {
    sourceMap: true,
    // enable after release 1.0.0
    // minify: true
  },
})
