/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

'use strict';

const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');
const {createRequire} = require('module');
const VError = require('verror');

const templatesDir = path.join(__dirname, 'questionnaire', 'template-versions');
const registry = require('../supported-templates');

const moduleCache = {};

function getTemplate(templateName, version) {
    const templateConfig = registry[templateName];

    if (!templateConfig) {
        throw new VError({name: 'ResourceNotFound'}, `Template "${templateName}" does not exist`);
    }

    const {moduleName, moduleUrl, supportedVersions} = templateConfig;

    const cacheKey = `${templateName}@${version || 'latest'}`;

    if (!moduleCache[cacheKey]) {
        if (!version) {
            moduleCache[cacheKey] = require(moduleName);
        } else {
            if (supportedVersions && !supportedVersions.includes(version)) {
                throw new VError(
                    {name: 'ResourceNotFound'},
                    `Version "${version}" not supported for template "${templateName}"`
                );
            }

            const installDir = path.join(templatesDir, templateName, `v${version}`);
            const modulePath = path.join(installDir, 'node_modules', moduleName);

            if (!fs.existsSync(modulePath)) {
                console.log(`Installing ${moduleName}#${version} for ${templateName}...`);
                fs.mkdirSync(installDir, {recursive: true});

                execSync(`npm install ${moduleUrl}#v${version} --no-save`, {
                    cwd: installDir,
                    stdio: 'inherit'
                });
            }

            const requireFrom = createRequire(path.join(installDir, 'index.js'));
            moduleCache[cacheKey] = requireFrom(moduleName);
        }
    }

    const loadedModule = moduleCache[cacheKey];

    return id => {
        const templateInstance = JSON.parse(JSON.stringify(loadedModule));
        return {
            [templateName]: {
                id,
                ...templateInstance
            }
        };
    };
}

module.exports = getTemplate;
