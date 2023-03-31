import { SurveyItemType, SurveyItem, Survey } from '../models/Survey';

export const sampleSurvey = {
    title: 'sample survey',
    description: 'This is sample survey',
    itemList: [
        {
            title: 'Question No.1',
            type: 'shortAnswer',
            required: true,
        } as SurveyItem,
        {
            title: 'Question No.2',
            type: 'longAnswer',
        } as SurveyItem,
        {
            title: 'Question No.3',
            type: 'multipleChoice',
            choiceList: [
                {
                    content: 'choice1',
                },
                {
                    content: 'choice2',
                },
                {
                    content: 'choice3',
                },
                {
                    content: 'choice4',
                },
            ],
        } as SurveyItem,
        {
            title: 'Question No.4',
            type: 'multipleChoice',
            choiceList: [
                {
                    content: 'choice1',
                },
                {
                    content: 'choice2',
                },
                {
                    content: 'choice3',
                },
                {
                    content: 'choice4',
                    hasShortAnswer: true,
                },
            ],
            required: true,
        } as SurveyItem,
        {
            title: 'Question No.5',
            type: 'multipleChoice',
            choiceList: [
                {
                    content: 'choice1',
                },
                {
                    content: 'choice2',
                },
                {
                    content: 'choice3',
                    hasShortAnswer: true,
                },
                {
                    content: 'choice4',
                },
                {
                    content: 'choice5',
                    hasShortAnswer: true,
                },
            ],
        } as SurveyItem,
        {
            title: 'Question No.6',
            type: 'intervalPoint',
            intervalInfo: {
                min: 0,
                max: 10,
                interval: 2,
                minText: 'Low',
                maxText: 'High',
            },
        },
    ],
} as Survey;
