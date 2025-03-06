import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  {
    ignores: ['**/node_modules/**', 'dist/*', 'docs/*', 'coverage/*'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint
    },
  },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: [2, 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true,
      }],

      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'angle-bracket',
        objectLiteralTypeAssertions: 'allow',
      }],

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
    },
  }
];
