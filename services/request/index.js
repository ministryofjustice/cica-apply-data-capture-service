'use strict';

const {Readable} = require('node:stream');

function requestClient() {
    async function getLetterPdf({ownerId, caseReferenceNumber, letterId}) {
        const response = await fetch(
            `${process.env.DCS_CLS_URL}/letters/${ownerId}/${caseReferenceNumber}/${letterId}?format=pdf`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/pdf',
                    Authorization: `Bearer ${process.env.DCS_CLS_JWT}`
                }
            }
        );

        return {
            statusCode: response.status,
            stream: Readable.fromWeb(response.body)
        };
    }

    return Object.freeze({
        getLetterPdf
    });
}

module.exports = requestClient;
