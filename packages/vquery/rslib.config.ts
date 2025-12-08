import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      source: {
        entry: {
          browser: './src/browser.ts',
        },
      },
      output: {
        distPath: './dist/esm',
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
        distPath: './dist/cjs',
      },
      dts: true,
      bundle: true,
    },
  ],
})
