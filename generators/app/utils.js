const appInfoPrompts = [
  {
    type: 'input',
    name: 'appName',
    message: 'Application name',
    default: 'frontend-project-generated-by-yeoman'
  }
];

const addons = [{ addonDir: 'pulumi' }, { addonDir: 'circleci' }];

const composeWithFactory = (addonDir, appName, that) => {
  return that.composeWith(require.resolve(`../${addonDir}`), {
    appName
  });
};

module.exports = {
  composeWithFactory,
  addons,
  appInfoPrompts
};
