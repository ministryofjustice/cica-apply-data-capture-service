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

    it('returns empty array when all versions are supported', () => {
        const csv = `templateName,templateVersion
"application","1.0.0"
"other-template","1.2.3"
`;

        const result = verifySupportedVersions(csv, supported);
        expect(result).toEqual([]);
    });

    it('detects unsupported versions correctly', () => {
        const csv = `templateName,templateVersion
"application","9.9.9"
"other-template","1.2.3"
`;

        const result = verifySupportedVersions(csv, supported);
        expect(result).toEqual(['application@9.9.9']);
    });

    it('returns empty array for empty CSV', () => {
        const csv = ``;
        const result = verifySupportedVersions(csv, supported);
        expect(result).toEqual([]);
    });

    it('detects multiple unsupported versions across templates', () => {
        const csv = `templateName,templateVersion
"application","1.0.0"
"application","9.9.9"
"other-template","4.5.6"
"other-template","0.0.0"
`;

        const result = verifySupportedVersions(csv, supported);
        expect(result).toEqual(['application@9.9.9', 'other-template@0.0.0']);
    });
});
