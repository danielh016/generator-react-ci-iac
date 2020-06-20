const usePulumiPrompts = [
  {
    type: 'confirm',
    name: 'confirmed',
    message: 'Do you want to setup Pulumi (IaC)?',
    default: true
  }
];

const pulumiInfoPrompts = (appName = '') => [
  {
    type: 'input',
    name: 'pulumiAppName',
    message: 'Pulumi Application Name (e.g. test.yeoman)',
    default: appName.replace(/[-|_|\s+]/g, '.')
  },
  {
    type: 'input',
    name: 'pulumiSetS3BucketName',
    message: 'AWS S3 Bucket name (e.g. io-dev-frontend-test-yeoman)',
    default: `io-dev-frontend-${appName.replace(/[.|_|\s+]/g, '-')}`
  }
];

module.exports = {
  usePulumiPrompts,
  pulumiInfoPrompts
};
