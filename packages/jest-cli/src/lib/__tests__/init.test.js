/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/* eslint-disable no-eval */
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import init from '../init';
import getCacheDirectory from '../../../../jest-config/build/get_cache_directory';

jest.mock('prompts');
jest.mock('../../../../jest-config/build/get_cache_directory');

// mocked to get the same snapshot on every machine
getCacheDirectory.mockReturnValue('/tmp/jest');

const resolveFromFixture = relativePath =>
  path.resolve(__dirname, 'fixtures', relativePath);

const writeFileSync = fs.writeFileSync;

describe('init', () => {
  beforeEach(() => {
    fs.writeFileSync = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    fs.writeFileSync = writeFileSync;
  });

  describe('project with package.json and no jest config', () => {
    describe('all questions answered with answer: "No"', () => {
      it('should return the default configuration (an empty config)', async () => {
        prompts.mockReturnValueOnce({});

        await init(resolveFromFixture('only_package_json'));

        const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];

        expect(writtenJestConfig).toMatchSnapshot();

        const evaluatedConfig = eval(writtenJestConfig);

        expect(evaluatedConfig).toEqual({});
      });
    });

    describe('some questions answered with answer: "Yes"', () => {
      it('should return configuration for {clearMocks: true}', async () => {
        prompts.mockReturnValueOnce({clearMocks: true});

        await init(resolveFromFixture('only_package_json'));

        const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];
        const evaluatedConfig = eval(writtenJestConfig);

        expect(evaluatedConfig).toEqual({clearMocks: true});
      });

      it('should return configuration for {coverage: true}', async () => {
        prompts.mockReturnValueOnce({coverage: true});

        await init(resolveFromFixture('only_package_json'));

        const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];
        const evaluatedConfig = eval(writtenJestConfig);

        expect(evaluatedConfig).toEqual({coverageDirectory: 'coverage'});
      });

      it('should return configuration for {environment: "jsdom"}', async () => {
        prompts.mockReturnValueOnce({environment: 'jsdom'});

        await init(resolveFromFixture('only_package_json'));

        const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];
        const evaluatedConfig = eval(writtenJestConfig);
        // should modify when the default environment will be changed to "node"
        expect(evaluatedConfig).toEqual({});
      });

      it('should return configuration for {environment: "node"}', async () => {
        prompts.mockReturnValueOnce({environment: 'node'});

        await init(resolveFromFixture('only_package_json'));

        const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];
        const evaluatedConfig = eval(writtenJestConfig);
        // should modify when the default environment will be changed to "node"
        expect(evaluatedConfig).toEqual({testEnvironment: 'node'});
      });

      it('should return packageJson for {scripts: true}', async () => {
        prompts.mockReturnValueOnce({scripts: true});

        await init(resolveFromFixture('only_package_json'));

        const writtenPackageJson = fs.writeFileSync.mock.calls[0][1];

        expect(writtenPackageJson).toMatchSnapshot();
        expect(JSON.parse(writtenPackageJson).scripts.test).toEqual('jest');
      });
    });
  });

  describe('no package json', () => {
    it('should throw an error if there is no package.json file', async () => {
      expect.assertions(1);

      try {
        await init(resolveFromFixture('no_package_json'));
      } catch (error) {
        expect(error.message).toMatch(
          'Could not find a "package.json" file in',
        );
      }
    });
  });

  describe('malformed package json', () => {
    it('should throw an error if there is malformed package.json file', async () => {
      expect.assertions(1);

      try {
        await init(resolveFromFixture('malformed_package_json'));
      } catch (error) {
        expect(error.message).toMatch('There is malformed json in');
      }
    });
  });

  describe('has-jest-config-file', () => {
    describe('ask the user whether to override config or not', () => {
      it('user answered with "Yes"', async () => {
        prompts.mockReturnValueOnce({continue: true}).mockReturnValueOnce({});

        await init(resolveFromFixture('has_jest_config_file'));

        expect(prompts.mock.calls[0][0]).toMatchSnapshot();

        const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];

        expect(writtenJestConfig).toBeDefined();
      });

      it('user answered with "No"', async () => {
        prompts.mockReturnValueOnce({continue: false});

        await init(resolveFromFixture('has_jest_config_file'));
        // return after first prompt
        expect(prompts).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('has jest config in package.json', () => {
    it('should ask the user whether to override config or not', async () => {
      prompts.mockReturnValueOnce({continue: true}).mockReturnValueOnce({});

      await init(resolveFromFixture('has_jest_config_in_package_json'));

      expect(prompts.mock.calls[0][0]).toMatchSnapshot();

      const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];

      expect(writtenJestConfig).toBeDefined();
    });
  });

  describe('typescript project', () => {
    it('should ask "typescript question" when has typescript in dependencies', async () => {
      prompts.mockReturnValueOnce({});

      await init(resolveFromFixture('typescript_in_dependencies'));

      const typescriptQuestion = prompts.mock.calls[0][0][0];

      expect(typescriptQuestion).toMatchSnapshot();
    });

    it('should ask "typescript question" when has typescript in devDependencies', async () => {
      prompts.mockReturnValueOnce({});

      await init(resolveFromFixture('typescript_in_dev_dependencies'));

      const typescriptQuestion = prompts.mock.calls[0][0][0];

      expect(typescriptQuestion).toMatchSnapshot();
    });

    it('should return configuration for {typescript: true}', async () => {
      prompts.mockReturnValueOnce({typescript: true});

      await init(resolveFromFixture('typescript_in_dev_dependencies'));

      const writtenJestConfig = fs.writeFileSync.mock.calls[0][1];
      const evaluatedConfig = eval(writtenJestConfig);

      expect(evaluatedConfig).toMatchSnapshot();
    });
  });
});
