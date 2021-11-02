const { alias, configPaths } = require('react-app-rewire-alias');
module.exports = alias(configPaths('./tsconfig.paths.json'));
