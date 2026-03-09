/* eslint-disable no-useless-catch */

'use strict';

const VError = require('verror');
const crypto = require('node:crypto');
const questionnaireResource = require('../resources/questionnaire-resource');

const defaults = {};
defaults.createQuestionnaireDAL = require('../questionnaire-dal');

defaults.apiVersion = '2023-05-17';

defaults.createTaskRunner = require('../questionnaire/utils/taskRunner');
const sendNotifyMessageToSQS = require('../questionnaire/utils/taskRunner/tasks/postToNotify');
const sequential = require('../questionnaire/utils/taskRunner/tasks/sequential');

function createQuestionnaireService({
    logger,
    apiVersion = defaults.apiVersion,
    ownerId,
    createQuestionnaireDAL = defaults.createQuestionnaireDAL,
    createTaskRunner = defaults.createTaskRunner,
    taskImplementations = {
        sendNotifyMessageToSQS
    }
} = {}) {
    const db = createQuestionnaireDAL({logger, ownerId});

    // Check API version
    if (apiVersion !== defaults.apiVersion) {
        throw new VError(
            {
                name: 'ApiVersionNotFound'
            },
            `API version "${apiVersion}" is not compatible with this release`
        );
    }

    // DAL functions
    async function getQuestionnaire(questionnaireId) {
        return db.getQuestionnaireByOwner(questionnaireId);
    }

    async function updateQuestionnaireExpiresDate(questionnaireId, expiresAt) {
        return db.updateQuestionnaireExpiresDate(questionnaireId, expiresAt);
    }

    // Task List compatibility
    function supportsTaskList(questionnaireDefinition) {
        return questionnaireDefinition?.routes?.type === 'parallel';
    }

    async function createQuestionnaire({template, owner, origin, system}) {
        const questionnaire = {
            id: crypto.randomUUID(),
            ...template,
            answers: {
                ...template.answers,
                ...(owner !== undefined && {owner}),
                ...(origin !== undefined && {origin}),
                ...(system !== undefined && {system})
            }
        };

        await db.createQuestionnaire(questionnaire.id, questionnaire);

        if (questionnaire.onCreate) {
            const onCreateTaskDefinition = JSON.parse(JSON.stringify(questionnaire.onCreate));
            const taskRunner = createTaskRunner({
                taskImplementations: {
                    sequential,
                    ...taskImplementations
                },
                context: {
                    logger,
                    questionnaireDef: questionnaire,
                    type: 'onCreate'
                }
            });
            try {
                await taskRunner.run(onCreateTaskDefinition);
            } catch (error) {
                logger.info(error);
            }
        }

        const systemData = questionnaire?.answers?.system;
        if (systemData?.['expiry-date']) {
            const expiresAt = new Date(systemData?.['expiry-date']);
            await updateQuestionnaireExpiresDate(questionnaire.id, expiresAt);
        }

        return {
            data: questionnaireResource({questionnaire}, supportsTaskList(questionnaire))
        };
    }

    async function updateQuestionnairesExpiresDate(questionnaireIds) {
        let notFoundCount = 0;
        const results = await Promise.all(
            questionnaireIds.map(async questionnaireId => {
                try {
                    // Check the questionnaire exists first
                    await getQuestionnaire(questionnaireId);
                    // If it exists, try and delete it
                    const expiresAt = new Date();
                    await updateQuestionnaireExpiresDate(questionnaireId, expiresAt);
                    return 'success';
                } catch (err) {
                    if (err.name === 'ResourceNotFound') {
                        // If the questionnaire doesn't exist log it but don't fail it
                        logger.info(err.message);
                        notFoundCount += 1;
                        return 'notFound';
                    }
                    // If any other errors occur they are legitimate DB errors
                    throw err;
                }
            })
        );
        logger.info(
            `Successfully deleted ${questionnaireIds.length - notFoundCount} out of ${
                questionnaireIds.length
            } questionnaires`
        );
        return results;
    }

    return Object.freeze({
        createQuestionnaire,
        updateQuestionnairesExpiresDate
    });
}

module.exports = createQuestionnaireService;
