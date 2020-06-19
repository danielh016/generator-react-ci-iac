const chalk = require('chalk');
const enums = require('./enums');

const ciTemplateChoices = [
  {
    value: enums.TEST_BUILD_TEMPLATE_DIR,
    name: `Test + Build`
  },
  {
    value: enums.TEST_BUILD_DEPLOY_TEMPLATE_DIR,
    name: `Test + Build + Deploy to S3`
  }
];

const useCircleCiPrompts = [
  {
    type: 'confirm',
    name: 'confirmed',
    message: 'Do you want to setup CircleCI (CI/CD)?',
    default: true
  }
];

const templateToUsePrompts = [
  {
    type: 'list',
    name: 'ciTemplate',
    message: `Which ${chalk.yellow('*type*')} of CI template would you like to use?`,
    choices: ciTemplateChoices,
    default: enums.TEST_BUILD_TEMPLATE_DIR
  }
];

const configInfoPrompts = [
  {
    type: 'input',
    name: 's3BucketName',
    message: 'S3 Bucket Name to deploy to: ',
    default: ''
  }
];

module.exports = {
  useCircleCiPrompts,
  templateToUsePrompts,
  configInfoPrompts
};
