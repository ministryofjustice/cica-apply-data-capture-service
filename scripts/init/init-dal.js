/* eslint-disable no-useless-catch */

'use strict';

const createDBQuery = require('../../db');

function questionnaireDAL() {
    const logger = {
        info: (...args) => console.log('[INFO]', ...args),
        error: (...args) => console.error('[ERROR]', ...args),
        warn: (...args) => console.warn('[WARN]', ...args)
    };
    const db = createDBQuery({logger});

    async function getAllActiveVersions() {
        try {
            return await db.query(
                "SELECT json_agg(row_to_json(q)) FROM (SELECT questionnaire ->> 'type' AS \"templateName\", questionnaire ->> 'version' AS \"templateVersion\" FROM questionnaire GROUP BY questionnaire ->> 'type', questionnaire ->> 'version') q",
                []
            );
        } catch (err) {
            throw err;
        }
    }

    return Object.freeze({
        getAllActiveVersions
    });
}

module.exports = questionnaireDAL;
