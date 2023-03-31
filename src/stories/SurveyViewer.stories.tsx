import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SurveyEditor from '../components/SurveyEditor';
import SurveyViewer from '../components/SurveyViewer';
import { Survey, SurveyItem, SurveyItemType } from '../models/Survey';
import { sampleSurvey } from './data';

export default {
    title: 'Example/SurveyViewer',
    component: SurveyViewer,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof SurveyViewer>;

const Template: ComponentStory<typeof SurveyViewer> = (args) => <SurveyViewer {...args} />;

export const ViewerBasic = Template.bind({});
export const ViewerSurvey = Template.bind({});
ViewerSurvey.args = { survey: sampleSurvey };
