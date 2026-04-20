const config = {
    '*.js': ['eslint --fix --color'],
    '*.{json,yml,yaml}': ['prettier --write'],
    './openapi/openapi.json': 'npm run lint:openapi',
    './openapi/openapi-admin.json': 'npm run lint:openapi-admin'
};

module.exports = config;
