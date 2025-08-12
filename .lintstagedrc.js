const config = {
    '*.js': ['eslint --fix --color'],
    '*.{json,yml,yaml}': ['prettier --write'],
    './openapi/openapi.json': 'npm run lint:openapi',
    './openapi/openapi-admin.json': 'npm run lint:openapi-admin',
    '*': 'node ./check-sensitive.js'
};

module.exports = config;
