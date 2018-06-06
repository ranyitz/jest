import chalk from 'chalk';
import fs from 'fs';
import {defaults} from 'jest-config';
import path from 'path';
import prompts from 'prompts';

import {SOFT_CLEAR} from '../constants';

const generateConfigFile = overrides => {
  let result =
    '// For a detailed explanation regarding each configuration property, please visit:\n' +
    '// https://facebook.github.io/jest/docs/en/configuration.html\n\n' +
    'module.exports = {\n';

  const overrideKeys = Object.keys(overrides);

  const printOption = (option, map) =>
    option + ': ' + JSON.stringify(map[option], null, 2);

  for (const option in defaults) {
    if (overrideKeys.includes(option)) {
      result += '  ' + printOption(option, overrides) + ',\n';
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

const questions = [
  {
    choices: [
      {title: 'jsdom (browser-like)', value: 'jsdom'},
      {title: 'node', value: 'node'},
    ],
    initial: 0,
    message: 'Choose the test environment that will be used for testing',
    name: 'environment',
    type: 'select',
  },
  {
    initial: false,
    message: 'Is this a Typescript project?',
    name: 'typescript',
    type: 'confirm',
  },
  {
    initial: false,
    message: 'Do you want jest to add coverage reports?',
    name: 'coverage',
    type: 'confirm',
  },
  {
    initial: false,
    message: 'Automatically clear mock calls and instances between every test?',
    name: 'clearMocks',
    type: 'confirm',
  },
];

module.exports = async () => {
  // Do not clear console on tests
  process.env.NODE_ENV !== 'test' && process.stdout.write(SOFT_CLEAR);

  console.log(
    `We will ask you a few questions that will help us 
create a suitable configuration for your project\n`,
  );

  const {typescript, coverage, clearMocks, environment} = await prompts(
    questions,
  );

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

  const generatedConfig = generateConfigFile(overrides);
  const jestConfigPath = path.join(process.cwd(), 'jest.config.js');

  console.log('');
  console.log(`configuration file emitted: ${chalk.cyan(jestConfigPath)}`);

  fs.writeFileSync(jestConfigPath, generatedConfig);
};
