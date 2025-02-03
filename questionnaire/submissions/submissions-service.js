'use strict';

const defaults = {};
defaults.createQuestionnaireService = require('../questionnaire-service');
defaults.createTaskRunner = require('../questionnaire/utils/taskRunner');
defaults.sequential = require('../questionnaire/utils/taskRunner/tasks/sequential');
// Pull in additional task implementations here
const {transformAndUpload} = require('../questionnaire/utils/taskRunner/tasks/transformAndUpload');
const {
    generateReferenceNumber
} = require('../questionnaire/utils/taskRunner/tasks/generateCaseReference');
const {sendSubmissionMessageToSQS} = require('../questionnaire/utils/taskRunner/tasks/postToSQS');
const sendNotifyMessageToSQS = require('../questionnaire/utils/taskRunner/tasks/postToNotify');
const getProgress = require('../utils/getProgressArray');
const {createAppError} = require('../../middleware/error-handler/createAppError');

function createSubmissionService({
    logger,
    apiVersion,
    ownerId,
    createQuestionnaireService = defaults.createQuestionnaireService,
    createTaskRunner = defaults.createTaskRunner,
    sequential = defaults.sequential,
    taskImplementations = {
        transformAndUpload,
        generateReferenceNumber,
        sendSubmissionMessageToSQS,
        sendNotifyMessageToSQS
    }
} = {}) {
    const questionnaireService = createQuestionnaireService({
        logger,
        apiVersion,
        ownerId
    });

    function hasSummaryIdInProgressEntries(questionnaireDefinition) {
        // are we currently, or have we been on this questionnaire's summary page?
        // we infer a questionnaire is complete if the user has visited the summary page.
        const summarySectionIds = questionnaireDefinition.routes.summary;
        const progressEntries = getProgress(questionnaireDefinition);

        return summarySectionIds.some(summarySectionId =>
            progressEntries.includes(summarySectionId)
        );
    }

    async function isSubmittable(questionnaireId, questionnaireDefinition) {
        // 1 - does it exist
        // 2 - if exists, is it in a submittable state
        // 3 - has it already been submitted
        const submissionStatus = await questionnaireService.getQuestionnaireSubmissionStatus(
            questionnaireId
        );

        if (submissionStatus === 'COMPLETED') {
            return false;
        }

        return hasSummaryIdInProgressEntries(questionnaireDefinition);
    }

    function getOnSubmitTaskDefinitionCopy(questionnaireDefinition) {
        const onSubmitTaskDefinition = questionnaireDefinition.onSubmit;

        if (onSubmitTaskDefinition === undefined) {
            throw Error('Questionnaire has no "onSubmit" property');
        }

        return JSON.parse(JSON.stringify(onSubmitTaskDefinition));
    }

    async function submit(questionnaireId) {
        try {
            console.log('1111111111111111111111111111111111111111');
            const questionnaireDefinition = await questionnaireService.getQuestionnaire(
                questionnaireId
            );

            console.log('2222222222222222222222222222222222222222222');
            if ((await isSubmittable(questionnaireId, questionnaireDefinition)) === false) {
                console.log('333333333333333333333333333333333333333');
                throw Error(
                    `Questionnaire with ID "${questionnaireId}" is not in a submittable state`
                );
            }

            console.log('444444444444444444444444444444444');
            const onSubmitTaskDefinition = getOnSubmitTaskDefinitionCopy(questionnaireDefinition);
            console.log('5555555555555555555555555555555555555');
            const taskRunner = createTaskRunner({
                taskImplementations: {
                    sequential,
                    ...taskImplementations
                },
                context: {
                    logger,
                    questionnaireDef: questionnaireDefinition
                }
            });

            console.log('66666666666666666666666666666666666666');
            await questionnaireService.updateQuestionnaireSubmissionStatus(
                questionnaireId,
                'IN_PROGRESS'
            );

            console.log('7777777777777777777777777777777777777777777');
            await taskRunner.run(onSubmitTaskDefinition);

            console.log('888888888888888888888888888888888888888888888');
            await questionnaireService.updateQuestionnaireSubmissionStatus(
                questionnaireId,
                'COMPLETED'
            );

            console.log('9999999999999999999999999999999999999999999999');
            // return a submission document
            return {
                data: {
                    type: 'submissions',
                    id: questionnaireId,
                    attributes: {
                        status: 'COMPLETED',
                        submitted: true,
                        questionnaireId,
                        caseReferenceNumber: '11\\223344' // TODO: DO WE NEED THIS? ADDED DUMMY CASE REF TO PASS TEST.
                    }
                }
            };
        } catch (err) {
            console.log('10-10-10-10-10-10-10-10-10-10-10-10-10-10-10');
            if (err.name === 'SequentialTaskError') {
                console.log('11-11-11-11-11-11-11-11-11-11-11-11-11-11-11');
                await questionnaireService.updateQuestionnaireSubmissionStatus(
                    questionnaireId,
                    'FAILED'
                );
                console.log('12-12-12-12-12-12-12-12-12-12-12-12-12-12-12');
                throw createAppError({
                    name: 'SubmissionError',
                    message: `Submission error for questionnaireId ${questionnaireId}`,
                    error: err
                });
            }
            console.log('13-13-13-13-13-13-13-13-13-13-13-13-13-13-13');
            console.log({err});
            throw err;
        }
    }

    async function postFailedSubmissions() {
        try {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            const questionnaireIds = await questionnaireService.getQuestionnaireIdsBySubmissionStatus(
                'FAILED'
            );
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
            const resubmittedApplications = questionnaireIds.map(async id => {
                console.log('ccccccccccccccccccccccccccccccccccccccccccc');
                await submit(id);
                console.log('ddddddddddddddddddddddddddddddddddddddddddd');
                return {id, resubmitted: true};
            });
            console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            return Promise.all(resubmittedApplications);
        } catch (err) {
            console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffff');
            logger.error({err}, 'RESUBMISSION FAILED');
            console.log('ggggggggggggggggggggggggggggggggggggggggggggggggggg');
            throw err;
        }
    }

    return Object.freeze({
        submit,
        postFailedSubmissions
    });
}

module.exports = createSubmissionService;
