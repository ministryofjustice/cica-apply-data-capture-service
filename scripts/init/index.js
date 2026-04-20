'use strict';

const initDAL = require('./init-dal');
const supportedVersions = require('../../supported-template-versions.json');
const verifySupportedVersions = require('./compare-versions');

(async () => {
    const db = initDAL();

    try {
        const dbResult = await db.getAllActiveVersions();
        const dbVersions = dbResult?.rows?.[0]?.json_agg || [];

        if (dbVersions.length === 0) {
            console.log('No active questionnaire versions found in DB.');
            process.exit(0);
        }

        const unsupported = verifySupportedVersions(dbVersions, supportedVersions);

        if (unsupported.length > 0) {
            console.error('Unsupported questionnaire versions found in DB:', unsupported);
            process.exit(1);
        }

        console.log('All questionnaire versions in DB are supported.');
        process.exit(0);
    } catch (err) {
        console.error('Error while checking supported questionnaire versions:', err);
        process.exit(1);
    }
})();
