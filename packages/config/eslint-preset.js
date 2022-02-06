const appRoot = require('app-root-path');

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

module.exports = () => {
  return {
    overrides: [
      {
        files: ['**/*.js'],
        env: {
          es6: true,
          node: true,
        },
        parserOptions: {
          ecmaVersion: 10,
        },
        extends: ['eslint:recommended'],
      },
      {
        files: ['**/*.ts'],
        parser: '@typescript-eslint/parser',
        env: {
          node: true,
          es6: true,
          'jest/globals': true,
        },
        settings: {
          'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
          },
          'import/docstyle': ['jsdoc', 'tomdoc'],
          'import/resolver': {
            typescript: {
              project: './tsconfig.json',
            },
          },
        },
        parserOptions: {
          sourceType: 'module',
          ecmaVersion: 12,
          project: './tsconfig.json',
        },
        extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
        plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
        rules: {
          'import/extensions': OFF,
          '@typescript-eslint/no-explicit-any': WARN,
          '@typescript-eslint/ban-ts-comment': OFF,
          '@typescript-eslint/ban-ts-ignore': OFF,
          '@typescript-eslint/explicit-function-return-type': OFF,
          '@typescript-eslint/explicit-module-boundary-types': OFF,
          'import/no-extraneous-dependencies': [
            ERROR,
            {
              devDependencies: ['**/*.test.ts'],
              // package.jsonの場所を指定
              packageDir: ['./', appRoot.toString()],
            },
          ],
          '@typescript-eslint/no-unused-vars': [ERROR, {argsIgnorePattern: '^_'}],
          '@typescript-eslint/naming-convention': [
            ERROR,
            {
              selector: 'interface',
              format: ['PascalCase'],
              // Iから始まるのは禁止
              custom: {
                regex: '^I[A-Z]',
                match: false,
              },
            },
            {
              selector: 'typeLike',
              format: ['PascalCase'],
            },
          ],
          'no-plusplus': OFF,
          // no default export
          'import/prefer-default-export': OFF,
          'import/no-default-export': ERROR,
          'import/no-deprecated': ERROR,
          // https://github.com/lydell/eslint-plugin-simple-import-sort#usage
          // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
          'sort-imports': OFF,
          'import/order': OFF,
          'simple-import-sort/imports': ERROR,
          'simple-import-sort/exports': ERROR,
          // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
          'no-use-before-define': OFF,
          '@typescript-eslint/no-use-before-define': ERROR,
        },
      },
      {
        files: ['**/*.test.ts'],
        extends: ['plugin:jest/all'],
        plugins: ['jest'],
        rules: {
          'jest/no-hooks': OFF,
          'jest/unbound-method': OFF,
          // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-hook.md
          // beforeの中に入れろよというものだけど、kent.Cは入れるなとか言ったりしてるし
          // これを制限しなくてはいけないこともわからないので一旦OFFにする
          'jest/require-hook': OFF,
        },
      },
    ],
  };
};
