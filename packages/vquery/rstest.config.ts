import { defineConfig } from '@rstest/core'

export default defineConfig({
  globals: true,
  testEnvironment: 'node',
  includeSource: ['src/**/*.{js,ts}'],
  coverage: {
    enabled: true,
    exclude: ['**/node_modules/**', '**/dist/**'],
    include: ['src/**/*.{js,jsx,ts,tsx}'],
    reporters: ['html', ['text', { skipFull: true }], ['json', { file: 'coverage-final.json' }]],
  },
  resolve: {
    alias: {
      '@visactor/vquery': ['./src'],
    },
  },
})
