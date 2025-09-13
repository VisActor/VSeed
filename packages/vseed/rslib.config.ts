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
      output: {
        sourceMap: true,
        distPath: {
          root: './dist/esm',
        },
      },
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
      output: {
        sourceMap: true,
        minify: true,
        distPath: {
          root: './dist/cjs',
        },
      },
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
        sourceMap: true,
        target: 'web',
        distPath: {
          root: './dist/umd',
        },
      },
    },
  ],
})
