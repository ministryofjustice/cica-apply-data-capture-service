'use strict';

function normaliseAnswers(answers) {
    const normalisedAnswers = answers;
    Object.entries(answers).forEach(answer => {
        const [key, value] = answer;
        let updatedValue = value;

        if (typeof value === 'string') {
            updatedValue = value.normalize('NFC');

            // this is to avoid an issue with PDFKit. PDFKit is used in
            // the application service to generate the case PDF.
            // https://github.com/foliojs/pdfkit/issues/617
            // https://github.com/foliojs/pdfkit/issues/263
            updatedValue = updatedValue.replaceAll('\t', ' ');
        }
        normalisedAnswers[key] = updatedValue;
    });

    return normalisedAnswers;
}

module.exports = normaliseAnswers;
