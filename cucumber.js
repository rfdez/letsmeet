const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const user_backend = [
  ...common,
  'tests/apps/user/backend/features/**/*.feature',
  '--require tests/apps/user/backend/features/steps/*.steps.ts'
].join(' ');

module.exports = {
  user_backend
};
