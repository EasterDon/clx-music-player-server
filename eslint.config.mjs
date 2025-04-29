import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import {defineConfig} from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts}'],
    plugins: {js},
    extends: ['js/recommended']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts}'],
    languageOptions: {globals: globals.browser}
  },
  // ts无全局类型报错
  {
    files:['**/*.{ts,mts,vue}'],
    rules:{
      'no-undef':'off'
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,vue}'],
    plugins: {'@stylistic': stylistic},
    rules: {
      '@stylistic/array-bracket-newline': ['error','consistent'],
      '@stylistic/array-bracket-spacing': ['error','never'],
      '@stylistic/array-element-newline': ['error','consistent'],
      '@stylistic/arrow-parens': ['error','always'],
      '@stylistic/arrow-spacing': ['error',{before: false,after: false}],
      '@stylistic/block-spacing': ['error','never'],
      '@stylistic/brace-style': 'error',
      '@stylistic/comma-dangle': ['error','never'],
      '@stylistic/comma-spacing': ['error',{before: false,after: false}],
      '@stylistic/comma-style': ['error','last'],
      '@stylistic/computed-property-spacing': ['error','never'],
      '@stylistic/dot-location': ['error','object'],
      '@stylistic/eol-last': ['error','always'],
      '@stylistic/function-call-argument-newline': ['error','consistent'],
      '@stylistic/function-call-spacing': ['error','never'],
      '@stylistic/function-paren-newline': ['error','consistent'],
      '@stylistic/generator-star-spacing': ['error','before'],
      '@stylistic/implicit-arrow-linebreak': ['error','beside'],
      '@stylistic/indent': ['error',2],
      '@stylistic/indent-binary-ops': ['error',2],
      '@stylistic/jsx-closing-bracket-location': [1,'tag-aligned'],

      '@stylistic/max-len': ['error',{code: 80}],
      '@stylistic/semi': ['error','always'],

      '@stylistic/quotes': ['error','single'],
      '@stylistic/space-in-parens': ['error','never'],
      '@stylistic/no-floating-decimal': 'error',

      '@stylistic/object-curly-spacing': ['error','never'],
      '@stylistic/no-multi-spaces': ['error'],
      '@stylistic/space-infix-ops': ['error']
    }
  }
]);
