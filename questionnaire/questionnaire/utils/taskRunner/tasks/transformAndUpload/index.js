'use strict';

const VError = require('verror');

const createS3Service = require('../../../../../../services/s3');
const createQuestionnaireDAL = require('../../../../../questionnaire-dal');
const createQuestionnaireHelper = require('../../../../questionnaire');

/**
 * Concatenate two arrays.
 * @param {Array} target - The array that will be concatenated to
 * @param {Array} source - The items to be added to the target array
 */
function mergeArrays(target, source) {
    const targetIsArray = Array.isArray(target);
    const sourceIsArray = Array.isArray(source);

    if (targetIsArray && sourceIsArray) {
        return target.concat(source);
    }

    throw new VError(
        `Target and Source must be arrays. Target type: "${
            targetIsArray ? 'array' : typeof target
        }". Source type: "${sourceIsArray ? 'array' : typeof source}"`
    );
}

/**
 * prependsLabel to the value label the question is an injury
 * @param {question} question
 * @returns
 */
function prependLabel(question) {
    if (question.id === 'q-applicant-physical-injuries') {
        const {label, valueLabel: valueLabels} = question;

        question.valueLabel = valueLabels.map(valueLabel => `${label} - ${valueLabel}`);
    }
    return question;
}

/**
 * If there are multiple answers against a single questionId, then these answers
 * are flattened into a single answer with value and valueLabel being concatenated arrays.
 * @param answers - The themed output produced by transformQuestionnaire
 */
function flattenAnswers(answers) {
    Object.values(answers).forEach(theme => {
        const values = [];

        theme.values.forEach(question => {
            const prependedQuestion = prependLabel(question);
            const existingQuestion = values.find(value => {
                return value.id === prependedQuestion.id;
            });

            if (existingQuestion) {
                existingQuestion.value = mergeArrays(
                    existingQuestion.value,
                    prependedQuestion.value
                );
                existingQuestion.valueLabel = mergeArrays(
                    existingQuestion.valueLabel,
                    prependedQuestion.valueLabel
                );
            } else {
                values.push(prependedQuestion);
            }
        });

        theme.values = values;
    });
}

/**
 * Parses the relevant declaration information from a questionnaire using its progress
 * and application type to determine which declaration has been answered.
 * @param {questionnaire} questionnaire - The raw questionnaire object
 * @returns a declaration object following the format of a standard question.
 */
function getDeclaration(questionnaire) {
    const progress = questionnaire.getProgress();
    const declarationSectionAndQuestionIds = {
        'p-applicant-declaration': 'q-applicant-declaration',
        'p-applicant-declaration-deceased': 'q-applicant-declaration',
        'p-mainapplicant-declaration-under-12': 'q-mainapplicant-declaration',
        'p-mainapplicant-declaration-under-12-deceased': 'q-mainapplicant-declaration',
        'p-mainapplicant-declaration-12-and-over': 'q-mainapplicant-declaration',
        'p-mainapplicant-declaration-12-and-over-deceased': 'q-mainapplicant-declaration',
        'p-rep-declaration-under-12': 'q-rep-declaration',
        'p-rep-declaration-under-12-deceased': 'q-rep-declaration',
        'p-rep-declaration-12-and-over': 'q-rep-declaration',
        'p-rep-declaration-12-and-over-deceased': 'q-rep-declaration'
    };
    const declarationSectionIds = Object.keys(declarationSectionAndQuestionIds);
    const declarationSectionId = progress.find(sectionId =>
        declarationSectionIds.includes(sectionId)
    );

    if (declarationSectionId !== undefined) {
        const section = questionnaire.getSection(declarationSectionId);
        const sectionSchema = section.getSchema();
        const sectionAnswers = questionnaire.getAnswers()[declarationSectionId];
        const questionId = declarationSectionAndQuestionIds[declarationSectionId];
        const descriptionId = questionId.replace('q-', '');
        const {description} = sectionSchema.allOf[0].properties[descriptionId];
        const value = sectionAnswers[questionId];
        const valueLabel = sectionSchema.allOf[1].properties[questionId].title;

        return {
            type: 'simple',
            id: declarationSectionId,
            label: description,
            value,
            valueLabel
        };
    }

    return undefined;
}

/**
 *
 * @param {*} answers
 * @returns
 */
function getOwner(ownerInfo) {
    const {'owner-id': ownerId, 'is-authenticated': isAuthenticated} = ownerInfo;
    return {ownerId, isAuthenticated};
}

/**
 * Transforms the questionnaire object into the necessary downstream format.
 * @param {questionnaire} questionnaire - The raw questionnaire object
 * @returns A themed object with attached metadata and declaration content.
 */
function transformQuestionnaire(questionnaire) {
    const section = questionnaire.getSection('p--check-your-answers');
    const sectionSchema = section.getSchema();
    const themeContent =
        sectionSchema.properties['p-check-your-answers'].properties.summaryInfo.summaryStructure;
    flattenAnswers(themeContent);

    const answers = questionnaire.getAnswers();
    const {maintenanceMode} = questionnaire.getMetaData();
    const transformedQuestionnaire = {
        meta: {
            caseReference: answers.system['case-reference'],
            funeralReference: answers.system['secondary-reference'],
            answers,
            maintenanceMode
        },
        themes: themeContent,
        declaration: getDeclaration(questionnaire)
    };

    if (answers.origin) {
        transformedQuestionnaire.meta.channel = answers.origin.channel;
    }

    if (answers.owner) {
        transformedQuestionnaire.meta.owner = getOwner(answers.owner);
    }

    return transformedQuestionnaire;
}

/**
 * Transforms the questionnaire object into the necessary downstream format
 * and uploads to S3 for downstream components to use.
 * @param {questionnaire} questionnaire - The raw questionnaire object
 * @returns JSON object from bucket with key matching given key
 */
async function transformAndUpload({questionnaireDef, logger}) {
    // create question helper
    const questionnaire = createQuestionnaireHelper({
        questionnaireDefinition: questionnaireDef
    });

    const [year, refNo] = questionnaire.getAnswers().system['case-reference'].split('\\');
    const s3Directory = `${year}-${refNo}`;
    logger.info(`Transforming questionnaire with id: ${questionnaire.getId()}`);
    const output = transformQuestionnaire(questionnaire);

    // Populate the dateSubmitted from the database
    const db = createQuestionnaireDAL({logger});
    output.meta.submittedDate = await db.getQuestionnaireModifiedDate(questionnaire.getId());

    // Upload transformed JSON into S3
    logger.info(
        `Uploading to S3 for questionnaire with id: ${questionnaire.getId()} to folder ${s3Directory}`
    );
    const s3Service = createS3Service({logger});
    const submissionResponse = await s3Service.uploadFile(
        output,
        process.env.S3_BUCKET_NAME,
        `${s3Directory}/${questionnaire.getId()}.json`,
        'application/json'
    );
    return submissionResponse;
}

module.exports = {
    transformAndUpload,
    transformQuestionnaire,
    mergeArrays,
    getDeclaration
};
