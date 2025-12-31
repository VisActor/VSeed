import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default [
  { ignores: ['dist/', 'scripts', 'doc_build', 'eslint.config.mjs'] },
  { languageOptions: { globals: globals.browser, parserOptions: { tsconfigRootDir } } },
  ...defineConfig(js.configs.recommended, tseslint.configs.recommended),
]
