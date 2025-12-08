import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    // node
    {
      format: 'esm',
      source: {
        entry: {
          node: './src/node.ts',
        },
      },
      output: {
        distPath: './dist/node/esm',
      },
      dts: true,
      bundle: true,
    },
    {
      format: 'cjs',
      source: {
        entry: {
          node: './src/node.ts',
        },
      },
      output: {
        distPath: './dist/node/cjs',
      },
      dts: true,
      bundle: true,
    },
    // browser
    {
      format: 'esm',
      umdName: 'VQuery',
      source: {
        entry: {
          browser: './src/browser.ts',
        },
      },
      output: {
        target: 'web',
        distPath: './dist/browser/esm',
      },
      dts: true,
      bundle: true,
    },
  ],
})
