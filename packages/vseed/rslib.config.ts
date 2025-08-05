import { defineConfig } from '@rslib/core'
import path from 'node:path'

console.log('debug', path.resolve(__dirname, './src'))

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
  ],
  output: {
    sourceMap: true,
  },
})
