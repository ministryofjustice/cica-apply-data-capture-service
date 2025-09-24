'use strict';

const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const {VError} = require('verror');

const isPathForced = process.env.NODE_ENV === 'development';
const s3Cli = new S3Client({
    region: 'eu-west-2',
    endpoint: process.env.DCS_S3_URL,
    maxAttempts: 4,
    forcePathStyle: isPathForced // needed with localstack.
});

function createS3Service(opts) {
    const {logger} = opts;
    delete opts.logger;

    async function uploadFile(data, bucketName, keyName, contentType, encrypt = true) {
        try {
            const formattedBody = contentType === 'application/json' ? JSON.stringify(data) : data;
            logger.info('Uploading to S3...');
            const params = {
                Bucket: bucketName,
                Key: keyName,
                Body: formattedBody,
                ContentType: contentType
            };

            if (encrypt) {
                params.SSEKMSKeyId = process.env.KMS_KEY_ID;
                params.ServerSideEncryption = 'aws:kms';
            }

            const response = await s3Cli.send(new PutObjectCommand(params));
            logger.info('Submitted to S3');
            return response;
        } catch (err) {
            const s3UploadError = new VError(
                {
                    name: 'S3UploadFailed'
                },
                `S3 upload failed: ${err}`
            );
            logger.error(s3UploadError);
            throw s3UploadError;
        }
    }

    return Object.freeze({
        uploadFile
    });
}

module.exports = createS3Service;
