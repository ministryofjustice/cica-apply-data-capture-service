'use strict';

const createQuestionnaireDAL = require('../../../../../questionnaire-dal');

/**
 * @param {questionnaire} questionnaire - The raw questionnaire object
 * @returns boolean representing whether application is fatal
 */
function getIsFatal(questionnaire) {
    const {answers} = questionnaire;

    return answers['p-applicant-fatal-claim']?.['q-applicant-fatal-claim'];
}

/**
 * @param {questionnaire} questionnaire - The raw questionnaire object
 * @returns boolean representing whether application is a split fatal/funeral application
 */
function getIsSplit(questionnaire) {
    const {answers} = questionnaire;

    return (
        answers['p-applicant-funeral-costs-paid']?.['q-applicant-funeral-costs-paid'] &&
        !answers['p-applicant-claim-type']?.['q-applicant-claim-type']
    );
}

/**
 *
 * @param {string} caseReference generated caseReference
 * @param {date} dateSubmitted the date the questionnaire was submitted
 * @returns
 */
function updateCaseReferenceWithYear(caseReference, dateSubmitted) {
    const year = (dateSubmitted.getFullYear() % 100).toString();
    return `${year}\\${caseReference}`;
}

/**
 *
 * @param {string} caseReference
 * @param {questionnaire} questionnaire
 * @returns result of update
 */
async function setCaseReference(questionnaire, logger, db, section) {
    const systemSection = questionnaire.answers.system;
    let caseReference;
    const sectionLogger = logger.child({section});

    if (systemSection[section]) {
        sectionLogger.info(
            `Questionnaire with id ${questionnaire.id} already has ${section}. ${section} not updated`
        );
        return questionnaire;
    }

    sectionLogger.info('Generating case reference number for questionnaire');
    caseReference = await db.getReferenceNumber(getIsFatal(questionnaire), questionnaire.id);

    const dateSubmitted = await db.getQuestionnaireModifiedDate(questionnaire.id);
    sectionLogger.info('Adding year to section for questionnaire');
    caseReference = updateCaseReferenceWithYear(caseReference, dateSubmitted);

    sectionLogger.info('Updating questionnaire');
    questionnaire.answers.system[section] = caseReference;
    return questionnaire;
}

/**
 * Generates a reference number for the database
 * and updates the questionnaire object in the database.
 * @param {questionnaire} questionnaire - The raw questionnaire object
 * @returns result from update to the database.
 */
async function generateReferenceNumber({questionnaire, logger}) {
    const questionnaireId = questionnaire.id;
    const taskLogger = logger.child({questionnaireId});

    const db = createQuestionnaireDAL({logger: taskLogger});

    taskLogger.info('Starting case reference generation task for questionnaire with id');

    // Update application object with reference
    let updatedQuestionnaire = await setCaseReference(
        questionnaire,
        taskLogger,
        db,
        'case-reference'
    );

    // If split application then we need to generate a secondary reference number too
    if (getIsSplit(questionnaire)) {
        updatedQuestionnaire = await setCaseReference(
            updatedQuestionnaire,
            taskLogger,
            db,
            'secondary-reference'
        );
    }

    taskLogger.info('Updating questionnaire with id');
    const result = db.updateQuestionnaire(updatedQuestionnaire.id, updatedQuestionnaire);

    // return something
    return result;
}

module.exports = {
    getIsFatal,
    getIsSplit,
    updateCaseReferenceWithYear,
    generateReferenceNumber,
    setCaseReference
};
