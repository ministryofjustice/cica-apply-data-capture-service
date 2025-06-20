'use strict';

const fs = require('fs');
const {execSync} = require('child_process');

jest.mock('fs');
jest.mock('child_process');
jest.mock('module', () => {
    return {
        createRequire: jest.fn(() => {
            return () => ({
                type: 'loaded-requested'
            });
        })
    };
});
jest.mock('q-templates-application', () => ({
    type: 'loaded-latest'
}));

fs.existsSync.mockImplementation(() => true);
fs.mkdirSync.mockImplementation(() => {});
execSync.mockImplementation(() => {});

jest.doMock('../supported-templates.js', () => ({
    'sexual-assault': {
        moduleName: 'q-templates-application',
        moduleUrl: 'github:CriminalInjuriesCompensationAuthority/q-templates-application',
        supportedVersions: ['12.3.9', '12.0.0', '11.0.0']
    }
}));

const getTemplate = require('./templates');

const testId = '123ImAnId';

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
});

describe('Templates.js', () => {
    it('should use installed template when no version is specified', () => {
        const questionnaire = getTemplate('sexual-assault')(testId);

        expect(questionnaire).toMatchObject({
            id: '123ImAnId',
            type: 'loaded-latest'
        });
    });

    it('should dynamically load a specific version', () => {
        const questionnaire = getTemplate('sexual-assault', '12.0.0')(testId);

        expect(questionnaire).toMatchObject({
            id: '123ImAnId',
            type: 'loaded-requested'
        });
    });

    it('should throw if template name is unknown', () => {
        expect(() => {
            getTemplate('non-existent-template')(testId);
        }).toThrow('Template "non-existent-template" does not exist');
    });

    it('should throw if version is unsupported', () => {
        expect(() => {
            getTemplate('sexual-assault', '99.9.9')(testId);
        }).toThrow('Version "99.9.9" not supported for template "sexual-assault"');
    });
});
