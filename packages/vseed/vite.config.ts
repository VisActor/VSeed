import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: '.',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: './coverage',
    },
    globals: true,
    environment: 'jsdom',
    setupFiles:['./vite.setup.ts'],
    alias: {
      src: new URL('./src', import.meta.url).pathname,
      '@visactor/vseed': new URL('./src', import.meta.url).pathname,
    },
  },
})
