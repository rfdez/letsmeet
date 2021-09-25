/* jshint esversion: 6 */
/* jshint node: true */
const common = [
  '--publish-quiet',
  '--require-module ts-node/register' // Load TypeScript module
];

const userBackend = [
  ...common,
  'tests/apps/user/backend/features/**/*.feature',
  '--require tests/apps/user/backend/features/steps/*.steps.ts'
].join(' ');

module.exports = {
  userBackend
};
