import { defineConfig } from '@rstest/core'

export default defineConfig({
  setupFiles: ['./rstest.setup.ts'],
  globals: true,
  testEnvironment: 'jsdom',
})
