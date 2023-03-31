import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SurveyEditor from '../components/SurveyEditor';
import { sampleSurvey } from './data';

export default {
    title: 'Example/SurveyEditor',
    component: SurveyEditor,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof SurveyEditor>;

const Template: ComponentStory<typeof SurveyEditor> = (args) => <SurveyEditor {...args} />;

export const EditorBasic = Template.bind({});

export const EditorSurvey = Template.bind({});
EditorSurvey.args = { survey: sampleSurvey, preview: true };
