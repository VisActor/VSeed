import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { languageOptions: { globals: globals.browser } },
  ...defineConfig(js.configs.recommended, tseslint.configs.recommended),
  { ignores: ['dist/', 'coverage/'], parserOptions: { tsconfigRootDir: import.meta.dirname } },
]
