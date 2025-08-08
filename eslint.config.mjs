import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react'; //
import importPlugin from 'eslint-plugin-import'; //
import a11y from 'eslint-plugin-jsx-a11y';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import tanstack from '@tanstack/eslint-plugin-query';
// import storybook from "eslint-plugin-storybook";
import eslintConfigPrettier from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';

const tailwindEntryPoint = path.join(process.cwd(), 'src/app/globals.css');

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  // ✅ ignorePatterns -> ignores
  {
    ignores: ['build', 'dist', 'public', 'eslint.config.mjs'],
  },

  // ✅ 기본 recommended 세트
  js.configs.recommended,
  react.configs.flat.recommended,
  ...tseslint.configs.recommended,
  // ...storybook.configs["flat/recommended"],
  ...tanstack.configs['flat/recommended'],

  // ✅ airbnb, next/core-web-vitals 대응
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),

  // ✅ 플러그인 + rules 직접 정의
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      react,
      '@typescript-eslint': tseslint.plugin,
      'jsx-a11y': a11y, // rules에 존재하는 규칙을 위해 적용
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'better-tailwindcss': {
        entryPoint: tailwindEntryPoint,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js에서는 import React from 'react' 안 해도 JSX 사용 가능 → 불필요하니까 끔
      'react/jsx-props-no-spreading': 'off', // props {...rest} 처럼 spread 허용 (재사용 컴포넌트에서 자주 쓰임)
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.ts', '.tsx', '.jsx', '.js'] },
      ], // JSX 문법이 들어있는 파일 확장자 지정. 보통 .tsx, .jsx만 써도 되지만 .ts까지도 허용하는 경우 있음 (컴포넌트 아님에도 JSX 쓰는 경우 대비)
      'react/require-default-props': 'off', // 기본 props 강제하지 않음. 함수형 컴포넌트 + TypeScript에서는 크게 필요 없음
      'no-plusplus': 'off', // ++, -- 연산자 허용. for 루프 등에서 자연스럽게 사용됨
      'react/function-component-definition': 'off', // 함수형 컴포넌트 정의 방식(arrow function 등) 제한 끔
      camelcase: 'off', // camelCase 강제 끔 (보통 snake_case API 응답 필드 등 허용하기 위함)
      '@typescript-eslint/no-explicit-any': 'off', // any 사용 허용. 초기 개발이나 복잡한 타입 우회용으로 임시 허용할 때 사용
      'arrow-body-style': 'off', // 화살표 함수에서 중괄호+return 강제 안함. 짧은 표현식에서 편리하게 쓰도록
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
        },
      ], // import 시 .ts, .tsx 확장자 붙이지 않도록 강제. node_modules(import 패키지)는 무시
      'import/prefer-default-export': 'off', // 단일 export일 때 default 쓰라고 강요하는 규칙 → 요즘 트렌드는 default 안 쓰는 쪽이라 꺼둠
      'import/no-cycle': 'off', // 순환 참조 허용. 단방향 의존이 이상적이지만 현실적으로 막기 어려울 때가 많음
      'no-console': ['error', { allow: ['warn', 'error'] }], // console.log 금지하고 console.warn, console.error만 허용 (디버깅 로그 줄이기)
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // package.json에 없는 의존성 import 시 에러. devDependencies는 허용
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'htmlFor' }],
      ...eslintPluginBetterTailwindcss.configs['recommended'].rules,
      'better-tailwindcss/no-unregistered-classes': 'off',
      'better-tailwindcss/no-custom-classname': 'off',
    },
  },
  eslintConfigPrettier,
];
