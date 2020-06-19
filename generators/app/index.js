'use strict';
const Generator = require('yeoman-generator');
const enums = require('./enums');
const utils = require('./utils');

module.exports = class extends Generator {
  async prompting() {
    this.templateDir = enums.FRONTEND_TEMPLATE_DIR;
    this.appInfo = await this.prompt(utils.appInfoPrompts);
  }

  writing() {
    const { addons, composeWithFactory } = utils;
    const { appName } = this.appInfo;

    this.fs.copy(this.templatePath(this.templateDir + '/'), this.destinationPath(`${appName}/`), {
      globOptions: { dot: true }
    });

    this.fs.copyTpl(
      this.templatePath(this.templateDir + '/_package.json'),
      this.destinationPath(`${appName}/package.json`),
      {
        name: appName.replace(/\s+/g, '-')
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + '/README.md'),
      this.destinationPath(`${appName}/README.md`),
      {
        appName
      }
    );

    this.removeFiles();

    console.log('appName', appName);

    addons.forEach(addon => {
      return composeWithFactory(addon.addonDir, appName, this);
    });
  }

  removeFiles() {
    const { appName } = this.appInfo;
    this.fs.delete(`${appName}/_package.json`);
  }

  install() {
    const { appName } = this.appInfo;
    this.yarnInstall(null, {}, { cwd: `${appName}/` });
  }
};
