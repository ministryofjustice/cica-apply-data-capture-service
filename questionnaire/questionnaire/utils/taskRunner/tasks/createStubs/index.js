'use strict';

const crypto = require('node:crypto');

const createQuestionnaireHelper = require('../../../../questionnaire');
const createQuestionnaireService = require('../../../../../questionnaire-service');

/**
 * Creates stub templates specified in the questionnaire metadata
 * and puts them in the database
 * @param {questionnaire} questionnaire - The raw questionnaire object
 * @param {logger} logger - The logger
 * @param {type} string - Whether the task is being called on create or on submit
 * @returns JSON object from bucket with key matching given key
 */
async function createStubs({questionnaire, logger, type}) {
    // create question helper
    const fullQuestionnaireHelper = createQuestionnaireHelper({
        questionnaireDefinition: questionnaire
    });
    const questionnaireService = createQuestionnaireService({
        logger,
        ownerId: fullQuestionnaireHelper.getAnswers().owner['owner-id']
    });
    const permittedActions = fullQuestionnaireHelper.getPermittedActions(type);
    const fullQuestionnaireId = fullQuestionnaireHelper.getId();

    const stubs = await Promise.all(
        permittedActions.map(async action => {
            if (action) {
                if (action.type === 'createStub') {
                    // Make sure not to alter the original
                    const stub = JSON.parse(JSON.stringify(questionnaire));
                    // Delete all unspecified pages
                    const idsToKeep = action.sectionIds;
                    Object.keys(stub.sections).forEach(sectionId => {
                        if (!idsToKeep.includes(sectionId)) {
                            delete stub.sections[sectionId];
                            delete stub.routes.states[sectionId];
                            delete stub.answers[sectionId];
                            delete stub.retractedAnswers;
                        }
                    });
                    // Update the routing to only include the remaining pages
                    const pageIds = idsToKeep.filter(id => id.includes('p-'));
                    [stub.routes.initial] = pageIds;
                    stub.progress = [pageIds[0]];
                    [stub.currentSectionId] = pageIds;
                    const referrerLink =
                        process.env.NODE_ENV === 'production'
                            ? 'https://claim-criminal-injuries-compensation.service.justice.gov.uk'
                            : 'https://localhost:3000';
                    // prettier-ignore
                    stub.routes.referrer = `${referrerLink}/account/dashboard/manage/${stub.answers.system['case-reference'].replace('\\', '-')}`;
                    const newFinalPage = pageIds.at(-1);
                    stub.routes.states[newFinalPage] = {type: 'final'};
                    // Stubs should not have actions associated with them
                    stub.onCreate = {};
                    stub.onSubmit = {};
                    // Update meta
                    stub.meta.onCreate = {};
                    stub.meta.onComplete = {};
                    stub.meta.summaryBlocks = action.summaryBlocks;

                    // Create a new questionnaire Id
                    stub.id = crypto.randomUUID();

                    // Create the new questionnaire
                    stub.type = 'stub';
                    await questionnaireService.createQuestionnaire({
                        owner: questionnaire.owner,
                        preMadeQuestionnaire: stub
                    });
                    logger.info(
                        `Stub with id ${stub.id} created for questionnaire with id ${fullQuestionnaireId}`
                    );
                    return stub;
                }
            }
            return false;
        })
    );
    return stubs.filter(stub => stub);
}

module.exports = {
    createStubs
};
