import js from '@eslint/js'
import globals from 'globals'
import ts from 'typescript-eslint'

export default [
  { ignores: ['dist/', 'scripts', 'doc_build', 'eslint.config.mjs'] },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...ts.configs.recommended,
]
