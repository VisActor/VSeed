import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    ignores: [
      'dist/',
      'coverage/',
      'node_modules/',
      'tsconfig.*',
      'eslint.config.mjs',
      'rslib.config.ts',
      'rstest.config.ts',
      'rstest.setup.ts',
      'vite.config.ts',
      'vite.setup.ts',
    ],
  },
  ...defineConfig(js.configs.recommended, tseslint.configs.recommended),
  {
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
]
