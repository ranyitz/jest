import {defaults} from 'jest-config';

const generateConfigFile = results => {
  const {typescript, coverage, clearMocks, environment} = results;

  const overrides = Object.assign(
    typescript && {
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
    },
    coverage && {
      coverageDirectory: 'coverage',
    },
    environment === 'node' && {
      testEnvironment: 'node',
    },
    clearMocks && {
      clearMocks: true,
    },
  );
  let result =
    '// For a detailed explanation regarding each configuration property, please visit:\n' +
    '// https://facebook.github.io/jest/docs/en/configuration.html\n\n' +
    'module.exports = {\n';

  const overrideKeys = Object.keys(overrides);

  const printOption = (option, map) =>
    option + ': ' + JSON.stringify(map[option], null, 2);

  for (const option in defaults) {
    if (overrideKeys.includes(option)) {
      result +=
        printOption(option, overrides)
          .split('\n')
          .map(line => '  ' + line)
          .join('\n') + ',\n';
    } else {
      result +=
        printOption(option, defaults)
          .split('\n')
          .map(line => '  // ' + line)
          .join('\n') + ',\n';
    }
  }

  return result + '};\n';
};

export default generateConfigFile;
