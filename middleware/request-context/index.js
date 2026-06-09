'use strict';

const crypto = require('crypto');

function resolveQuestionnaireId(req) {
    return (
        req.params?.questionnaireId ||
        req.context?.questionnaireId ||
        req.body?.data?.attributes?.questionnaireId ||
        undefined
    );
}

function enrichRequestContext(req, res, next) {
    const questionnaireId = resolveQuestionnaireId(req);
    console.log('#######################################################');
    console.log({questionnaireId});
    console.log('#######################################################');
    const ownerId = req.context?.ownerId || req.get('On-Behalf-Of');
    const requestId = req.context?.requestId || req.get('X-Request-Id') || crypto.randomUUID();

    req.context = {
        ...req.context,
        questionnaireId,
        ownerId,
        requestId
    };

    if (req.log && typeof req.log.child === 'function') {
        req.log = req.log.child({
            questionnaireId,
            ownerId,
            requestId
        });
    }

    res.set('X-Request-Id', requestId);

    next();
}

module.exports = {
    resolveQuestionnaireId,
    enrichRequestContext
};
