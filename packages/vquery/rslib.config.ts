import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      output: {
        distPath: './dist/esm',
      },
      syntax: ['node 18'],
      dts: true,
    },
    {
      format: 'cjs',
      output: {
        distPath: './dist/cjs',
      },
      syntax: ['node 18'],
    },
  ],
})
