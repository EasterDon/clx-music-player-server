import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  tseslint.configs.recommended,
  prettierPlugin.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
    braceStyle: '1tbs',
    arrowParens: 'always',
  }),
  {
    files: ['**/*.{js,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: { globals: globals.browser },
  },
  // ts无全局类型报错
  {
    files: ['**/*.{ts,mts}'],
    rules: {
      'no-undef': 'off',
    },
  },
]);
