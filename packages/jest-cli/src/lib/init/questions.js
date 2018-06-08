const questions = [
  {
    initial: true,
    message:
      'Would you like to use jest when running "test" script in `package.json`?',
    name: 'scripts',
    type: 'confirm',
  },
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

export default questions;
