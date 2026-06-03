'use strict';

const crypto = require('crypto');
const {resolveQuestionnaireId, baseContextMiddleware, questionnaireIdMiddleware} = require('.');

jest.mock('crypto');

describe('request-context middleware', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            get: jest.fn(),
            context: {},
            log: {
                child: jest.fn().mockReturnValue({
                    info: jest.fn(),
                    error: jest.fn()
                })
            },
            params: {},
            body: {}
        };
        res = {
            set: jest.fn()
        };
        next = jest.fn();
    });

    describe('resolveQuestionnaireId', () => {
        it('should return questionnaireId from req.params', () => {
            req.params.questionnaireId = 'test-id';
            expect(resolveQuestionnaireId(req)).toBe('test-id');
        });

        it('should return questionnaireId from req.body if no params', () => {
            req.body = {data: {attributes: {questionnaireId: 'body-id'}}};
            expect(resolveQuestionnaireId(req)).toBe('body-id');
        });

        it('should return undefined if neither present', () => {
            expect(resolveQuestionnaireId(req)).toBeUndefined();
        });
    });

    describe('baseContextMiddleware', () => {
        it('should set ownerId and requestId on req.context', () => {
            req.get.mockImplementation(header => {
                if (header === 'On-Behalf-Of') {
                    return 'owner-123';
                }
                if (header === 'X-Request-Id') {
                    return 'request-123';
                }
                return undefined;
            });

            baseContextMiddleware(req, res, next);

            expect(req.context.ownerId).toBe('owner-123');
            expect(req.context.requestId).toBe('request-123');
        });

        it('should generate a UUID if no X-Request-Id header', () => {
            crypto.randomUUID.mockReturnValue('generated-uuid');
            req.get.mockReturnValue(undefined);

            baseContextMiddleware(req, res, next);

            expect(req.context.requestId).toBe('generated-uuid');
        });

        it('should set X-Request-Id response header', () => {
            req.get.mockImplementation(header => {
                if (header === 'X-Request-Id') {
                    return 'request-123';
                }
                return undefined;
            });

            baseContextMiddleware(req, res, next);

            expect(res.set).toHaveBeenCalledWith('X-Request-Id', 'request-123');
        });

        it('should call next()', () => {
            req.get.mockReturnValue(undefined);
            crypto.randomUUID.mockReturnValue('generated-uuid');

            baseContextMiddleware(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('questionnaireIdMiddleware', () => {
        it('should set questionnaireId on req.context from params', () => {
            req.params.questionnaireId = 'test-id';

            questionnaireIdMiddleware(req, res, next);

            expect(req.context.questionnaireId).toBe('test-id');
        });

        it('should set questionnaireId on req.context from body', () => {
            req.body = {data: {attributes: {questionnaireId: 'body-id'}}};

            questionnaireIdMiddleware(req, res, next);

            expect(req.context.questionnaireId).toBe('body-id');
        });

        it('should set questionnaireId as undefined if not present', () => {
            questionnaireIdMiddleware(req, res, next);

            expect(req.context.questionnaireId).toBeUndefined();
        });

        it('should call next()', () => {
            questionnaireIdMiddleware(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});
