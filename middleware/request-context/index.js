'use strict';

const crypto = require('crypto');

function resolveQuestionnaireId(req) {
    return req.params?.questionnaireId || req.body?.data?.attributes?.questionnaireId || undefined;
}

function baseContextMiddleware(req, res, next) {
    const ownerId = req.get('On-Behalf-Of');
    const requestId = req.get('X-Request-Id') || crypto.randomUUID();

    req.context = {
        ...req.context,
        ownerId,
        requestId
    };

    if (req.log && typeof req.log.child === 'function') {
        req.log = req.log.child({ownerId, requestId});
    }

    res.set('X-Request-Id', requestId);

    next();
}

function questionnaireIdMiddleware(req, res, next) {
    const questionnaireId = resolveQuestionnaireId(req);

    req.context = {
        ...req.context,
        questionnaireId
    };

    if (req.log && typeof req.log.child === 'function') {
        req.log = req.log.child({questionnaireId});
    }

    next();
}

module.exports = {
    resolveQuestionnaireId,
    baseContextMiddleware,
    questionnaireIdMiddleware
};
