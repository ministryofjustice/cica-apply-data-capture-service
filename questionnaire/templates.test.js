/* eslint-disable global-require */

'use strict';

const fakeUuid = 'some-id';
let getTemplates;

beforeEach(() => {
    jest.resetModules();

    jest.doMock('q-templates-application', () => ({
        version: '12.3.3'
    }));

    jest.doMock('q-templates-application-v12', () => ({
        version: '12.0.0'
    }));

    getTemplates = require('./templates');
});

describe('Templates', () => {
    it('Should select a template', () => {
        const templateName = 'sexual-assault';
        const templateVersion = 'latest';
        const questionnaire = getTemplates(templateName, templateVersion)(fakeUuid);

        expect(questionnaire).toMatchObject({
            id: 'some-id',
            version: '12.3.3'
        });
    });

    it('Should select a template with the desired version', () => {
        const templateName = 'sexual-assault';
        const templateVersion = '12.0.0';
        const questionnaire = getTemplates(templateName, templateVersion)(fakeUuid);

        expect(questionnaire).toMatchObject({
            id: 'some-id',
            version: '12.0.0'
        });
    });

    it('Should select the latest template if no version is specified', () => {
        const templateName = 'sexual-assault';
        const templateVersion = undefined;
        const questionnaire = getTemplates(templateName, templateVersion)(fakeUuid);

        expect(questionnaire).toMatchObject({
            id: 'some-id',
            version: '12.3.3'
        });
    });

    it('Should error if the templateName is not available', () => {
        const templateName = 'not-a-template';
        const templateVersion = undefined;

        expect(() => {
            getTemplates(templateName, templateVersion)(fakeUuid);
        }).toThrow('Template "not-a-template" does not exist');
    });

    it('Should error if the templateVersion is not supported', () => {
        const templateName = 'sexual-assault';
        const templateVersion = '20.0.0';

        expect(() => {
            getTemplates(templateName, templateVersion)(fakeUuid);
        }).toThrow('Version "20.0.0" not found for template "sexual-assault"');
    });
});
