'use strict';
const Generator = require('yeoman-generator');
const enums = require('./enums');
const utils = require('./utils');

module.exports = class extends Generator {
  async prompting() {
    const { useCircleCiPrompts, templateToUsePrompts, configInfoPrompts } = utils;
    this.useCircleCi = await this.prompt(useCircleCiPrompts);

    if (!this.useCircleCi.confirmed) return;

    this.templateToUse = await this.prompt(templateToUsePrompts);

    const willUseDeploy = this.templateToUse.ciTemplate === enums.TEST_BUILD_DEPLOY_TEMPLATE_DIR;

    if (willUseDeploy) {
      this.configInfo = await this.prompt(configInfoPrompts);
    }
  }

  writing() {
    if (!this.useCircleCi.confirmed) return;

    const { ciTemplate } = this.templateToUse;
    const { appName } = this.options;
    const s3BucketName = this.configInfo ? this.configInfo.s3BucketName : '';

    this.fs.copyTpl(
      this.templatePath(ciTemplate + '/.circleci/config.yml'),
      this.destinationPath(`${appName}/.circleci/config.yml`),
      { s3BucketName }
    );
  }
};
