/* eslint-disable global-require */

'use strict';

const fsSync = require('node:fs');
const fs = require('node:fs/promises');

const supportedTemplates = {
    'sexual-assault': {
        '12.3.9': {module: 'q-templates-application-12_3_9'},
        '12.3.10': {module: 'q-templates-application-12_3_10'},
        '12.3.11': {module: 'q-templates-application-12_3_11'},
        '12.3.12': {module: 'q-templates-application-12_3_12'},
        '12.4.0': {module: 'q-templates-application-12_4_0'},
        '12.4.1': {module: 'q-templates-application-12_4_1'},
        '12.4.2': {module: 'q-templates-application-12_4_2'},
        '12.4.3': {module: 'q-templates-application', latest: true}
    },
    'request-a-review': {
        '1.0.0': {module: 'q-templates-review', latest: true}
    }
};

function createTemplateService({templatesConfig}) {
    function exactlyOneVersionContainsLatestFlag(versions) {
        const result = Object.values(versions).filter(version => version.latest === true);

        return result.length === 1;
    }

    function createRegistry() {
        const templates = {};

        Object.entries(templatesConfig).forEach(([templateName, versions]) => {
            templates[templateName] = {};

            if (exactlyOneVersionContainsLatestFlag(versions) === false) {
                throw Error(
                    `Exactly one version of template "${templateName}" must have the flag "latest: true"`
                );
            }

            Object.entries(versions).forEach(([versionName, versionConfig]) => {
                const templateFilepath = require.resolve(versionConfig.module);

                if (versionConfig.latest === true) {
                    // cached in memory
                    const templateAsJson = fsSync.readFileSync(templateFilepath, 'utf8');

                    templates[templateName].latest = templateAsJson;
                    templates[templateName][versionName] = templateAsJson;
                } else {
                    templates[templateName][versionName] = async () =>
                        // lazy load
                        fs.readFile(templateFilepath, 'utf8');
                }
            });
        });

        return templates;
    }

    const registry = createRegistry();

    async function getTemplateAsJson(templateName, templateVersion = 'latest') {
        const templateVersions = registry[templateName];

        if (templateVersions === undefined) {
            const err = Error(`Template "${templateName}" does not exist`);
            err.name = 'ResourceNotFound';

            throw err;
        }

        const template = templateVersions[templateVersion];

        if (template === undefined) {
            const err = Error(
                `Template version "${templateVersion}" not found for template "${templateName}"`
            );
            err.name = 'ResourceNotFound';

            throw err;
        }

        const templateAsJson = typeof template === 'string' ? template : await template();

        return templateAsJson;
    }

    return Object.freeze({
        getTemplateAsJson
    });
}

const templateService = createTemplateService({templatesConfig: supportedTemplates});

module.exports = {
    templateService,
    createTemplateService
};
