'use strict';

const {SQSClient, SendMessageCommand} = require('@aws-sdk/client-sqs');
const VError = require('verror');

function createSqsService(opts) {
    const {logger} = opts;
    delete opts.logger;

    const client = new SQSClient({
        region: 'eu-west-2'
    });

    /**
     * Sends a given message to a given SQS queue
     * @param {object} payload - The json to be sent to the queue.
     * @param {string} queueUrl - The queue url.
     * @param messageAttributes - (Optional) message attributes.
     * @returns SendMessageCommandOutput equal to the output given by the queue for the send command
     */
    async function send(payload, queueUrl, messageAttributes) {
        try {
            logger.info('SQS MESSAGE SENDING');

            const input = {QueueUrl: queueUrl}; // url needs to be in object form.
            input.MessageBody = JSON.stringify(payload);

            if (messageAttributes && Object.keys(messageAttributes).length > 0) {
                input.MessageAttributes = messageAttributes;
            }

            const command = new SendMessageCommand(input);
            const response = await client.send(command);

            logger.info(response, 'MESSAGE SENT');
            return response;
        } catch (err) {
            logger.error({code: err.code}, 'MESSAGE FAILED TO SEND');
            throw new VError(
                {
                    name: 'SendMessageFailed'
                },
                `Message failed to send with the following error: ${err}`
            );
        }
    }

    return Object.freeze({
        send
    });
}

module.exports = createSqsService;
