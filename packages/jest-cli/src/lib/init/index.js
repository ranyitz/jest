import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import questions from './questions';
import {PACKAGE_JSON, JEST_CONFIG} from '../../constants';
import generateConfigFile from './generate_config_file';
import modifyPackageJson from './modify_package_json';

export default async () => {
  // prerequisite checks
  const projectPackageJsonPath = path.join(process.cwd(), PACKAGE_JSON);
  const jestConfigPath = path.join(process.cwd(), JEST_CONFIG);

  if (!fs.existsSync(projectPackageJsonPath)) {
    console.log();
    console.log('Could not find a valid package.json, aborting'); // TODO: refactor
    return;
  }

  let hasJestProperty = false;
  let hasJestConfig = false;
  let projectPackageJson;

  try {
    projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath));
  } catch (error) {
    console.error(`There is malformed json in ${projectPackageJsonPath}`);
    console.error(`Please fix it and than run "jest --init"`);
    return;
  }

  if (projectPackageJson.jest) {
    hasJestProperty = true;
  }

  if (fs.existsSync(jestConfigPath)) {
    hasJestConfig = true;
  }

  if (hasJestProperty || hasJestConfig) {
    const result = await prompts({
      initial: true,
      message:
        'It seems that you already have a jest configuration, do you want to override it?',
      name: 'continue',
      type: 'confirm',
    });

    if (!result.continue) {
      console.log();
      console.log('Aborting...');
      return;
    }
  }

  // Start the init process
  console.log(
    `The following questions will help us create a suitable configuration for your project\n`,
  );

  let promptAborted = false;

  const results = await prompts(questions, {
    onCancel: () => {
      promptAborted = true;
    },
  });

  if (promptAborted) {
    console.log();
    console.log('Aborting...');
    return;
  }

  const shouldModifyScripts = results.scripts;

  if (shouldModifyScripts || hasJestProperty) {
    const modifiedPackageJson = modifyPackageJson(
      projectPackageJson,
      shouldModifyScripts,
      hasJestProperty,
    );

    fs.writeFileSync(projectPackageJsonPath, modifiedPackageJson);
    console.log('');
    console.log(`${chalk.cyan(projectPackageJsonPath)} updated`);
  }

  const generatedConfig = generateConfigFile(results);
  fs.writeFileSync(jestConfigPath, generatedConfig);

  console.log('');
  console.log(
    `📝  configuration file created at ${chalk.cyan(jestConfigPath)}`,
  );
};
