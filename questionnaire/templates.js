'use strict';

module.exports = {
    'sexual-assault': id => ({
        id,
        type: 'minors-apply-for-compensation',
        version: '0.1.0',
        sections: {
            'p-applicant-declaration': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Declaration',
                additionalProperties: false,
                properties: {
                    'applicant-declaration': {
                        description:
                            '\n                <p class="govuk-body">By continuing you confirm that the information you will give is true as far as you know.</p>\n                {{ govukWarningText({\n                    text: "If you deliberately give false or misleading information, you may get less compensation or be prosecuted.",\n                    iconFallbackText: "Warning"\n                }) }}\n            '
                    }
                }
            },
            'p-applicant-british-citizen-or-eu-national': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-british-citizen-or-eu-national'],
                additionalProperties: false,
                properties: {
                    'q-applicant-british-citizen-or-eu-national': {
                        type: 'boolean',
                        title: 'Are you a British citizen or EU national?'
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-british-citizen-or-eu-national':
                            'Select yes if you are a British citizen or EU national'
                    }
                }
            },
            'p-applicant-are-you-18-or-over': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-are-you-18-or-over'],
                additionalProperties: false,
                properties: {
                    'q-applicant-are-you-18-or-over': {
                        type: 'boolean',
                        title: 'Are you 18 or over?'
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-are-you-18-or-over': 'Select yes if you are 18 or over'
                    }
                }
            },
            'p-applicant-who-are-you-applying-for': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-who-are-you-applying-for'],
                additionalProperties: false,
                properties: {
                    'q-applicant-who-are-you-applying-for': {
                        title: 'Who are you applying for?',
                        type: 'string',
                        oneOf: [
                            {
                                title: 'Myself',
                                const: 'myself'
                            },
                            {
                                title: 'Someone else',
                                const: 'someone-else'
                            }
                        ]
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-who-are-you-applying-for':
                            'Select myself if you are applying for yourself'
                    }
                }
            },
            'p-applicant-were-you-a-victim-of-sexual-assault-or-abuse': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-were-you-a-victim-of-sexual-assault-or-abuse'],
                additionalProperties: false,
                properties: {
                    'q-applicant-were-you-a-victim-of-sexual-assault-or-abuse': {
                        type: 'boolean',
                        title: 'Is your claim about sexual assault or abuse?'
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-were-you-a-victim-of-sexual-assault-or-abuse':
                            'Select yes if you were a victim of sexual assault or abuse'
                    }
                }
            },
            'p--before-you-continue': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'Before you continue',
                type: 'object',
                additionalProperties: false,
                properties: {
                    'applicant-impact-on-you': {
                        description:
                            '\n                <p class="govuk-body">On the next page we will ask you to select an option based on how the crime affected you.</p>\n                <p class="govuk-body">We appreciate that this may be difficult for you.</p>\n                <h2 class="govuk-heading-m">If you need help or support</h2>\n                <p class="govuk-body">You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                <p class="govuk-body">Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\n                <p class="govuk-body">You can get practical or emotional support depending on where you live:</p>\n                <ul class="govuk-list govuk-list--bullet">\n                   <li>in England and Wales <a href="https://www.victimandwitnessinformation.org.uk/">visit the Victim and Witness Information website</a></li>\n                   <li>in Scotland <a href="https://www.mygov.scot/victim-witness-support/">visit the mygov.scot website</a></li>\n                </ul>\n            '
                    }
                }
            },
            'p-applicant-select-option': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Select the option that applies to you',
                required: ['q-applicant-option'],
                additionalProperties: false,
                properties: {
                    'applicant-your-choices': {
                        description:
                            '\n                <p class="govuk-body-l">We decide what enquiries to make depending on how the crime affected you.</p>\n                <h2 class="govuk-heading-m">Option 1: Sexual assault or abuse</h2>\n                <p class="govuk-body">Any compensation we pay acknowledges the emotional distress the crime caused you.</p>\n                <p class="govuk-body">We normally make a decision based on your application and the information we get from the police.</p>\n                <p class="govuk-body">We will usually make a decision within 4 months. This is because we do not normally need to see your medical records.</p>\n                <h2 class="govuk-heading-m">Option 2: Sexual assault or abuse and other injuries or losses</h2>\n                <p class="govuk-body">We can also pay compensation for:\n                <ul class="govuk-list govuk-list--bullet">\n                <li>lost earnings because you were unable to work</li>\n                <li>physical injuries</li>\n                <li>pregnancy, sexually transmitted disease, or loss of foetus</li>\n                <li><a href="https://www.gov.uk/guidance/criminal-injuries-compensation-a-guide#special-expenses">some extra costs</a> you\'ve had due to your injuries</li>\n                <li>disabling mental injuries that are additional to the emotional distress you\'ve already suffered</li>\n                </ul>\n                </p>\n                {{ govukDetails({\n                    summaryText: "What is a disabling mental injury?",\n                    text: "A disabling mental injury has a substantial adverse effect on your ability to carry out normal day-to-day activities. For example, reduced performance at school or work, or effects on your social or sexual relationships."\n                }) }}\n                <p class="govuk-body">We may ask a psychiatrist or clinical psychologist to confirm that you have a disabling mental injury if you do not already have a diagnosis.</p>\n                <p class="govuk-body">We will usually make a decision within 12 months. This is because we may need to examine your medical records, get medical reports and assess any losses.</p>\n                {{ govukDetails({\n                summaryText: "If you need help or support",\n                html: \'\n                    <p class="govuk-body">You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                    <p class="govuk-body">Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\n                    <p class="govuk-body">You can get practical or emotional support depending on where you live:</p>\n                    <ul class="govuk-list govuk-list--bullet">\n                       <li>in England and Wales <a href="https://www.victimandwitnessinformation.org.uk/">visit the Victim and Witness Information website</a></li>\n                       <li>in Scotland <a href="https://www.mygov.scot/victim-witness-support/">visit the mygov.scot website</a></li>\n                    </ul>\n                \'\n                }) }}\n            '
                    },
                    'q-applicant-option': {
                        title: 'Select the option that applies to you',
                        type: 'string',
                        oneOf: [
                            {
                                title: 'Option 1: Sexual assault or abuse',
                                const: 'option-1:-sexual-assault-or-abuse'
                            },
                            {
                                title:
                                    'Option 2: Sexual assault or abuse and other injuries or losses',
                                const:
                                    'option-2:-sexual-assault-or-abuse-and-other-injuries-or-losses'
                            }
                        ]
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-option': 'Select either Option 1 or Option 2'
                    }
                }
            },
            'p--was-the-crime-reported-to-police': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q--was-the-crime-reported-to-police'],
                additionalProperties: false,
                properties: {
                    'q--was-the-crime-reported-to-police': {
                        type: 'boolean',
                        title: 'Was the crime reported to the police?'
                    },
                    'dont-know-if-crime-reported': {
                        description:
                            '\n                {{ govukDetails({\n                summaryText: "I do not know if the crime was reported to the police",\n                html: \'<p>You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                        <p>Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\'\n                }) }}\n            '
                    }
                },
                errorMessage: {
                    required: {
                        'q--was-the-crime-reported-to-police':
                            'Select yes if the crime was reported to the police'
                    }
                }
            },
            'p--when-was-the-crime-reported-to-police': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q--when-was-the-crime-reported-to-police'],
                additionalProperties: false,
                properties: {
                    'q--when-was-the-crime-reported-to-police': {
                        type: 'string',
                        format: 'date-time',
                        title: 'When was the crime reported to the police?',
                        description: 'For example, 31 3 2018. You can enter an approximate date.',
                        errorMessage: {
                            format:
                                'Enter the date the crime was reported to police and include a day, month and year'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q--when-was-the-crime-reported-to-police':
                            'Enter the date the crime was reported to the police'
                    }
                }
            },
            'p--whats-the-crime-reference-number': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q--whats-the-crime-reference-number'],
                additionalProperties: false,
                properties: {
                    'q--whats-the-crime-reference-number': {
                        title: "What's the crime reference number?",
                        type: 'string',
                        description:
                            'This is the reference number the police gave the crime when it was reported.',
                        maxLength: 30,
                        errorMessage: {
                            maxLength: 'Crime reference number must be 30 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q--whats-the-crime-reference-number': 'Enter the crime reference number'
                    }
                }
            },
            'p-applicant-did-the-crime-happen-once-or-over-time': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-did-the-crime-happen-once-or-over-time'],
                additionalProperties: false,
                properties: {
                    'q-applicant-did-the-crime-happen-once-or-over-time': {
                        title: 'Did the crime happen once or over a period of time?',
                        type: 'string',
                        oneOf: [
                            {
                                title: 'Once',
                                const: 'once'
                            },
                            {
                                title: 'Over a period of time',
                                const: 'over-a-period-of-time'
                            }
                        ]
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-did-the-crime-happen-once-or-over-time':
                            'Select Once or Over a period of time'
                    }
                }
            },
            'p-applicant-when-did-the-crime-happen': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-when-did-the-crime-happen'],
                additionalProperties: false,
                properties: {
                    'q-applicant-when-did-the-crime-happen': {
                        type: 'string',
                        format: 'date-time',
                        title: 'When did the crime happen?',
                        description: 'For example, 31 3 2018. You can enter an approximate date.',
                        errorMessage: {
                            format:
                                'Enter the date the crime happened and include a day, month and year'
                        }
                    },
                    'when-did-the-crime-happen': {
                        description:
                            '\n                {{ govukDetails({\n                    summaryText: "I do not know when the crime happened",\n                    html: \'<p>You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                            <p>Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\'\n                }) }}\n            '
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-when-did-the-crime-happen':
                            'Enter the date the crime happened and include a day, month and year'
                    }
                }
            },
            'p-applicant-when-did-the-crime-start': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-when-did-the-crime-start'],
                additionalProperties: false,
                properties: {
                    'q-applicant-when-did-the-crime-start': {
                        type: 'string',
                        format: 'date-time',
                        title: 'When did it start?',
                        description: 'For example, 03 2018. You can enter an approximate date.',
                        errorMessage: {
                            format: 'Enter the date the crime started and include a month and year'
                        }
                    },
                    'i-dont-know-when-the-crime-started': {
                        description:
                            '\n                {% from "components/details/macro.njk" import govukDetails %}\n                {{ govukDetails({\n                    summaryText: "I do not know when the crime started",\n                    html: \'<p>You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                            <p>Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\'\n                }) }}\n            '
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-when-did-the-crime-start':
                            'Enter the date the crime started and include a month and year'
                    }
                }
            },
            'p-applicant-when-did-the-crime-stop': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-when-did-the-crime-stop'],
                additionalProperties: false,
                properties: {
                    'q-applicant-when-did-the-crime-stop': {
                        type: 'string',
                        format: 'date-time',
                        title: 'When did it stop?',
                        description: 'For example, 03 2018. You can enter an approximate date.',
                        errorMessage: {
                            format: 'Enter the date the crime stopped and include a month and year'
                        }
                    },
                    'i-dont-know-when-the-crime-stopped': {
                        description:
                            '\n                {% from "components/details/macro.njk" import govukDetails %}\n                {{ govukDetails({\n                    summaryText: "I do not know when the crime stopped",\n                    html: \'<p>You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                            <p>Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\'\n                }) }}\n            '
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-when-did-the-crime-stop':
                            'Enter the date the crime stopped and include a month and year'
                    }
                }
            },
            'p-applicant-select-reasons-for-the-delay-in-making-your-application': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: [
                    'q-applicant-explain-reason-for-delay-application',
                    'q-applicant-select-reasons-for-the-delay-in-making-your-application'
                ],
                additionalProperties: false,
                properties: {
                    'q-applicant-select-reasons-for-the-delay-in-making-your-application': {
                        title: 'Select reasons for the delay in making your application',
                        type: 'array',
                        maxItems: 4,
                        uniqueItems: true,
                        description: 'Select all options that apply to you.',
                        items: {
                            anyOf: [
                                {
                                    title: 'I was under 18',
                                    const: 'i-was-underage'
                                },
                                {
                                    title: 'I was advised to wait',
                                    const: 'i-was-advised-to-wait'
                                },
                                {
                                    title: 'Medical reasons',
                                    const: 'medical-reasons'
                                },
                                {
                                    title: 'Other reasons',
                                    const: 'other-reasons'
                                }
                            ]
                        }
                    },
                    'q-applicant-explain-reason-for-delay-application': {
                        title: 'Briefly explain these reasons',
                        type: 'string',
                        maxLength: 500,
                        errorMessage: {
                            maxLength: 'Explanation must be 500 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-select-reasons-for-the-delay-in-making-your-application':
                            'Select if you were under 18, advised to wait, medical reasons or other reasons',
                        'q-applicant-explain-reason-for-delay-application':
                            'Explain the reasons for the delay in making your application'
                    }
                }
            },
            'p-applicant-where-did-the-crime-happen': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-where-did-the-crime-happen'],
                additionalProperties: false,
                properties: {
                    'q-applicant-where-did-the-crime-happen': {
                        title: 'Where did the crime happen?',
                        type: 'string',
                        oneOf: [
                            {
                                title: 'England',
                                const: 'england'
                            },
                            {
                                title: 'Scotland',
                                const: 'scotland'
                            },
                            {
                                title: 'Wales',
                                const: 'wales'
                            },
                            {
                                title: 'Somewhere else',
                                const: 'somewhere-else'
                            }
                        ]
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-where-did-the-crime-happen':
                            'Select England, Scotland, Wales or Somewhere else'
                    }
                }
            },
            'p-applicant-where-in-england-did-it-happen': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Where in England did it happen?',
                required: ['q-applicant-english-town-or-city', 'q-applicant-english-location'],
                additionalProperties: false,
                properties: {
                    'q-applicant-english-town-or-city': {
                        type: 'string',
                        title: 'Town or city',
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'Town or city must be 60 characters or less'
                        }
                    },
                    'q-applicant-english-location': {
                        type: 'string',
                        title: 'Location',
                        description:
                            'For example, the name of a street, business, building or nearby local landmark. You can enter more than one.',
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'Location must be 60 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-english-location':
                            'Enter the name of a street, business, building or nearby local landmark',
                        'q-applicant-english-town-or-city':
                            'Enter the town or city where the crime happened'
                    }
                }
            },
            'p-applicant-where-in-scotland-did-it-happen': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Where in Scotland did it happen?',
                required: ['q-applicant-scottish-town-or-city', 'q-applicant-scottish-location'],
                additionalProperties: false,
                properties: {
                    'q-applicant-scottish-town-or-city': {
                        type: 'string',
                        title: 'Town or city',
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'Town or city must be 60 characters or less'
                        }
                    },
                    'q-applicant-scottish-location': {
                        type: 'string',
                        title: 'Location',
                        description:
                            'For example, the name of a street, business, building or nearby local landmark. You can enter more than one.',
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'Location must be 60 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-scottish-location':
                            'Enter the name of a street, business, building or nearby local landmark',
                        'q-applicant-scottish-town-or-city':
                            'Enter the town or city where the crime happened'
                    }
                }
            },
            'p-applicant-where-in-wales-did-it-happen': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Where in Wales did it happen?',
                required: ['q-applicant-welsh-town-or-city', 'q-applicant-welsh-location'],
                additionalProperties: false,
                properties: {
                    'q-applicant-welsh-town-or-city': {
                        type: 'string',
                        title: 'Town or city',
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'Town or city must be 60 characters or less'
                        }
                    },
                    'q-applicant-welsh-location': {
                        type: 'string',
                        title: 'Location',
                        description:
                            'For example, the name of a street, business, building or nearby local landmark. You can enter more than one.',
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'Location must be 60 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-welsh-location':
                            'Enter the name of a street, business, building or nearby local landmark',
                        'q-applicant-welsh-town-or-city':
                            'Enter the town or city where the crime happened'
                    }
                }
            },
            'p--you-need-to-contact-us': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'You need to contact us',
                type: 'object',
                additionalProperties: false,
                properties: {
                    'you-need-to-ccontact-us': {
                        description:
                            '\n                <p class="govuk-body">We need to check if you are eligible for compensation.</p>\n                <p class="govuk-body">Call us on 0300 003 3601. Select option 8.</p>\n                <p class="govuk-body">Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\n            '
                    }
                }
            },
            'p-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: [
                    'q-applicant-explain-reason-for-delay-reporting',
                    'q-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police'
                ],
                additionalProperties: false,
                properties: {
                    'q-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police': {
                        title: 'Select reasons for the delay in reporting the crime to the police',
                        type: 'array',
                        maxItems: 3,
                        uniqueItems: true,
                        description: 'Select all options that apply to you.',
                        items: {
                            anyOf: [
                                {
                                    title: 'I was under 18',
                                    const: 'i-was-under-18'
                                },
                                {
                                    title: 'Unable to report the crime',
                                    const: 'unable-to-report-crime'
                                },
                                {
                                    title: 'Other reasons',
                                    const: 'other'
                                }
                            ]
                        }
                    },
                    'q-applicant-explain-reason-for-delay-reporting': {
                        title: 'Briefly explain these reasons',
                        type: 'string',
                        maxLength: 500,
                        errorMessage: {
                            maxLength: 'Explanation must be 500 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police':
                            'Select if you were under 18, unable to report the crime or other reasons',
                        'q-applicant-explain-reason-for-delay-reporting':
                            'Explain the reasons for the delay in reporting the crime to the police'
                    }
                }
            },
            'p-offender-do-you-know-the-name-of-the-offender': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-offender-do-you-know-the-name-of-the-offender'],
                additionalProperties: false,
                properties: {
                    'q-offender-do-you-know-the-name-of-the-offender': {
                        type: 'boolean',
                        title: 'Do you know the name of the offender?'
                    }
                },
                errorMessage: {
                    required: {
                        'q-offender-do-you-know-the-name-of-the-offender':
                            "Select yes if you know the offender's name"
                    }
                }
            },
            'p-offender-enter-offenders-name': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Enter their name',
                required: ['q-offender-enter-offenders-name'],
                additionalProperties: false,
                properties: {
                    'q-offender-enter-offenders-name': {
                        type: 'string',
                        title: "Offender's name",
                        description: 'We will never contact the offender.',
                        maxLength: 120,
                        errorMessage: {
                            maxLength: "Offender's name must be 120 characters or less"
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-offender-enter-offenders-name': "Enter the offender's name"
                    }
                }
            },
            'p-offender-contact': {
                type: 'object',
                properties: {
                    'q-offender-describe-contact-with-offender': {
                        type: 'string',
                        title: 'If you have contact with the offender, describe it below',
                        description:
                            'We will not pay compensation if the offender may benefit from it.',
                        maxLength: 500,
                        errorMessage: {
                            maxLength: 'Description must be 500 characters or less'
                        }
                    },
                    'q-offender-i-have-no-contact-with-offender': {
                        type: 'array',
                        maxItems: 1,
                        uniqueItems: true,
                        items: {
                            anyOf: [
                                {
                                    title: 'I have no contact with the offender',
                                    const: 'i-have-no-contact-with-the-offender'
                                }
                            ]
                        }
                    }
                },
                allOf: [
                    {
                        $ref:
                            '#/definitions/if-not-checked-then-q-offender-contact-description-is-required'
                    }
                ],
                definitions: {
                    'if-not-checked-then-q-offender-contact-description-is-required': {
                        if: {
                            not: {
                                required: ['q-offender-i-have-no-contact-with-offender']
                            }
                        },
                        then: {
                            required: ['q-offender-describe-contact-with-offender'],
                            errorMessage: {
                                required: {
                                    'q-offender-describe-contact-with-offender':
                                        'Enter details of contact with the assailant or select if you have no contact'
                                }
                            }
                        }
                    }
                }
            },
            'p-applicant-previous-application': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                propertyNames: {
                    enum: [
                        'q-applicant-have-you-applied-to-us-before',
                        'q-enter-your-previous-reference-number'
                    ]
                },
                properties: {
                    'q-applicant-have-you-applied-to-us-before': {
                        title: 'Is this the first claim for this incident?',
                        type: 'boolean'
                    },
                    'q-enter-your-previous-reference-number': {
                        type: 'string',
                        title: 'Enter your previous reference number if you know it (optional)',
                        maxLength: 50,
                        errorMessage: {
                            maxLength: 'Previous reference number must be 50 characters or less'
                        }
                    }
                },
                required: ['q-applicant-have-you-applied-to-us-before'],
                allOf: [
                    {
                        $ref:
                            '#/definitions/if-false-then-q-enter-your-previous-reference-number-is-required'
                    }
                ],
                definitions: {
                    'if-false-then-q-enter-your-previous-reference-number-is-required': {
                        if: {
                            properties: {
                                'q-applicant-have-you-applied-to-us-before': {
                                    const: false
                                }
                            }
                        },
                        then: {
                            propertyNames: {
                                enum: [
                                    'q-applicant-have-you-applied-to-us-before',
                                    'q-enter-your-previous-reference-number'
                                ]
                            }
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-have-you-applied-to-us-before':
                            'Select no if you have applied to us before'
                    }
                }
            },
            'p-applicant-other-compensation': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                propertyNames: {
                    enum: [
                        'q-applicant-have-you-applied-for-or-received-any-other-compensation',
                        'q-applicant-applied-for-other-compensation-briefly-explain-why-not'
                    ]
                },
                properties: {
                    'q-applicant-have-you-applied-for-or-received-any-other-compensation': {
                        title: 'Have you applied for or received any other form of compensation?',
                        description:
                            'For example, if you sought civil damages, or a court decided you should get compensation.',
                        type: 'boolean'
                    },
                    'q-applicant-applied-for-other-compensation-briefly-explain-why-not': {
                        type: 'string',
                        title: 'Briefly explain why not.',
                        maxLength: 499
                    }
                },
                required: ['q-applicant-have-you-applied-for-or-received-any-other-compensation'],
                allOf: [
                    {
                        $ref:
                            '#/definitions/if-false-then-q-applicant-applied-for-other-compensation-briefly-explain-why-not-is-required'
                    }
                ],
                definitions: {
                    'if-false-then-q-applicant-applied-for-other-compensation-briefly-explain-why-not-is-required': {
                        if: {
                            properties: {
                                'q-applicant-have-you-applied-for-or-received-any-other-compensation': {
                                    const: false
                                }
                            },
                            required: [
                                'q-applicant-have-you-applied-for-or-received-any-other-compensation'
                            ]
                        },
                        then: {
                            required: [
                                'q-applicant-applied-for-other-compensation-briefly-explain-why-not'
                            ],
                            propertyNames: {
                                enum: [
                                    'q-applicant-have-you-applied-for-or-received-any-other-compensation',
                                    'q-applicant-applied-for-other-compensation-briefly-explain-why-not'
                                ]
                            },
                            properties: {
                                'q-applicant-applied-for-other-compensation-briefly-explain-why-not': {
                                    errorMessage: {
                                        maxLength: 'Explanation must be 500 characters or less'
                                    }
                                }
                            },
                            errorMessage: {
                                required: {
                                    'q-applicant-applied-for-other-compensation-briefly-explain-why-not':
                                        'Explain why you did not apply for or receive any other form of compensation'
                                }
                            }
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-have-you-applied-for-or-received-any-other-compensation':
                            'Select yes if you have applied for or received another form of compensation'
                    }
                }
            },
            'p-applicant-other-compensation-details': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Other compensation',
                propertyNames: {
                    enum: [
                        'q-applicant-who-did-you-apply-to',
                        'q-applicant-has-a-decision-been-made',
                        'q-how-much-was-award',
                        'q-when-will-you-find-out'
                    ]
                },
                properties: {
                    'q-applicant-who-did-you-apply-to': {
                        type: 'string',
                        title: 'Who have you applied to or received compensation from?',
                        maxLength: 50,
                        errorMessage: {
                            maxLength:
                                'Who you applied to or received compensation from must be 50 characters or less'
                        }
                    },
                    'q-applicant-has-a-decision-been-made': {
                        title: 'Have they made a decision?',
                        type: 'boolean'
                    },
                    'q-how-much-was-award': {
                        type: 'string',
                        title: 'How much was the award?',
                        maxLength: 50,
                        errorMessage: {
                            maxLength: 'Award amount must be 50 characters or less'
                        }
                    },
                    'q-when-will-you-find-out': {
                        type: 'string',
                        title: 'When will you find out?',
                        description:
                            'Enter an approximate date, for example, December 2019. If you do not know you can say so.',
                        maxLength: 50,
                        errorMessage: {
                            maxLength: 'When will you find out must be 50 characters or less'
                        }
                    }
                },
                required: [
                    'q-applicant-who-did-you-apply-to',
                    'q-applicant-has-a-decision-been-made'
                ],
                allOf: [
                    {
                        $ref: '#/definitions/if-false-then-q-when-will-you-find-out-is-required'
                    },
                    {
                        $ref: '#/definitions/if-true-then-q-how-much-was-award-is-required'
                    }
                ],
                definitions: {
                    'if-false-then-q-when-will-you-find-out-is-required': {
                        if: {
                            properties: {
                                'q-applicant-has-a-decision-been-made': {
                                    const: false
                                }
                            },
                            required: ['q-applicant-has-a-decision-been-made']
                        },
                        then: {
                            required: ['q-when-will-you-find-out'],
                            propertyNames: {
                                enum: [
                                    'q-applicant-who-did-you-apply-to',
                                    'q-applicant-has-a-decision-been-made',
                                    'q-when-will-you-find-out'
                                ]
                            },
                            errorMessage: {
                                required: {
                                    'q-when-will-you-find-out': 'Enter an approximate date'
                                }
                            }
                        }
                    },
                    'if-true-then-q-how-much-was-award-is-required': {
                        if: {
                            properties: {
                                'q-applicant-has-a-decision-been-made': {
                                    const: true
                                }
                            },
                            required: ['q-applicant-has-a-decision-been-made']
                        },
                        then: {
                            required: ['q-how-much-was-award'],
                            propertyNames: {
                                enum: [
                                    'q-applicant-who-did-you-apply-to',
                                    'q-applicant-has-a-decision-been-made',
                                    'q-how-much-was-award'
                                ]
                            },
                            errorMessage: {
                                required: {
                                    'q-how-much-was-award': 'Enter an amount'
                                }
                            }
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-who-did-you-apply-to':
                            'Enter who you applied to or received compensation from',
                        'q-applicant-has-a-decision-been-made':
                            'Select yes if you have received a decision about the other compensation claim'
                    }
                }
            },
            'p-applicant-name': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'Enter your name',
                type: 'object',
                required: ['q-applicant-title', 'q-applicant-first-name', 'q-applicant-last-name'],
                additionalProperties: false,
                properties: {
                    'q-applicant-title': {
                        title: 'Title',
                        type: 'string',
                        maxLength: 6,
                        errorMessage: {
                            maxLength: 'Title must be 6 characters or less'
                        }
                    },
                    'q-applicant-first-name': {
                        title: 'First name',
                        type: 'string',
                        maxLength: 70,
                        errorMessage: {
                            maxLength: 'First name must be 70 characters or less'
                        }
                    },
                    'q-applicant-last-name': {
                        title: 'Last name',
                        type: 'string',
                        maxLength: 70,
                        errorMessage: {
                            maxLength: 'Last name must be 70 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-title': 'Enter your title',
                        'q-applicant-first-name': 'Enter your first name',
                        'q-applicant-last-name': 'Enter your last name'
                    }
                }
            },
            'p-applicant-have-you-been-known-by-any-other-names': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-have-you-been-known-by-any-other-names'],
                additionalProperties: false,
                properties: {
                    'q-applicant-have-you-been-known-by-any-other-names': {
                        type: 'boolean',
                        title: 'Have you ever been known by any other names?'
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-have-you-been-known-by-any-other-names':
                            'Select yes if you have been known by any other names'
                    }
                }
            },
            'p-applicant-other-names': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-what-other-names-have-you-used'],
                additionalProperties: false,
                properties: {
                    'q-applicant-what-other-names-have-you-used': {
                        type: 'string',
                        title: 'What other names have you used?',
                        maxLength: 50,
                        errorMessage: {
                            maxLength: 'Other names you have used must be 50 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-what-other-names-have-you-used':
                            'Enter the other names you have used'
                    }
                }
            },
            'p-applicant-date-of-birth': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-enter-your-date-of-birth'],
                additionalProperties: false,
                properties: {
                    'q-applicant-enter-your-date-of-birth': {
                        type: 'string',
                        format: 'date-time',
                        title: 'Enter your date of birth',
                        description: 'For example, 31 3 2018.',
                        errorMessage: {
                            format: 'Enter your date of birth and include a day, month and year'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-enter-your-date-of-birth':
                            'Enter your date of birth and include a day, month and year'
                    }
                }
            },
            'p-applicant-enter-your-email-address': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-enter-your-email-address'],
                additionalProperties: false,
                properties: {
                    'q-applicant-enter-your-email-address': {
                        type: 'string',
                        title: 'Enter your email address',
                        description:
                            'We may use this to contact you about your application, for example, to request more information.',
                        maxLength: 50,
                        format: 'email',
                        errorMessage: {
                            maxLength: 'Email address must be 50 characters or less',
                            format: 'Enter your email address, for example john.smith@email.com'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-enter-your-email-address':
                            'Enter an email address in the correct format, like name@example.com'
                    }
                }
            },
            'p-applicant-enter-your-address': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Enter your address',
                required: ['q-applicant-building-and-street', 'q-applicant-town-or-city'],
                additionalProperties: false,
                properties: {
                    'q-applicant-building-and-street': {
                        type: 'string',
                        title: 'Building and street',
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'First line of address must be less than 60 characters'
                        }
                    },
                    'q-applicant-building-and-street-2': {
                        type: 'string',
                        title: "<span class='govuk-visually-hidden'>Building and street line 2",
                        maxLength: 60,
                        errorMessage: {
                            maxLength: 'Second line of address must be less than 60 characters'
                        }
                    },
                    'q-applicant-town-or-city': {
                        type: 'string',
                        title: 'Town or city',
                        maxLength: 32,
                        errorMessage: {
                            maxLength: 'Town or city must be 60 characters or less'
                        }
                    },
                    'q-applicant-county': {
                        type: 'string',
                        title: 'County (optional)',
                        maxLength: 32,
                        errorMessage: {
                            maxLength: 'County must be 60 characters or less'
                        }
                    },
                    'q-applicant-postcode': {
                        type: 'string',
                        title: 'Postcode (optional)',
                        maxLength: 10,
                        errorMessage: {
                            maxLength: 'Postcode must be 10 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-building-and-street':
                            'Enter the building and street where you live',
                        'q-applicant-town-or-city': 'Enter the town or city where you live'
                    }
                }
            },
            'p-applicant-enter-your-telephone-number': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-enter-your-telephone-number'],
                additionalProperties: false,
                properties: {
                    'q-applicant-enter-your-telephone-number': {
                        type: 'string',
                        title: 'Enter your telephone number',
                        description:
                            'We may use this to contact you if we need to clarify something on your application form.',
                        maxLength: 20,
                        pattern: '^[\\+\\d][\\d \\(\\)\\+\\-\\#]{7,19}$',
                        errorMessage: {
                            maxLength: 'Telephone number must be 20 characters or less',
                            pattern:
                                'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-enter-your-telephone-number':
                            'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                    }
                }
            },
            'p--check-your-answers': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Check your answers',
                additionalProperties: false,
                properties: {
                    'p-check-your-answers': {
                        summaryInfo: {
                            footerText:
                                '<h2 class="govuk-heading-l">Agree and submit your application</h2>\n                    <p class="govuk-body">By submitting this application you agree that we can share the details in it with the police. This helps us get the police information that we need to make a decision.</p>\n                <p class="govuk-body">To find out more about how we handle your data <a href="https://www.gov.uk/guidance/cica-privacy-notice" target="">read our privacy notice</a>.</p>',
                            urlPath: 'apply',
                            editAnswerText: 'Change'
                        }
                    }
                }
            },
            'p--confirmation': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Confirmation',
                additionalProperties: false,
                properties: {
                    confirmation: {
                        description:
                            '\n                    {{ govukPanel({\n                        titleText: "Application submitted",\n                        html: \'<p>Your reference number is <br /><strong>||/answers/system/case-reference||</strong></p><p>We have sent a confirmation email to <strong>||/answers/p-applicant-enter-your-email-address/q-applicant-enter-your-email-address||</strong></p>\'\n                    }) }}\n                    \n                    <p class="govuk-body-l">Thank you for submitting your application.</p>\n                    <h2 class="govuk-heading-m">What happens next</h2>\n                    <p class="govuk-body">We will:</p>\n                    <ul class="govuk-list govuk-list--bullet">\n                    <li>ask the police for evidence</li>\n                    <li>use the police evidence to make a decision</li>\n                    <li>send our decision letter by post</li>\n                    </ul>\n                    <p class="govuk-body">We will usually make a decision within 4 months.</p>\n                    {{ govukWarningText({\n                        text: "You must inform us immediately if any of the information you have given us changes, especially your address, telephone number or email address.",\n                        iconFallbackText: "Warning"\n                    }) }}\n                    <p class="govuk-body">You can contact our Customer Service Centre on 0300 003 3601. Select option 8 when the call is answered.</p>\n                    <h2 class="govuk-heading-m">Help us improve this service</h2>\n                    <p class="govuk-body">You can complete a short survey to help us improve this service.</p>\n                    <p class="govuk-body">It does not ask for any details about your case, and has no effect on your application.</p>\n                    <p class="govuk-body"><a href="https://www.surveymonkey.com/r/Privatebetafeedback">Tell us what you think of our service</a> (takes 30 seconds)</p>\n            '
                    }
                }
            },
            'p-applicant-redirect-to-our-other-application': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'We are still working on this part of the service',
                additionalProperties: false,
                properties: {
                    'you-need-a-different-service': {
                        description:
                            '<p class="govuk-body">To complete your application <a href="https://www.gov.uk/claim-compensation-criminal-injury/make-claim">use our current online service</a>.</p>\n                          {{ govukDetails({\n                              summaryText: "If you need help or support",\n                              html: \'\n                                  <p class="govuk-body">You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                                  <p class="govuk-body">Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\n                                  <p class="govuk-body">You can get practical or emotional support depending on where you live:</p>\n                                  <ul class="govuk-list govuk-list--bullet">\n                                     <li>in England and Wales <a href="https://www.victimandwitnessinformation.org.uk/">visit the Victim and Witness Information website</a></li>\n                                     <li>in Scotland <a href="https://www.mygov.scot/victim-witness-support/">visit the mygov.scot website</a></li>\n                                  </ul>\n                              \'\n                          }) }}'
                    }
                }
            },
            'p-applicant-you-cannot-get-compensation': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'You cannot get compensation',
                type: 'object',
                additionalProperties: false,
                properties: {
                    'you-cannot-get-compensation': {
                        description:
                            '\n                <p class="govuk-body">If the crime has not been reported to the police we cannot pay compensation.</p>\n                <p class="govuk-body">You may continue your application, but any future application for the same injuries will be refused.</p>\n            '
                    }
                }
            },
            'p-main-applying-for-child': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-main-applying-for-child'],
                additionalProperties: false,
                properties: {
                    'q-main-applying-for-child': {
                        type: 'boolean',
                        title: 'Are you a parent applying for your child?',
                        description: 'They must be under 18.'
                    }
                },
                errorMessage: {
                    required: {
                        'q-main-applying-for-child':
                            'Select Yes if you are a parent applying for a child'
                    }
                }
            },
            'p-applicant-british-citizen-or-eu-national-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-british-citizen-or-eu-national'],
                additionalProperties: false,
                properties: {
                    'q-applicant-british-citizen-or-eu-national': {
                        type: 'boolean',
                        title: 'Is your child a British or EU National?'
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-british-citizen-or-eu-national':
                            'Select Yes if your child is a British or EU national'
                    }
                }
            },
            'p-applicant-date-of-birth-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-enter-your-date-of-birth'],
                additionalProperties: false,
                properties: {
                    'q-applicant-enter-your-date-of-birth': {
                        type: 'string',
                        format: 'date-time',
                        title: "What is your child's date of birth?",
                        description: 'For example, 31 3 1980.',
                        errorMessage: {
                            format:
                                "Enter your child's date of birth and include a day, month and year"
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-enter-your-date-of-birth':
                            "Enter your child's date of birth and include a day, month and year"
                    }
                }
            },
            'p--before-you-continue-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'Before you continue',
                type: 'object',
                additionalProperties: false,
                properties: {
                    'applicant-impact-on-your-child': {
                        description:
                            '\n                <p class="govuk-body">On the next page we will ask you to select an option based on how the crime affected your child.</p>\n                <p class="govuk-body">We appreciate that this may be difficult for you.</p>\n                <h2 class="govuk-heading-m">If you need help or support</h2>\n                <p class="govuk-body">You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                <p class="govuk-body">Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\n                <p class="govuk-body">You can get practical or emotional support depending on where you live:</p>\n                <ul class="govuk-list govuk-list--bullet">\n                   <li>in England and Wales <a href="https://www.victimandwitnessinformation.org.uk/">visit the Victim and Witness Information website</a></li>\n                   <li>in Scotland <a href="https://www.mygov.scot/victim-witness-support/">visit the mygov.scot website</a></li>\n                </ul>\n            '
                    }
                }
            },
            'p-applicant-select-option-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Select the option that applies to your child',
                required: ['q-applicant-option'],
                additionalProperties: false,
                properties: {
                    'main-your-choices': {
                        description:
                            '\n                <p class="govuk-body-l">We decide what enquiries to make depending on how the crime affected your child.</p>\n                <h2 class="govuk-heading-m">Option 1: Sexual assault or abuse</h2>\n                <p class="govuk-body">Any compensation we pay acknowledges the emotional distress the crime caused your child.</p>\n                <p class="govuk-body">We normally make a decision based on your application and the information we get from the police.</p>\n                <p class="govuk-body">We will usually make a decision within 4 months. This is because we do not normally need to see your child\'s medical records.</p>\n                <h2 class="govuk-heading-m">Option 2: Sexual assault or abuse and other injuries or losses</h2>\n                <p class="govuk-body">We can also pay compensation for:\n                <ul class="govuk-list govuk-list--bullet">\n                <li>physical injuries</li>\n                <li>pregnancy, sexually transmitted disease, or loss of foetus</li>\n                <li><a href="https://www.gov.uk/guidance/criminal-injuries-compensation-a-guide#special-expenses">some extra costs</a> you\'ve had due to your child\'s injuries</li>\n                <li>disabling mental injuries that are additional to the emotional distress your child has already suffered</li>\n                </ul>\n                </p>\n                {{ govukDetails({\n                    summaryText: "What is a disabling mental injury?",\n                    text: "A disabling mental injury has a substantial adverse effect on your child\'s ability to carry out normal day-to-day activities. For example, reduced performance at school, or effects on their social relationships."\n                }) }}\n                <p class="govuk-body">We may ask a psychiatrist or clinical psychologist to confirm that your child has a disabling mental injury if they do not already have a diagnosis.</p>\n                <p class="govuk-body">We will usually make a decision within 12 months. This is because we may need to examine your child\'s medical records, get medical reports and assess any losses.</p>\n                {{ govukDetails({\n                summaryText: "If you need help or support",\n                html: \'\n                    <p class="govuk-body">You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                    <p class="govuk-body">Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\n                    <p class="govuk-body">You can get practical or emotional support depending on where you live:</p>\n                    <ul class="govuk-list govuk-list--bullet">\n                       <li>in England and Wales <a href="https://www.victimandwitnessinformation.org.uk/">visit the Victim and Witness Information website</a></li>\n                       <li>in Scotland <a href="https://www.mygov.scot/victim-witness-support/">visit the mygov.scot website</a></li>\n                    </ul>\n                \'\n                }) }}\n            '
                    },
                    'q-applicant-option': {
                        title: 'Select the option that applies to your child',
                        type: 'string',
                        oneOf: [
                            {
                                title: 'Option 1: Sexual assault or abuse',
                                const: 'option-1:-sexual-assault-or-abuse'
                            },
                            {
                                title:
                                    'Option 2: Sexual assault or abuse and other injuries or losses',
                                const:
                                    'option-2:-sexual-assault-or-abuse-and-other-injuries-or-losses'
                            }
                        ]
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-option': 'Select either Option 1 or Option 2'
                    }
                }
            },
            'p-main-cannot-apply-for-over-18s': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'You cannot apply for someone over 18 with this service',
                type: 'object',
                additionalProperties: false,
                properties: {
                    'main-you-cannot-apply-for-over-18s': {
                        description:
                            '\n                <p class="govuk-body">They can <a href="/concepts/minors/consent">apply as an adult</a>.</p>\n                <p class="govuk-body">You must <a href="https://www.cica.gov.uk/OAS/Account/create">use another service</a> to apply on behalf of an adult.</p>\n                <h2 class="govuk-heading-m">If you need help or support</h2>\n                <p class="govuk-body">You can contact us for help with your application on 0300 003 3601. Select option 8.</p>\n                <p class="govuk-body">Our phone lines are open Monday to Friday 8:30am to 5pm except Wednesday when they open at 10am.</p>\n                <p class="govuk-body">You can get practical or emotional support depending on where you live:</p>\n                <ul class="govuk-list govuk-list--bullet">\n                   <li>in England and Wales <a href="https://www.victimandwitnessinformation.org.uk/">visit the Victim and Witness Information website</a></li>\n                   <li>in Scotland <a href="https://www.mygov.scot/victim-witness-support/">visit the mygov.scot website</a></li>\n                </ul>\n            '
                    }
                }
            },
            'p-applicant-name-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: "Enter your child's name",
                type: 'object',
                required: ['q-applicant-title', 'q-applicant-first-name', 'q-applicant-last-name'],
                additionalProperties: false,
                properties: {
                    'q-applicant-title': {
                        title: 'Title',
                        type: 'string',
                        maxLength: 6,
                        errorMessage: {
                            maxLength: 'Title must be 6 characters or less'
                        }
                    },
                    'q-applicant-first-name': {
                        title: 'First name',
                        type: 'string',
                        maxLength: 70,
                        errorMessage: {
                            maxLength: 'First name must be 70 characters or less'
                        }
                    },
                    'q-applicant-last-name': {
                        title: 'Last name',
                        type: 'string',
                        maxLength: 70,
                        errorMessage: {
                            maxLength: 'Last name must be 70 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-title': "Enter your child's title",
                        'q-applicant-first-name': "Enter your child's first name",
                        'q-applicant-last-name': "Enter your child's last name"
                    }
                }
            },
            'p-applicant-have-you-been-known-by-any-other-names-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-have-you-been-known-by-any-other-names'],
                additionalProperties: false,
                properties: {
                    'q-applicant-have-you-been-known-by-any-other-names': {
                        type: 'boolean',
                        title: 'Has your child ever been known by any other names?'
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-have-you-been-known-by-any-other-names':
                            'Select yes if your child has been known by any other names'
                    }
                }
            },
            'p-applicant-other-names-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['q-applicant-what-other-names-have-you-used'],
                additionalProperties: false,
                properties: {
                    'q-applicant-what-other-names-have-you-used': {
                        type: 'string',
                        title: 'What other names has your child had?',
                        maxLength: 50,
                        errorMessage: {
                            maxLength:
                                'Other names your child has used must be 50 characters or less'
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-what-other-names-have-you-used':
                            'Enter the other names your child has used'
                    }
                }
            },
            'p-offender-contact-main': {
                type: 'object',
                properties: {
                    'q-offender-describe-contact-with-offender': {
                        type: 'string',
                        title: 'If your child has contact with the offender, describe it below',
                        description:
                            'We will not pay compensation if the offender may benefit from it.',
                        maxLength: 500,
                        errorMessage: {
                            maxLength: 'Description must be 500 characters or less'
                        }
                    },
                    'q-offender-i-have-no-contact-with-offender': {
                        type: 'array',
                        maxItems: 1,
                        uniqueItems: true,
                        items: {
                            anyOf: [
                                {
                                    title: 'My child has no contact with the offender',
                                    const: 'i-have-no-contact-with-the-offender'
                                }
                            ]
                        }
                    }
                },
                allOf: [
                    {
                        $ref:
                            '#/definitions/if-not-checked-then-q-offender-contact-description-is-required'
                    }
                ],
                definitions: {
                    'if-not-checked-then-q-offender-contact-description-is-required': {
                        if: {
                            not: {
                                required: ['q-offender-i-have-no-contact-with-offender']
                            }
                        },
                        then: {
                            required: ['q-offender-describe-contact-with-offender'],
                            errorMessage: {
                                required: {
                                    'q-offender-describe-contact-with-offender':
                                        'Enter details of contact with the assailant or select if your child has no contact'
                                }
                            }
                        }
                    }
                }
            },
            'p-police-force': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                title: 'Which police force is investigating the crime?',
                type: 'object',
                required: ['q-police-force-id'],
                additionalProperties: false,
                properties: {
                    'q-police-force-id': {
                        type: 'integer',
                        oneOf: [
                            {
                                title: 'Avon And Somerset Constabulary',
                                const: 10000033
                            },
                            {
                                title: 'Bedfordshire Police',
                                const: 10000035
                            },
                            {
                                title: 'British Transport Police',
                                const: 10000001
                            },
                            {
                                title: 'Cambridgeshire Constabulary',
                                const: 10000039
                            },
                            {
                                title: 'Cheshire Constabulary',
                                const: 10000049
                            },
                            {
                                title: 'City Of London Police',
                                const: 10000059
                            },
                            {
                                title: 'Cleveland Police',
                                const: 10000066
                            },
                            {
                                title: 'Cumbria Constabulary',
                                const: 10000082
                            },
                            {
                                title: 'Derbyshire Constabulary',
                                const: 10000084
                            },
                            {
                                title: 'Devon and Cornwall Police',
                                const: 10000090
                            },
                            {
                                title: 'Dorset Police',
                                const: 10000093
                            },
                            {
                                title: 'Durham Constabulary',
                                const: 10000102
                            },
                            {
                                title: 'Essex Police',
                                const: 10000114
                            },
                            {
                                title: 'Gloucestershire Constabulary',
                                const: 10000128
                            },
                            {
                                title: 'Greater Manchester Police',
                                const: 10000140
                            },
                            {
                                title: 'Hampshire Constabulary',
                                const: 10000150
                            },
                            {
                                title: 'Hertfordshire Constabulary',
                                const: 10000153
                            },
                            {
                                title: 'Humberside Police',
                                const: 10000169
                            },
                            {
                                title: 'Kent Police',
                                const: 10000172
                            },
                            {
                                title: 'Lancashire Constabulary',
                                const: 10000175
                            },
                            {
                                title: 'Leicestershire Police',
                                const: 10000176
                            },
                            {
                                title: 'Lincolnshire Police',
                                const: 10000179
                            },
                            {
                                title: 'Merseyside Police',
                                const: 10000181
                            },
                            {
                                title: 'Metropolitan Barking',
                                const: 11809785
                            },
                            {
                                title: 'Metropolitan Barnet',
                                const: 11809719
                            },
                            {
                                title: 'Metropolitan Bexley',
                                const: 11809788
                            },
                            {
                                title: 'Metropolitan Brent',
                                const: 11809722
                            },
                            {
                                title: 'Metropolitan Bromley',
                                const: 11809760
                            },
                            {
                                title: 'Metropolitan Camden',
                                const: 11809694
                            },
                            {
                                title: 'Metropolitan Croydon',
                                const: 11809713
                            },
                            {
                                title: 'Metropolitan Ealing',
                                const: 11809743
                            },
                            {
                                title: 'Metropolitan Enfield',
                                const: 11809783
                            },
                            {
                                title: 'Metropolitan Greenwich',
                                const: 11809709
                            },
                            {
                                title: 'Metropolitan Hackney',
                                const: 11809763
                            },
                            {
                                title: 'Metropolitan Hammersmith',
                                const: 11809795
                            },
                            {
                                title: 'Metropolitan Haringey',
                                const: 11809738
                            },
                            {
                                title: 'Metropolitan Harrow',
                                const: 11809803
                            },
                            {
                                title: 'Metropolitan Havering',
                                const: 11809800
                            },
                            {
                                title: 'Metropolitan Hillingdon',
                                const: 11809775
                            },
                            {
                                title: 'Metropolitan Hounslow',
                                const: 11809780
                            },
                            {
                                title: 'Metropolitan Islington',
                                const: 11809765
                            },
                            {
                                title: 'Metropolitan Kensington',
                                const: 11809801
                            },
                            {
                                title: 'Metropolitan Kingston',
                                const: 11809865
                            },
                            {
                                title: 'Metropolitan Lambeth',
                                const: 11809693
                            },
                            {
                                title: 'Metropolitan Lewisham',
                                const: 11809698
                            },
                            {
                                title: 'Metropolitan Merton',
                                const: 11809861
                            },
                            {
                                title: 'Metropolitan Newham',
                                const: 11809701
                            },
                            {
                                title: 'Metropolitan Redbridge',
                                const: 11809782
                            },
                            {
                                title: 'Metropolitan Richmond',
                                const: 11809862
                            },
                            {
                                title: 'Metropolitan Southwark',
                                const: 11809691
                            },
                            {
                                title: 'Metropolitan Sutton',
                                const: 11809805
                            },
                            {
                                title: 'Metropolitan Tower Hamlets',
                                const: 11809767
                            },
                            {
                                title: 'Metropolitan Waltham Forest',
                                const: 11809726
                            },
                            {
                                title: 'Metropolitan Wandsworth',
                                const: 11809771
                            },
                            {
                                title: 'Metropolitan Westminster',
                                const: 11809683
                            },
                            {
                                title: 'Norfolk Constabulary',
                                const: 10000185
                            },
                            {
                                title: 'North Yorkshire Police',
                                const: 10000189
                            },
                            {
                                title: 'Northamptonshire Police',
                                const: 10000191
                            },
                            {
                                title: 'Northumbria Police',
                                const: 10000195
                            },
                            {
                                title: 'Nottinghamshire Police',
                                const: 10000199
                            },
                            {
                                title: 'South Yorkshire Police',
                                const: 10000218
                            },
                            {
                                title: 'Staffordshire Police',
                                const: 10000223
                            },
                            {
                                title: 'Suffolk Constabulary',
                                const: 10000233
                            },
                            {
                                title: 'Surrey Police',
                                const: 10000237
                            },
                            {
                                title: 'Sussex Police',
                                const: 10000240
                            },
                            {
                                title: 'Thames Valley Police',
                                const: 10000247
                            },
                            {
                                title: 'Warwickshire Police',
                                const: 10000274
                            },
                            {
                                title: 'West Mercia Police',
                                const: 10000279
                            },
                            {
                                title: 'West Midlands Police',
                                const: 10000285
                            },
                            {
                                title: 'West Yorkshire Police',
                                const: 10000291
                            },
                            {
                                title: 'Wiltshire Police',
                                const: 10000295
                            },
                            {
                                title: 'Police Scotland Argyll and West Dunbartonshire',
                                const: 12607027
                            },
                            {
                                title: 'Police Scotland Ayrshire',
                                const: 12157147
                            },
                            {
                                title: 'Police Scotland Dumfries and Galloway',
                                const: 10000098
                            },
                            {
                                title: 'Police Scotland Edinburgh',
                                const: 13400412
                            },
                            {
                                title: 'Police Scotland Fife',
                                const: 10002424
                            },
                            {
                                title: 'Police Scotland Forth Valley',
                                const: 10000045
                            },
                            {
                                title: 'Police Scotland Greater Glasgow',
                                const: 12607023
                            },
                            {
                                title: 'Police Scotland Highland and Islands',
                                const: 10000193
                            },
                            {
                                title: 'Police Scotland Lanarkshire',
                                const: 12607028
                            },
                            {
                                title: 'Police Scotland North East',
                                const: 10000133
                            },
                            {
                                title: 'Police Scotland Renfrewshire and Inverclyde',
                                const: 12607026
                            },
                            {
                                title: 'Police Scotland Tayside',
                                const: 10000243
                            },
                            {
                                title: 'Police Scotland The Lothians and Scottish Borders',
                                const: 13400413
                            },
                            {
                                title: 'Dyfed-Powys',
                                const: 10000109
                            },
                            {
                                title: 'Gwent',
                                const: 10000147
                            },
                            {
                                title: 'North Wales',
                                const: 10000187
                            },
                            {
                                title: 'South Wales',
                                const: 10000215
                            }
                        ]
                    },
                    'list-of-police-forces': {
                        description:
                            '\n                {% from "components/details/macro.njk" import govukDetails %}\n                {{ govukDetails({\n                    summaryText: "Help with police forces",\n                    html: \'<p>See a list of all <a href="/police" target="_blank">police forces in England, Scotland and Wales</a> (opens in a new tab)</p>\'\n                }) }}\n            '
                    }
                },
                errorMessage: {
                    required: {
                        'q-police-force-id': 'Select a police force from the list'
                    }
                }
            },
            'p-applicant-other-compensation-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                propertyNames: {
                    enum: [
                        'q-applicant-have-you-applied-for-or-received-any-other-compensation',
                        'q-applicant-applied-for-other-compensation-briefly-explain-why-not'
                    ]
                },
                properties: {
                    'q-applicant-have-you-applied-for-or-received-any-other-compensation': {
                        title: 'Has your child applied for or got any other form of compensation?',
                        description:
                            'For example, if they sought civil damages or a court decided they should get compensation.',
                        type: 'boolean'
                    },
                    'q-applicant-applied-for-other-compensation-briefly-explain-why-not': {
                        type: 'string',
                        title: 'Briefly explain why not.',
                        maxLength: 499
                    }
                },
                required: ['q-applicant-have-you-applied-for-or-received-any-other-compensation'],
                allOf: [
                    {
                        $ref:
                            '#/definitions/if-false-then-q-applicant-applied-for-other-compensation-briefly-explain-why-not-is-required'
                    }
                ],
                definitions: {
                    'if-false-then-q-applicant-applied-for-other-compensation-briefly-explain-why-not-is-required': {
                        if: {
                            properties: {
                                'q-applicant-have-you-applied-for-or-received-any-other-compensation': {
                                    const: false
                                }
                            },
                            required: [
                                'q-applicant-have-you-applied-for-or-received-any-other-compensation'
                            ]
                        },
                        then: {
                            required: [
                                'q-applicant-applied-for-other-compensation-briefly-explain-why-not'
                            ],
                            propertyNames: {
                                enum: [
                                    'q-applicant-have-you-applied-for-or-received-any-other-compensation',
                                    'q-applicant-applied-for-other-compensation-briefly-explain-why-not'
                                ]
                            },
                            properties: {
                                'q-applicant-applied-for-other-compensation-briefly-explain-why-not': {
                                    errorMessage: {
                                        maxLength: 'Explanation must be 500 characters or less'
                                    }
                                }
                            },
                            errorMessage: {
                                required: {
                                    'q-applicant-applied-for-other-compensation-briefly-explain-why-not':
                                        'Explain why your child did not apply for or receive any other form of compensation'
                                }
                            }
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-have-you-applied-for-or-received-any-other-compensation':
                            'Select yes if your child has applied for or received another form of compensation'
                    }
                }
            },
            'p-applicant-other-compensation-details-main': {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                title: 'Other compensation',
                propertyNames: {
                    enum: [
                        'q-applicant-who-did-you-apply-to',
                        'q-applicant-has-a-decision-been-made',
                        'q-how-much-was-award',
                        'q-when-will-you-find-out'
                    ]
                },
                properties: {
                    'q-applicant-who-did-you-apply-to': {
                        type: 'string',
                        title: 'Who has your child applied to or received compensation from?',
                        maxLength: 50,
                        errorMessage: {
                            maxLength:
                                'Who your child applied to or received compensation from must be 50 characters or less'
                        }
                    },
                    'q-applicant-has-a-decision-been-made': {
                        title: 'Have they made a decision?',
                        type: 'boolean'
                    },
                    'q-how-much-was-award': {
                        type: 'string',
                        title: 'How much was the award?',
                        maxLength: 50,
                        errorMessage: {
                            maxLength: 'Award amount must be 50 characters or less'
                        }
                    },
                    'q-when-will-you-find-out': {
                        type: 'string',
                        title: 'When will you find out?',
                        description:
                            'Enter an approximate date, for example, December 2019. If you do not know you can say so.',
                        maxLength: 50,
                        errorMessage: {
                            maxLength: 'When will you find out must be 50 characters or less'
                        }
                    }
                },
                required: [
                    'q-applicant-who-did-you-apply-to',
                    'q-applicant-has-a-decision-been-made'
                ],
                allOf: [
                    {
                        $ref: '#/definitions/if-false-then-q-when-will-you-find-out-is-required'
                    },
                    {
                        $ref: '#/definitions/if-true-then-q-how-much-was-award-is-required'
                    }
                ],
                definitions: {
                    'if-false-then-q-when-will-you-find-out-is-required': {
                        if: {
                            properties: {
                                'q-applicant-has-a-decision-been-made': {
                                    const: false
                                }
                            },
                            required: ['q-applicant-has-a-decision-been-made']
                        },
                        then: {
                            required: ['q-when-will-you-find-out'],
                            propertyNames: {
                                enum: [
                                    'q-applicant-who-did-you-apply-to',
                                    'q-applicant-has-a-decision-been-made',
                                    'q-when-will-you-find-out'
                                ]
                            },
                            errorMessage: {
                                required: {
                                    'q-when-will-you-find-out': 'Enter an approximate date'
                                }
                            }
                        }
                    },
                    'if-true-then-q-how-much-was-award-is-required': {
                        if: {
                            properties: {
                                'q-applicant-has-a-decision-been-made': {
                                    const: true
                                }
                            },
                            required: ['q-applicant-has-a-decision-been-made']
                        },
                        then: {
                            required: ['q-how-much-was-award'],
                            propertyNames: {
                                enum: [
                                    'q-applicant-who-did-you-apply-to',
                                    'q-applicant-has-a-decision-been-made',
                                    'q-how-much-was-award'
                                ]
                            },
                            errorMessage: {
                                required: {
                                    'q-how-much-was-award': 'Enter an amount'
                                }
                            }
                        }
                    }
                },
                errorMessage: {
                    required: {
                        'q-applicant-who-did-you-apply-to':
                            'Enter who you applied to or received compensation from',
                        'q-applicant-has-a-decision-been-made':
                            'Select yes if you have received a decision about the other compensation claim'
                    }
                }
            },
            system: {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                required: ['case-reference'],
                additionalProperties: false,
                properties: {
                    'case-reference': {
                        type: 'string',
                        pattern: '^[0-9]{2}\\\\[0-9]{6}$',
                        errorMessage: {
                            pattern: 'Invalid case reference'
                        }
                    }
                },
                errorMessage: {
                    required: 'Case reference is required'
                }
            }
        },
        routes: {
            initial: 'p-applicant-declaration',
            referrer:
                'https://claim-criminal-injuries-compensation.service.justice.gov.uk/start-page',
            summary: 'p--check-your-answers',
            confirmation: 'p--confirmation',
            states: {
                'p-applicant-declaration': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-were-you-a-victim-of-sexual-assault-or-abuse'
                            }
                        ]
                    }
                },
                'p-applicant-british-citizen-or-eu-national': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-british-citizen-or-eu-national.q-applicant-british-citizen-or-eu-national',
                                    false
                                ]
                            },
                            {
                                target: 'p-applicant-are-you-18-or-over',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-british-citizen-or-eu-national.q-applicant-british-citizen-or-eu-national',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-are-you-18-or-over': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-are-you-18-or-over.q-applicant-are-you-18-or-over',
                                    false
                                ]
                            },
                            {
                                target: 'p--before-you-continue',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-are-you-18-or-over.q-applicant-are-you-18-or-over',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-who-are-you-applying-for': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-main-applying-for-child',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-who-are-you-applying-for.q-applicant-who-are-you-applying-for',
                                    'someone-else'
                                ]
                            },
                            {
                                target: 'p-applicant-british-citizen-or-eu-national',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-who-are-you-applying-for.q-applicant-who-are-you-applying-for',
                                    'myself'
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-were-you-a-victim-of-sexual-assault-or-abuse': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-were-you-a-victim-of-sexual-assault-or-abuse.q-applicant-were-you-a-victim-of-sexual-assault-or-abuse',
                                    false
                                ]
                            },
                            {
                                target: 'p--was-the-crime-reported-to-police',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-were-you-a-victim-of-sexual-assault-or-abuse.q-applicant-were-you-a-victim-of-sexual-assault-or-abuse',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p--before-you-continue': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-select-option'
                            }
                        ]
                    }
                },
                'p-applicant-select-option': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-select-option.q-applicant-option',
                                    'option-2:-sexual-assault-or-abuse-and-other-injuries-or-losses'
                                ]
                            },
                            {
                                target: 'p--when-was-the-crime-reported-to-police',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-select-option.q-applicant-option',
                                    'option-1:-sexual-assault-or-abuse'
                                ]
                            }
                        ]
                    }
                },
                'p--was-the-crime-reported-to-police': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-you-cannot-get-compensation',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    false
                                ]
                            },
                            {
                                target: 'p-applicant-who-are-you-applying-for',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p--when-was-the-crime-reported-to-police': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p--whats-the-crime-reference-number'
                            }
                        ]
                    }
                },
                'p--whats-the-crime-reference-number': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-did-the-crime-happen-once-or-over-time'
                            }
                        ]
                    }
                },
                'p-applicant-did-the-crime-happen-once-or-over-time': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-when-did-the-crime-happen',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-did-the-crime-happen-once-or-over-time.q-applicant-did-the-crime-happen-once-or-over-time',
                                    'once'
                                ]
                            },
                            {
                                target: 'p-applicant-when-did-the-crime-start',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-did-the-crime-happen-once-or-over-time.q-applicant-did-the-crime-happen-once-or-over-time',
                                    'over-a-period-of-time'
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-when-did-the-crime-happen': {
                    on: {
                        ANSWER: [
                            {
                                target:
                                    'p-applicant-select-reasons-for-the-delay-in-making-your-application',
                                cond: [
                                    'dateExceedsTwoYearsFromNow',
                                    '$.answers.p-applicant-when-did-the-crime-happen.q-applicant-when-did-the-crime-happen'
                                ]
                            },
                            {
                                target: 'p-applicant-where-did-the-crime-happen'
                            }
                        ]
                    }
                },
                'p-applicant-when-did-the-crime-start': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-when-did-the-crime-stop'
                            }
                        ]
                    }
                },
                'p-applicant-when-did-the-crime-stop': {
                    on: {
                        ANSWER: [
                            {
                                target:
                                    'p-applicant-select-reasons-for-the-delay-in-making-your-application',
                                cond: [
                                    'dateExceedsTwoYearsFromNow',
                                    '$.answers.p-applicant-when-did-the-crime-stop.q-applicant-when-did-the-crime-stop'
                                ]
                            },
                            {
                                target: 'p-applicant-where-did-the-crime-happen'
                            }
                        ]
                    }
                },
                'p-applicant-select-reasons-for-the-delay-in-making-your-application': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-where-did-the-crime-happen'
                            }
                        ]
                    }
                },
                'p-applicant-where-did-the-crime-happen': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-where-in-england-did-it-happen',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-where-did-the-crime-happen.q-applicant-where-did-the-crime-happen',
                                    'england'
                                ]
                            },
                            {
                                target: 'p-applicant-where-in-scotland-did-it-happen',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-where-did-the-crime-happen.q-applicant-where-did-the-crime-happen',
                                    'scotland'
                                ]
                            },
                            {
                                target: 'p-applicant-where-in-wales-did-it-happen',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-where-did-the-crime-happen.q-applicant-where-did-the-crime-happen',
                                    'wales'
                                ]
                            },
                            {
                                target: 'p--you-need-to-contact-us',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-where-did-the-crime-happen.q-applicant-where-did-the-crime-happen',
                                    'somewhere-else'
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-where-in-england-did-it-happen': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-police-force',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    true
                                ]
                            },
                            {
                                target: 'p-offender-do-you-know-the-name-of-the-offender',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-where-in-scotland-did-it-happen': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-police-force',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    true
                                ]
                            },
                            {
                                target: 'p-offender-do-you-know-the-name-of-the-offender',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-where-in-wales-did-it-happen': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-offender-do-you-know-the-name-of-the-offender',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    false
                                ]
                            },
                            {
                                target: 'p-police-force',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p--you-need-to-contact-us': {
                    type: 'final'
                },
                'p-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-offender-do-you-know-the-name-of-the-offender'
                            }
                        ]
                    }
                },
                'p-offender-do-you-know-the-name-of-the-offender': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-previous-application',
                                cond: [
                                    '==',
                                    '$.answers.p-offender-do-you-know-the-name-of-the-offender.q-offender-do-you-know-the-name-of-the-offender',
                                    false
                                ]
                            },
                            {
                                target: 'p-offender-enter-offenders-name',
                                cond: [
                                    '==',
                                    '$.answers.p-offender-do-you-know-the-name-of-the-offender.q-offender-do-you-know-the-name-of-the-offender',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p-offender-enter-offenders-name': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-offender-contact',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-who-are-you-applying-for.q-applicant-who-are-you-applying-for',
                                    'myself'
                                ]
                            },
                            {
                                target: 'p-offender-contact-main',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p-offender-contact': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-previous-application'
                            }
                        ]
                    }
                },
                'p-applicant-previous-application': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-other-compensation-main',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-other-compensation'
                            }
                        ]
                    }
                },
                'p-applicant-other-compensation': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-other-compensation-details',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-other-compensation.q-applicant-have-you-applied-for-or-received-any-other-compensation',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-name',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-other-compensation.q-applicant-have-you-applied-for-or-received-any-other-compensation',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-other-compensation-details': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-name',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-who-are-you-applying-for.q-applicant-who-are-you-applying-for',
                                    'myself'
                                ]
                            },
                            {
                                target: 'p-applicant-enter-your-address',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-name': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-have-you-been-known-by-any-other-names'
                            }
                        ]
                    }
                },
                'p-applicant-have-you-been-known-by-any-other-names': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-other-names',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-have-you-been-known-by-any-other-names.q-applicant-have-you-been-known-by-any-other-names',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-where-did-the-crime-happen',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    false
                                ]
                            },
                            {
                                target: 'p--when-was-the-crime-reported-to-police',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-have-you-been-known-by-any-other-names-main.q-applicant-have-you-been-known-by-any-other-names',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-other-names': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-date-of-birth'
                            }
                        ]
                    }
                },
                'p-applicant-date-of-birth': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    'dateLessThanEighteenYearsAgo',
                                    '$.answers.p-applicant-date-of-birth.q-applicant-enter-your-date-of-birth'
                                ]
                            },
                            {
                                target: 'p-applicant-enter-your-email-address'
                            }
                        ]
                    }
                },
                'p-applicant-enter-your-email-address': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-enter-your-address',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-who-are-you-applying-for.q-applicant-who-are-you-applying-for',
                                    'myself'
                                ]
                            },
                            {
                                target: 'p-applicant-enter-your-telephone-number',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-enter-your-address': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-enter-your-telephone-number',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-who-are-you-applying-for.q-applicant-who-are-you-applying-for',
                                    'myself'
                                ]
                            },
                            {
                                target: 'p-applicant-enter-your-email-address',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    true
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-enter-your-telephone-number': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p--check-your-answers'
                            }
                        ]
                    }
                },
                'p--check-your-answers': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p--confirmation'
                            }
                        ]
                    }
                },
                'p--confirmation': {
                    type: 'final'
                },
                'p-applicant-redirect-to-our-other-application': {
                    type: 'final'
                },
                'p-applicant-you-cannot-get-compensation': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-who-are-you-applying-for'
                            }
                        ]
                    }
                },
                'p-main-applying-for-child': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-british-citizen-or-eu-national-main',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-british-citizen-or-eu-national-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-date-of-birth-main',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-british-citizen-or-eu-national-main.q-applicant-british-citizen-or-eu-national',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-british-citizen-or-eu-national-main.q-applicant-british-citizen-or-eu-national',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-date-of-birth-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p--before-you-continue-main',
                                cond: [
                                    'dateLessThanEighteenYearsAgo',
                                    '$.answers.p-applicant-date-of-birth-main.q-applicant-enter-your-date-of-birth'
                                ]
                            },
                            {
                                target: 'p-main-cannot-apply-for-over-18s'
                            }
                        ]
                    }
                },
                'p--before-you-continue-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-select-option-main'
                            }
                        ]
                    }
                },
                'p-applicant-select-option-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-redirect-to-our-other-application',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-select-option-main.q-applicant-option',
                                    'option-2:-sexual-assault-or-abuse-and-other-injuries-or-losses'
                                ]
                            },
                            {
                                target: 'p-applicant-name-main',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-select-option-main.q-applicant-option',
                                    'option-1:-sexual-assault-or-abuse'
                                ]
                            }
                        ]
                    }
                },
                'p-main-cannot-apply-for-over-18s': {
                    type: 'final'
                },
                'p-applicant-name-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-have-you-been-known-by-any-other-names-main'
                            }
                        ]
                    }
                },
                'p-applicant-have-you-been-known-by-any-other-names-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-other-names-main',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-have-you-been-known-by-any-other-names-main.q-applicant-have-you-been-known-by-any-other-names',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-where-did-the-crime-happen',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    false
                                ]
                            },
                            {
                                target: 'p--when-was-the-crime-reported-to-police',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-have-you-been-known-by-any-other-names-main.q-applicant-have-you-been-known-by-any-other-names',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-other-names-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-where-did-the-crime-happen',
                                cond: [
                                    '==',
                                    '$.answers.p--was-the-crime-reported-to-police.q--was-the-crime-reported-to-police',
                                    false
                                ]
                            },
                            {
                                target: 'p--when-was-the-crime-reported-to-police'
                            }
                        ]
                    }
                },
                'p-offender-contact-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-previous-application'
                            }
                        ]
                    }
                },
                'p-police-force': {
                    on: {
                        ANSWER: [
                            {
                                target:
                                    'p-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police',
                                cond: [
                                    'dateDifferenceGreaterThanTwoDays',
                                    'q--when-was-the-crime-reported-to-police',
                                    'q-applicant-when-did-the-crime-happen'
                                ]
                            },
                            {
                                target:
                                    'p-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police',
                                cond: [
                                    'dateDifferenceGreaterThanTwoDays',
                                    'q--when-was-the-crime-reported-to-police',
                                    'q-applicant-when-did-the-crime-stop'
                                ]
                            },
                            {
                                target: 'p-offender-do-you-know-the-name-of-the-offender'
                            }
                        ]
                    }
                },
                'p-applicant-other-compensation-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-other-compensation-details',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-other-compensation-main.q-applicant-have-you-applied-for-or-received-any-other-compensation',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-name',
                                cond: [
                                    '==',
                                    '$.answers.p-applicant-other-compensation-main.q-applicant-have-you-applied-for-or-received-any-other-compensation',
                                    false
                                ]
                            }
                        ]
                    }
                },
                'p-applicant-other-compensation-details-main': {
                    on: {
                        ANSWER: [
                            {
                                target: 'p-applicant-enter-your-address',
                                cond: [
                                    '==',
                                    '$.answers.p-main-applying-for-child.q-main-applying-for-child',
                                    true
                                ]
                            },
                            {
                                target: 'p-applicant-name'
                            }
                        ]
                    }
                },
                system: {
                    type: 'final'
                }
            }
        },
        answers: {},
        progress: ['p-applicant-declaration'],
        meta: {
            onComplete: {
                tasks: [
                    {
                        emailTemplateId: 'cb79653c-cf6e-44d4-8c03-087ba21cfd01',
                        emailTemplatePlaceholderMap: {
                            applicantEmail:
                                '/answers/p-applicant-enter-your-email-address/q-applicant-enter-your-email-address',
                            caseReference: '/answers/system/case-reference'
                        }
                    }
                ]
            }
        }
    })
};
