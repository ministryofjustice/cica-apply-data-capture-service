'use strict';

const createMessageBusCaller = require('../services/message-bus');
const createQuestionnaireDAL = require('./questionnaire-dal');

function createSubmissionService({logger}) {
    const db = createQuestionnaireDAL({logger});

    async function getQuestionnaireIdsBySubmissionStatus(status) {
        return db.getQuestionnaireIdsBySubmissionStatus(status);
    }

    async function updateQuestionnaireSubmissionStatus(questionnaireId, submissionStatus) {
        return db.updateQuestionnaireSubmissionStatus(questionnaireId, submissionStatus);
    }

    async function postFailedSubmissions() {
        const questionnaireIds = await getQuestionnaireIdsBySubmissionStatus('FAILED');
        const messageBusCaller = createMessageBusCaller({logger});
        const promises = questionnaireIds.map(async id => {
            await updateQuestionnaireSubmissionStatus(id, 'IN_PROGRESS');
            try {
                await messageBusCaller.post('SubmissionQueue', {
                    applicationId: id
                });
                return {id, resubmitted: true};
            } catch (err) {
                await updateQuestionnaireSubmissionStatus(id, 'FAILED');
                return {id, resubmitted: false};
            }
        });
        const results = await Promise.all(promises);
        return results;
    }

    return Object.freeze({
        postFailedSubmissions
    });
}

module.exports = createSubmissionService;
