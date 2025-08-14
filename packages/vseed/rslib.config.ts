import { defineConfig } from '@rslib/core'

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
