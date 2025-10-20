import { defineConfig } from '@rstest/core'

export default defineConfig({
  setupFiles: ['./rstest.setup.ts'],
  globals: true,
  testEnvironment: 'jsdom',
  coverage: {
    provider: 'istanbul',
    reporters: ['text', 'json', 'html', 'json-summary'],
    reportsDirectory: './coverage',
    clean: false,
  },
  output: {
    externals: ['@visactor/vchart', '@visactor/vtable'],
  },
})
