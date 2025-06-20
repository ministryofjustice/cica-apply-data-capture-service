/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

'use strict';

const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');
const {createRequire} = require('module');
const VError = require('verror');
const lockfile = require('proper-lockfile');

const templatesDir = path.resolve(__dirname, 'template-versions');
const registry = require('../supported-templates');

const moduleCache = {};

async function getTemplate(templateName, version) {
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
                const release = await lockfile.lock(installDir, {
                    retries: {
                        retries: 10,
                        factor: 1.5,
                        minTimeout: 100,
                        maxTimeout: 2000
                    },
                    stale: 10000
                });
                try {
                    console.log(installDir);
                    if (!fs.existsSync(path.join(installDir, 'package.json'))) {
                        execSync('npm init -y', {
                            cwd: installDir,
                            stdio: 'inherit'
                        });
                    }
                    execSync(`npm install ${moduleUrl}#v${version} --no-save`, {
                        cwd: installDir,
                        stdio: 'inherit'
                    });
                } catch (err) {
                    console.error('Install failed:', err.message);
                    console.error('stdout:', err.stdout?.toString());
                    console.error('stderr:', err.stderr?.toString());
                    throw err;
                } finally {
                    const unwantedLockFile = path.join(
                        installDir,
                        'node_modules',
                        'package-lock.json'
                    );
                    if (fs.existsSync(unwantedLockFile)) {
                        fs.unlinkSync(unwantedLockFile);
                    }
                    await release();
                }
            }
            const requireFrom = createRequire(installDir);
            moduleCache[cacheKey] = requireFrom(moduleName);
        }
    }

    const loadedModule = moduleCache[cacheKey];
    return id => {
        const templateInstance = JSON.parse(JSON.stringify(loadedModule));
        return {
            id,
            ...templateInstance
        };
    };
}

module.exports = getTemplate;
