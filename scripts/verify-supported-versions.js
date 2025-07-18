'use strict';

const fs = require('fs');
const path = require('path');
const verifySupportedVersions = require('./compare-versions');
const supported = require('../supported_template_versions.json');

const CSV_FILE = path.resolve(__dirname, '../template-versions.csv');
const DUMMY_FIXTURE = path.resolve(__dirname, './fixtures/dummy-template-versions.csv');

function main() {
    const useFixture = process.argv.includes('--use-fixture');

    let csvContent;

    if (useFixture) {
        if (!fs.existsSync(DUMMY_FIXTURE)) {
            console.error(`Dummy fixture file not found at ${DUMMY_FIXTURE}`);
            process.exit(1);
        }
        console.log('Using dummy fixture CSV');
        csvContent = fs.readFileSync(DUMMY_FIXTURE, 'utf-8');
    } else {
        if (!fs.existsSync(CSV_FILE)) {
            console.error(`.template-versions.csv not found at ${CSV_FILE}`);
            process.exit(1);
        }
        csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
    }

    const unsupported = verifySupportedVersions(csvContent, supported);

    if (unsupported.length > 0) {
        console.error('Unsupported template versions found in DB:');
        unsupported.forEach(v => console.error(`- ${v}`));
        process.exit(1);
    }

    if (csvContent.trim().length === 0) {
        console.warn('CSV was empty, no templates found.');
        return;
    }

    console.log('All template versions in DB are supported.');
}

main();
