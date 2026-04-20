'use strict';

const verifySupportedVersions = require('.');

describe('verifySupportedVersions', () => {
    const supported = {
        application: {
            '1.0.0': {module: 'q-templates-application-1_0_0'},
            '2.0.0': {module: 'q-templates-application-2_0_0'},
            '3.0.0': {module: 'q-templates-application', latest: true}
        },
        'other-template': {
            '1.2.3': {module: 'q-other-template-application-1_2_3'},
            '4.5.6': {module: 'q-other-template-application', latest: true}
        }
    };

    it('errors gracefully', () => {
        const actual = [{templateName: true, templateVersion: true}]; // invalid query result

        expect(() => {
            verifySupportedVersions(actual, null);
        }).toThrowError(/Failed to verify supported versions/);
    });

    it('returns empty array when all versions are supported', () => {
        const actual = [
            {templateName: 'application', templateVersion: '1.0.0'},
            {templateName: 'other-template', templateVersion: '1.2.3'}
        ];

        const result = verifySupportedVersions(actual, supported);
        expect(result).toEqual([]);
    });

    it('detects unsupported versions correctly', () => {
        const actual = [
            {templateName: 'application', templateVersion: '9.9.9'},
            {templateName: 'other-template', templateVersion: '1.2.3'}
        ];

        const result = verifySupportedVersions(actual, supported);
        expect(result).toEqual(['application@9.9.9']);
    });

    it('detects unsupported templates correctly', () => {
        const actual = [
            {templateName: 'a-deprecated-template', templateVersion: '1.0.0'},
            {templateName: 'other-template', templateVersion: '1.2.3'}
        ];

        const result = verifySupportedVersions(actual, supported);
        expect(result).toEqual(['a-deprecated-template@1.0.0']);
    });

    it('returns empty array when there are no templates in the database', () => {
        const actual = [];
        const result = verifySupportedVersions(actual, supported);
        expect(result).toEqual([]);
    });

    it('detects multiple unsupported versions across templates', () => {
        const actual = [
            {templateName: 'application', templateVersion: '1.0.0'},
            {templateName: 'application', templateVersion: '9.9.9'},
            {templateName: 'other-template', templateVersion: '4.5.6'},
            {templateName: 'other-template', templateVersion: '0.0.0'}
        ];

        const result = verifySupportedVersions(actual, supported);
        expect(result).toEqual(['application@9.9.9', 'other-template@0.0.0']);
    });
});
