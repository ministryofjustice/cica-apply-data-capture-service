'use strict';

const applicationTemplate = require('q-templates-application');

const letterTemplates = require('q-templates-letters');

const applicationTemplateAsJson = JSON.stringify(applicationTemplate);

const tcqeTemplateAsJson = JSON.stringify(letterTemplates.tcqe);

function getApplicationTemplateCopy() {
    return JSON.parse(applicationTemplateAsJson);
}

function getTcqeTemplateCopy() {
    return JSON.parse(tcqeTemplateAsJson);
}

module.exports = {
    'sexual-assault': id => ({
        id,
        ...getApplicationTemplateCopy()
    }),
    tcqe: id => ({
        id,
        ...getTcqeTemplateCopy()
    })
};
