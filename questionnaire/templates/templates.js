/* eslint-disable global-require */

'use strict';

const fsSync = require('node:fs');
const fs = require('node:fs/promises');
const supportedTemplates = require('../../supported_template_versions');

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
