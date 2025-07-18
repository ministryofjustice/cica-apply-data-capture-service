'use strict';

// eslint-disable-next-line import/no-unresolved
const {parse} = require('csv-parse/sync');

function verifySupportedVersions(csvContent, supported) {
    const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
    });

    if (records.length === 0) {
        return []; // No rows, nothing to check
    }

    return records
        .map(row => ({
            type: row.templateName?.replace(/"/g, ''),
            version: row.templateVersion?.replace(/"/g, '')
        }))
        .filter(({type, version}) => {
            const typeSupport = supported[type];
            return !typeSupport || !typeSupport[version];
        })
        .map(({type, version}) => `${type}@${version}`);
}

module.exports = verifySupportedVersions;
