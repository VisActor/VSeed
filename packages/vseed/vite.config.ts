import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: '.',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'tests/**/*.test.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
        'dist/**',
        'node_modules/**',
        '**/*.d.ts',
        '**/*.config.*',
        'scripts/**'
      ],
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: './coverage',
    },
    typecheck: {
      enabled: true,
    },
    globals: true,
    environment: 'jsdom',
    alias: {
      'src': new URL('./src', import.meta.url).pathname,
      '@visactor/vseed': new URL('./src', import.meta.url).pathname,
    },
  },
})
