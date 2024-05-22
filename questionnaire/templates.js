'use strict';

const applicationTemplate = require('q-templates-application');

const tcqeTemplate = require('q-templates-tcqe');

const applicationTemplateAsJson = JSON.stringify(applicationTemplate);

const tcqeTemplateAsJson = JSON.stringify(tcqeTemplate);

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
