'use strict';

const {createTemplateService} = require('./templates');

describe('createTemplateService', () => {
    it('should throw if no "latest: true" flag is set', () => {
        expect(() => {
            createTemplateService({
                templatesConfig: {
                    'template-foo': {
                        '1.0.0': {module: './fixtures/template-foo-v1.0.0.json'},
                        '1.2.0': {module: './fixtures/template-foo-v1.2.0.json'},
                        '1.3.4': {module: './fixtures/template-foo-v1.3.4.json'}
                    }
                }
            });
        }).toThrow(
            Error(
                'Exactly one version of template "template-foo" must have the flag "latest: true"'
            )
        );
    });

    it('should throw if the "latest: true" flag is set on multiple versions', () => {
        expect(() => {
            createTemplateService({
                templatesConfig: {
                    'template-foo': {
                        '1.0.0': {module: './fixtures/template-foo-v1.0.0.json'},
                        '1.2.0': {module: './fixtures/template-foo-v1.2.0.json', latest: true},
                        '1.3.4': {module: './fixtures/template-foo-v1.3.4.json', latest: true}
                    }
                }
            });
        }).toThrow(
            Error(
                'Exactly one version of template "template-foo" must have the flag "latest: true"'
            )
        );
    });

    it('should throw if any template module does not exist', () => {
        expect(() => {
            createTemplateService({
                templatesConfig: {
                    'template-foo': {
                        '1.0.0': {module: './fixtures/template-foo-v1.0.0.json'},
                        '1.2.0': {
                            module: './fixtures/template-foo-vdoes.not.exist.json',
                            latest: true
                        },
                        '1.3.4': {module: './fixtures/template-foo-v1.3.4.json'}
                    }
                }
            });
        }).toThrow('Cannot find module');
    });

    describe('getTemplateAsJson', () => {
        it('should return the latest version of a template if no version is specified', async () => {
            const templateService = createTemplateService({
                templatesConfig: {
                    'template-foo': {
                        '1.0.0': {module: './fixtures/template-foo-v1.0.0.json'},
                        '1.2.0': {module: './fixtures/template-foo-v1.2.0.json', latest: true},
                        '1.3.4': {module: './fixtures/template-foo-v1.3.4.json'}
                    }
                }
            });

            const templateAsJson = await templateService.getTemplateAsJson('template-foo');
            const template = JSON.parse(templateAsJson);

            expect(template.type).toEqual('template-foo');
            expect(template.version).toEqual('1.2.0');
        });

        it('should return a specific version of a template', async () => {
            const templateService = createTemplateService({
                templatesConfig: {
                    'template-foo': {
                        '1.0.0': {module: './fixtures/template-foo-v1.0.0.json'},
                        '1.2.0': {module: './fixtures/template-foo-v1.2.0.json', latest: true},
                        '1.3.4': {module: './fixtures/template-foo-v1.3.4.json'}
                    }
                }
            });

            const templateAsJson = await templateService.getTemplateAsJson('template-foo', '1.3.4');
            const template = JSON.parse(templateAsJson);

            expect(template.type).toEqual('template-foo');
            expect(template.version).toEqual('1.3.4');
        });

        it('should throw if the specified template name does not exist', async () => {
            const templateService = createTemplateService({
                templatesConfig: {
                    'template-foo': {
                        '1.0.0': {module: './fixtures/template-foo-v1.0.0.json'},
                        '1.2.0': {module: './fixtures/template-foo-v1.2.0.json', latest: true},
                        '1.3.4': {module: './fixtures/template-foo-v1.3.4.json'}
                    }
                }
            });

            await expect(
                templateService.getTemplateAsJson('template-does-not-exist')
            ).rejects.toThrow(Error('Template "template-does-not-exist" does not exist'));
        });

        it('should throw if the specified template version does not exist', async () => {
            const templateService = createTemplateService({
                templatesConfig: {
                    'template-foo': {
                        '1.0.0': {module: './fixtures/template-foo-v1.0.0.json'},
                        '1.2.0': {module: './fixtures/template-foo-v1.2.0.json', latest: true},
                        '1.3.4': {module: './fixtures/template-foo-v1.3.4.json'}
                    }
                }
            });

            await expect(
                templateService.getTemplateAsJson('template-foo', '9.0.0')
            ).rejects.toThrow(
                Error('Template version "9.0.0" not found for template "template-foo"')
            );
        });
    });
});
