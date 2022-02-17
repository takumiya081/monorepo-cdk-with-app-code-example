const {pathsToModuleNameMapper} = require('ts-jest/utils');

/**
 * create options
 *
 * @param {import('@jest/types').Config.InitialOptions} options
 * @param {any} compilerOptions
 * @example
 * const {compilerOptions} = require('./tsconfig');
 *
 * withBaseConfig({}, compilerOptions);
 */
function withBaseConfig(options, compilerOptions) {
  return {
    ...options,
    roots: options.roots || ['<rootDir>/src'],
    testEnvironment: 'node',
    testMatch: [
      '**/__tests__/**/*.+(ts|js)',
      '**/?(*.)+(spec|test).+(ts|js)',
      ...(options.testMatch || []),
    ],
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
      ...(options.watchPlugins || []),
    ],
    transform: {
      '^.+\\.(t|j)s$': ['@swc/jest'],
      ...(options.transform || {}),
    },
    moduleNameMapper: {
      ...pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
      ...(options.moduleNameMapper || {}),
    },
  };
}

module.exports = withBaseConfig;
