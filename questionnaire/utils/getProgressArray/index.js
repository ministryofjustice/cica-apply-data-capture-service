'use strict';

function getProgress(questionnaireDefinition) {
    if (
        questionnaireDefinition.routes?.type &&
        questionnaireDefinition.routes.type === 'parallel'
    ) {
        const progress = [];
        Object.keys(questionnaireDefinition.routes.states).forEach(task => {
            const taskApplicabilityStatus = `${task}__applicability-status`;
            if (
                questionnaireDefinition.routes.states[taskApplicabilityStatus]?.currentSectionId !==
                'notApplicable'
            ) {
                progress.push(...questionnaireDefinition.routes.states[task].progress);
            }
        });

        // Filter out unwanted states, e.g. "completed", "notApplicable", etc
        return progress.filter(sectionId => sectionId.startsWith('p-'));
    }

    return questionnaireDefinition.progress;
}

module.exports = getProgress;
