/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default ({
  automock: 'All imported modules in your tests should be mocked automatically',
  bail: 'Stop running tests after the first failure',
  browser: 'Respect "browser" field in package.json when resolving modules',
  cacheDirectory:
    'The directory where Jest should store its cached dependency information',
  clearMocks: 'Automatically clear mock calls and instances between every test',
  collectCoverage:
    'Indicates whether the coverage information should be collected while executing the test',
  collectCoverageFrom:
    'An array of glob patterns indicating a set of files for which coverage information should be collected',
  coverageDirectory:
    'The directory where Jest should output its coverage files',
  coveragePathIgnorePatterns:
    'An array of regexp pattern strings that are matched against all file paths before executing the test. If the file path matches any of the patterns, coverage information will be skipped',
  coverageReporters:
    'A list of reporter names that Jest uses when writing coverage reports. Any istanbul reporter can be used',
  coverageThreshold:
    'An object that configures minimum threshold enforcement for coverage results',
  errorOnDeprecated:
    'Make calling deprecated APIs throw helpful error messages',
  forceCoverageMatch:
    'Force coverage collection from ignored files usin a array of glob patterns',
  globalSetup:
    'A path to a custom global setup module which exports an async function that is triggered once before all test suites',
  globalTeardown:
    'A path to a custom global teardown module which exports an async function that is triggered once after all test suites',
  globals:
    'A set of global variables that need to be available in all test environments',
  moduleDirectories:
    "An array of directory names to be searched recursively up from the requiring module's location",
  moduleFileExtensions: 'An array of file extensions your modules use',
  moduleNameMapper:
    'A map from regular expressions to module names that allow to stub out resources, like images or styles with a single module',
  modulePathIgnorePatterns:
    "An array of regexp pattern strings that are matched against all module paths before those paths are to be considered 'visible' to the module loader",
  notify: 'Activates notifications for test results',
  notifyMode:
    'An enum that specifies notification mode. Requires { notify: true }',
  preset: "A preset that is used as a base for Jest's configuration",
  projects: 'Run tests from one or more projects',
  reporters: 'Use this configuration option to add custom reporters to Jest',
  resetMocks: 'Automatically reset mock state between every test',
  resetModules: 'Reset the module registry before running each individual test',
  resolver: 'A path to a custom resolver',
  restoreMocks: 'Automatically restore mock state between every test',
  rootDir:
    'The root directory that Jest should scan for tests and modules within',
  roots:
    'A list of paths to directories that Jest should use to search for files in',
  runner:
    "Allows you to use a custom runner instead of Jest's default test runner",
  setupFiles:
    'The paths to modules that run some code to configure or set up the testing environment before each test',
  setupTestFrameworkScriptFile:
    'The path to a module that runs some code to configure or set up the testing framework before each test',
  snapshotSerializers:
    'A list of paths to snapshot serializer modules Jest should use for snapshot testing',
  testEnvironment: 'The test environment that will be used for testing',
  testEnvironmentOptions: 'Options that will be passed to the testEnvironment',
  testLocationInResults: 'Adds a location field to test results',
  testMatch: 'The glob patterns Jest uses to detect test files',
  testPathIgnorePatterns:
    'An array of regexp pattern strings that are matched against all test paths before executing the test. If the test path matches any of the patterns, it will be skipped',
  testRegex: 'The regexp pattern Jest uses to detect test files',
  testResultsProcessor:
    'This option allows the use of a custom results processor',
  testRunner: 'This option allows use of a custom test runner',
  testURL:
    'This option sets the URL for the jsdom environment. It is reflected in properties such as location.href',
  timers:
    'Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"',
  transform:
    'A map from regular expressions to paths to transformers. A transformer is a module that provides a synchronous function for transforming source files',
  transformIgnorePatterns:
    'An array of regexp pattern strings that are matched against all source file paths before transformation. If the test path matches any of the patterns, it will not be transformed',
  unmockedModulePathPatterns: '',
  verbose:
    'Indicates whether each individual test should be reported during the run',
  watchPathIgnorePatterns:
    'An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode',
  watchman: 'Whether to use watchman for file crawling',
}: {[string]: string});
