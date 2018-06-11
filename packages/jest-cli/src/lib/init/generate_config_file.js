/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {defaults, options} from 'jest-config';

const generateConfigFile = (results: {[string]: boolean}): string => {
  const {typescript, coverage, clearMocks, environment} = results;

  const overrides: Object = {};

  if (typescript) {
    Object.assign(overrides, {
      globals: {
        'ts-jest': {
          tsConfigFile: 'tsconfig.json',
        },
      },
      moduleFileExtensions: ['ts', 'tsx', 'js'],
      testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
    });
  }

  if (coverage) {
    Object.assign(overrides, {
      coverageDirectory: 'coverage',
    });
  }

  if (environment === 'node') {
    Object.assign(overrides, {
      testEnvironment: 'node',
    });
  }

  if (clearMocks) {
    Object.assign(overrides, {
      clearMocks: true,
    });
  }

  const overrideKeys: Array<string> = Object.keys(overrides);

  const stringifyOption = (
    option: string,
    map: Object,
    linePrefix: string = '',
  ): string => {
    const optionDescription = `  // ${options[option]}`;
    const stringifiedObject = `${option}: ${JSON.stringify(
      map[option],
      null,
      2,
    )}`;

    return (
      optionDescription +
      '\n' +
      stringifiedObject
        .split('\n')
        .map(line => '  ' + linePrefix + line)
        .join('\n') +
      ',\n'
    );
  };

  const properties: Array<string> = [];

  for (const option in options) {
    if (overrideKeys.includes(option)) {
      properties.push(stringifyOption(option, overrides));
    } else {
      properties.push(stringifyOption(option, defaults, '// '));
    }
  }

  return (
    '// For a detailed explanation regarding each configuration property, visit:\n' +
    '// https://facebook.github.io/jest/docs/en/configuration.html\n\n' +
    'module.exports = {\n' +
    properties.join('\n') +
    '};\n'
  );
};

export default generateConfigFile;
