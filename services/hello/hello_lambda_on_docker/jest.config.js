const withBaseConfig = require('@packages/config/jest');
const {compilerOptions} = require('./tsconfig.json');

module.exports = withBaseConfig({}, compilerOptions);
