'use strict';

function verifySupportedVersions(actualVersions, supportedVersions) {
    try {
        if (!Array.isArray(actualVersions) || actualVersions.length === 0) {
            return []; // No rows
        }

        return actualVersions
            .filter(row => row.templateName && row.templateVersion)
            .filter(({templateName, templateVersion}) => {
                const typeSupport = supportedVersions[templateName];
                return !typeSupport || !typeSupport[templateVersion];
            })
            .map(({templateName, templateVersion}) => `${templateName}@${templateVersion}`);
    } catch (err) {
        throw new Error(`Failed to verify supported versions: ${err.message}`);
    }
}

module.exports = verifySupportedVersions;
