import { defineConfig } from '@rslib/core'
import path from 'node:path'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
    },
    {
      format: 'umd',
      umdName: 'RslibUmdExample',
      output: {
        distPath: {
          root: './dist/umd',
        },
      },
    },
  ],
  output: {
    sourceMap: true,
  },
})
