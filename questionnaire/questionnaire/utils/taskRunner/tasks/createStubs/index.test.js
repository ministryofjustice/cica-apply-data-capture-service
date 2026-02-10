'use strict';

const questionnaireFixture = require('../test-fixtures/questionnaireForStubs');
const originalData = require('../test-fixtures/questionnaireForStubs');

const loggerMock = {
    info: jest.fn()
};
beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
});
jest.doMock('../../../../../questionnaire-dal', () => {
    const dalServiceMock = {
        createQuestionnaire: jest.fn(() => {
            return 'ok!';
        })
    };

    return () => dalServiceMock;
});
const {createStubs} = require('.');

describe('Create a stub task', () => {
    const stub1 = {
        description: 'Create a stub template for the decision',
        type: 'createStub',
        sectionIds: ['p--a', 'system', 'owner', 'origin'],
        summaryBlocks: {
            read: {
                link:
                    "<a href='/apply/resume/||questionnaireId||' class='govuk-link'>Read our decision about your application</a>"
            }
        }
    };
    const stub2 = {
        description: 'Create a stub template for sending supporting information',
        type: 'createStub',
        sectionIds: ['p-b', 'system', 'owner', 'origin'],
        summaryBlocks: {
            read: {
                link:
                    "<a href='/apply/resume/||questionnaireId||' class='govuk-link'>Find out how to send supporting information for a review</a>"
            }
        }
    };
    let result;

    it('Should leave the original questionnaire object unchanged', async () => {
        const questionnaireWithStub = {...questionnaireFixture};
        questionnaireWithStub.meta.onComplete.actions = [stub1];

        const results = await createStubs({
            questionnaire: questionnaireWithStub,
            logger: loggerMock
        });
        originalData.meta.onComplete.actions = [stub1];
        expect(JSON.stringify(originalData)).toEqual(JSON.stringify(questionnaireWithStub));
        expect(JSON.stringify(results[0])).not.toEqual(JSON.stringify(originalData));
    });

    it('Should only keep the data for the specified page Ids', async () => {
        const questionnaireWithStub = {...questionnaireFixture};
        questionnaireWithStub.meta.onComplete.actions = [stub1];

        const results = await createStubs({
            questionnaire: questionnaireWithStub,
            logger: loggerMock
        });
        expect(results.length).toBe(1);
        [result] = results;
        originalData.meta.onComplete.actions = [stub1];

        expect(Object.keys(result.sections).join()).toEqual(stub1.sectionIds.join());
        expect(result.routes.initial).toEqual(stub1.sectionIds[0]);
        expect(result.currentSectionId).toEqual(stub1.sectionIds[0]);

        Object.keys(result.answers).forEach(answer => {
            expect(JSON.stringify(result.answers[answer])).toEqual(
                JSON.stringify(originalData.answers[answer])
            );
        });
        expect(Object.keys(result.answers).length).toEqual(stub1.sectionIds.length);
    });

    it('Should leave the personalisation metadata unaltered', async () => {
        const questionnaireWithStub = {...questionnaireFixture};
        questionnaireWithStub.meta.onComplete.actions = [stub1];

        const results = await createStubs({
            questionnaire: questionnaireWithStub,
            logger: loggerMock
        });
        expect(results.length).toBe(1);
        [result] = results;
        originalData.meta.onComplete.actions = [stub1];

        expect(JSON.stringify(result.meta.personalisation)).toEqual(
            JSON.stringify(originalData.meta.personalisation)
        );
        expect(result.meta.onComplete.actions).toBe(undefined);
        expect(result.meta.onCreate.actions).toBe(undefined);
    });

    it('Should contain only the specified summary blocks', async () => {
        const questionnaireWithStub = {...questionnaireFixture};
        questionnaireWithStub.meta.onComplete.actions = [stub1];

        const results = await createStubs({
            questionnaire: questionnaireWithStub,
            logger: loggerMock
        });
        expect(results.length).toBe(1);
        [result] = results;
        expect(JSON.stringify(result.meta.summaryBlocks)).toEqual(
            JSON.stringify(stub1.summaryBlocks)
        );
    });

    it('Should correctly set the routing to final', async () => {
        const questionnaireWithStub = {...questionnaireFixture};
        questionnaireWithStub.meta.onComplete.actions = [stub1];

        const results = await createStubs({
            questionnaire: questionnaireWithStub,
            logger: loggerMock
        });
        expect(results.length).toBe(1);
        [result] = results;
        expect(result.routes.states['p--a'].type).toEqual('final');
    });

    it('Should create a different questionnaire for each stub', async () => {
        const questionnaireWithStubs = {...questionnaireFixture};
        questionnaireWithStubs.meta.onComplete.actions = [stub1, stub2];

        const results = await createStubs({
            questionnaire: questionnaireWithStubs,
            logger: loggerMock
        });
        // 2 Stubs should be created
        expect(results.length).toBe(2);
        // The 2 stubs should be different
        expect(JSON.stringify(results[0])).not.toEqual(JSON.stringify(results[1]));
        // The 2 stubs should have different 'final' pages
        expect(results[0].routes.states['p--a'].type).toEqual('final');
        expect(results[1].routes.states['p-b'].type).toEqual('final');
        // The first stub should match stub1
        expect(Object.keys(results[0].sections).join()).toEqual(stub1.sectionIds.join());
        expect(results[0].routes.initial).toEqual(stub1.sectionIds[0]);
        // The second stub should match stub2
        expect(Object.keys(results[1].sections).join()).toEqual(stub2.sectionIds.join());
        expect(results[1].routes.initial).toEqual(stub2.sectionIds[0]);
    });
});
