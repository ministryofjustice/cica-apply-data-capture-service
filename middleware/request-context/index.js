'use strict';

const crypto = require('crypto');

function resolveQuestionnaireId(req) {
    return (
        req.context?.questionnaireId ||
        req.params?.questionnaireId ||
        req.body?.data?.attributes?.questionnaireId ||
        undefined
    );
}

function enrichRequestContext(req, res, next) {
    const questionnaireId = resolveQuestionnaireId(req);
    const ownerId = req.get('On-Behalf-Of');
    const requestId = req.get('X-Request-Id') || crypto.randomUUID();

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
