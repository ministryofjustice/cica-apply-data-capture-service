'use strict';

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
});

const normaliseAnswers = require('.');

const answers = {
    unicodeNameA: '\u0041\u006d\u00e9\u006c\u0069\u0065',
    unicodeNameB: '\u0041\u006d\u0065\u0301\u006c\u0069\u0065',
    stringWithTabs:
        'This is a string which has newlines and bullet list which contain tabs:\n •\tOfficer in Charge: \tMr Officer Foo 123456\t\t\t•\tCourt and date sentenced:\tFoo Bar Crown Court. 13/02/2025.\t\t•\tOffences:\tSA with Mr Bar Baz\t\t\t•\tCrime Reference No (Unique Reference No.): CRN234545043543•\tDate offender first interviewed: 28/05/2021\t•\tDate i was interviewed:\t08/10/2021'
};

describe('normaliseAnswers', () => {
    describe('String normlisation', () => {
        it('Should normalise strings to have the same unicode representation', () => {
            const normalisedAnswers = normaliseAnswers(answers);
            expect(normalisedAnswers.unicodeNameA).toEqual(normalisedAnswers.unicodeNameB);
        });
    });

    describe('String sanitation', () => {
        it('Should remove tabs from a string', () => {
            const normalisedAnswers = normaliseAnswers(answers);
            expect(normalisedAnswers.stringWithTabs).not.toContain('\t');
        });
    });
});
