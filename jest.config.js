/* jshint node: true */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache'
};
