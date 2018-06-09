/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {defaults} from 'jest-config';

const generateConfigFile = (results: {[string]: boolean}) => {
  const {typescript, coverage, clearMocks, environment} = results;

  const overrides = {};

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

  let result =
    '// For a detailed explanation regarding each configuration property, please visit:\n' +
    '// https://facebook.github.io/jest/docs/en/configuration.html\n\n' +
    'module.exports = {\n';

  const overrideKeys = Object.keys(overrides);

  const printOption = (
    option: string,
    map: Object,
    linePrefix: string = '',
  ) => {
    const stringifiedObject =
      option + ': ' + JSON.stringify(map[option], null, 2);

    return (
      stringifiedObject
        .split('\n')
        .map(line => '  ' + linePrefix + line)
        .join('\n') + ',\n'
    );
  };

  for (const option in defaults) {
    if (overrideKeys.includes(option)) {
      result += printOption(option, overrides);
    } else {
      result += printOption(option, defaults, '// ');
    }
  }

  return result + '};\n';
};

export default generateConfigFile;
