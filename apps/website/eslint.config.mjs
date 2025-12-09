import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default [
  { ignores: ['dist/', 'scripts', 'doc_build', 'eslint.config.mjs'] },
  { languageOptions: { globals: globals.browser } },
  ...defineConfig(js.configs.recommended, tseslint.configs.recommended),
]
