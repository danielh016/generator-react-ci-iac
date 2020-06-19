'use strict';
const Generator = require('yeoman-generator');
const enums = require('./enums');
const utils = require('./utils');

module.exports = class extends Generator {
  async prompting() {
    const { usePulumiPrompts, pulumiInfoPrompts } = utils;
    const { appName } = this.options;
    this.usePulumi = await this.prompt(usePulumiPrompts);

    if (!this.usePulumi.confirmed) return;

    this.templateDir = enums.S3_CLOUDFRONT_TEMPLATE_DIR;
    this.pulumiInfo = await this.prompt(pulumiInfoPrompts(appName));
  }

  writing() {
    if (!this.usePulumi.confirmed) return;

    const { appName } = this.options;
    const { pulumiAppName, pulumiSetS3BucketName } = this.pulumiInfo;

    this.fs.copy(this.templatePath(this.templateDir + '/'), this.destinationPath(`${appName}/`), {
      globOptions: { dot: true }
    });
    this.fs.copyTpl(
      this.templatePath(this.templateDir + '/infra/package.json'),
      this.destinationPath(`${appName}/infra/package.json`),
      { pulumiAppName }
    );
    this.fs.copyTpl(
      this.templatePath(this.templateDir + '/infra/Pulumi.yaml'),
      this.destinationPath(`${appName}/infra/Pulumi.yaml`),
      { pulumiAppName }
    );
    this.fs.copyTpl(
      this.templatePath(this.templateDir + '/infra/stacks/dev/Pulumi.dev.yaml'),
      this.destinationPath(`${appName}/infra/stacks/dev/Pulumi.dev.yaml`),
      { pulumiAppName, pulumiSetS3BucketName }
    );
  }
};
