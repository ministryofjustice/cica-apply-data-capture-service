'use strict';

const createSqsService = require('../../../../../../services/sqs/index');
const createQuestionnaireHelper = require('../../../../questionnaire');

async function sendNotifyMessageToSQS({questionnaire, logger}) {
    const questionnaireId = questionnaire.id;
    const taskLogger = logger.child({questionnaireId});

    taskLogger.info('Sending notify message to SQS for questionnaire with id');
    const sqsService = createSqsService({logger: taskLogger});
    const questionnaireDef = createQuestionnaireHelper({questionnaireDefinition: questionnaire});
    const permittedActions = questionnaireDef.getPermittedActions();
    let sqsResponse = {MessageId: 'MessageId'};

    await Promise.all(
        permittedActions.map(async action => {
            if (action) {
                if (action.type === 'sendEmail') {
                    const payload = {
                        templateId: action.data.templateId,
                        emailAddress: action.data.emailAddress,
                        personalisation: {
                            caseReference: action.data.personalisation?.caseReference,
                            content: action.data.personalisation?.content
                        },
                        reference: null,
                        questionnaireId
                    };
                    sqsResponse = await sqsService.send(payload, process.env.NOTIFY_AWS_SQS_ID);
                    taskLogger.info('Email sent to Notify SQS for questionnaire with id');
                }

                if (action.type === 'sendSms') {
                    const payload = {
                        templateId: action.data.templateId,
                        phoneNumber: action.data.phoneNumber,
                        personalisation: {
                            caseReference: action.data.personalisation?.caseReference,
                            content: action.data.personalisation?.content
                        },
                        reference: null,
                        questionnaireId
                    };
                    sqsResponse = await sqsService.send(payload, process.env.NOTIFY_AWS_SQS_ID);
                    taskLogger.info('SMS sent to Notify SQS for questionnaire with id');
                }
            }
        })
    );
    return sqsResponse;
}

module.exports = sendNotifyMessageToSQS;
