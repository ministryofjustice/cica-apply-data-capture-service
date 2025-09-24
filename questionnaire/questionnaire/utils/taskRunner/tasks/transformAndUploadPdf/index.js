'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode');
const createS3Service = require('../../../../../../services/s3');
const createQuestionnaireHelper = require('../../../../questionnaire');

async function generateLetterBarcode(barcodeString) {
    // Generate QR Code
    const qrDataUrl = await QRCode.toDataURL(barcodeString);

    // Convert base64 to buffer
    const qrImage = qrDataUrl.replace(/^data:image\/png;base64,/, '');
    return Buffer.from(qrImage, 'base64');
}

async function makePDF(data, barcodeString, letterName) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`${letterName}.pdf`));

    // Write data
    Object.entries(data).forEach(([key, value]) => {
        doc.fontSize(14).text(`Q: ${key}`, {underline: true});
        doc.moveDown(0.5);
        doc.fontSize(12).text(`A: ${String(value)}`);
        doc.moveDown(1);
    });

    const imgBuffer = generateLetterBarcode(barcodeString);

    doc.addPage().image(imgBuffer, {
        fit: [250, 250],
        align: 'center',
        valign: 'center'
    });

    doc.end();
    return doc;
}

function crudeFlatten(input) {
    const output = {};

    Object.values(input).forEach(value => {
        if (value && typeof value === 'object' && Object.keys(value).length > 0) {
            Object.entries(value).forEach(([innerKey, innerValue]) => {
                output[innerKey] = innerValue;
            });
        }
        // else skip empty objects
    });

    return output;
}

async function transformAndUploadPdf({questionnaireDef, logger}) {
    // create question helper
    const questionnaire = createQuestionnaireHelper({
        questionnaireDefinition: questionnaireDef
    });

    const questionnaireId = questionnaire.getId();
    const answers = crudeFlatten(questionnaire.getAnswers());

    logger.info(`Transforming questionnaire with id: ${questionnaireId}`);
    const output = makePDF(
        answers,
        'I am a barcode string, populated at creation',
        questionnaireId
    );

    // Upload transformed JSON into S3
    logger.info(`Uploading to S3 for questionnaire with id: ${questionnaire.getId()}`);
    const s3Service = createS3Service({logger});
    const submissionResponse = await s3Service.uploadFile(
        output,
        process.env.CICA_TEST_BUCKET,
        `${questionnaireId}.pdf`,
        'application/pdf',
        false
    );
    return submissionResponse;
}

module.exports = {
    transformAndUploadPdf
};
