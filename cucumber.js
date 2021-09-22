const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const meeting_backend = [
  ...common,
  'tests/apps/meeting/backend/features/**/*.feature',
  '--require tests/apps/meeting/backend/features/steps/*.steps.ts'
].join(' ');

module.exports = {
  meeting_backend
};
