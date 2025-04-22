/* eslint-disable global-require */

'use strict';

const VError = require('verror');

const registry = {
    'sexual-assault': {
        latest: require('q-templates-application'),
        '12.0.0': require('q-templates-application-v12'),
        '11.0.0': require('q-templates-application-v11')
    }
};

function getTemplate(templateName, version = 'latest') {
    const versions = registry[templateName];
    if (!versions) {
        throw new VError(
            {
                name: 'ResourceNotFound'
            },
            `Template "${templateName}" does not exist`
        );
    }

    const template = versions[version];
    if (!template) {
        throw new VError(
            {
                name: 'ResourceNotFound'
            },
            `Version "${version}" not found for template "${templateName}"`
        );
    }

    const applicationTemplateAsJson = JSON.stringify(template);

    return id => ({
        id,
        ...JSON.parse(applicationTemplateAsJson) // deep copy
    });
}

module.exports = getTemplate;
