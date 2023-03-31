import { SxProps, Theme } from "@mui/material";

export enum StyleKey {
    rootContainer,
    editorContainer,
    editorTitleTextField,
    editorDescriptionTextField,
    editorQuestionListContainer,
    editorQuestionListItemContainer,
    editorQuestionListItemTitle,
    editorQuestionListItemType,
    editorQuestionListItemEditButton,
    editorQuestionListItemAddButton,
    editorQuestionListItemDeleteButton,
    editorQuestionListItemSwitch,
    editorAddButton,
    editorEditButton,
    editorDeleteButton,
    editorRequireSwitch,

    viewerContainer,
    viewerTitle,
    viewerDescription,
    viewerShortAnswerTitle,
    viewerShortAnswerTextField,
    viewerLongAnswerTitle,
    viewerLongAnswerTextarea,
    viewerMultipleChoiceTitle,
    viewerMultipleChoiceContent,
    viewerMultipleChoiceShortAnswer,
    viewerMultipleChoiceCheckbox,
    viewerMultipleCHoiceRadiobox,
    viewerIntervalPointTitle,
    viewerIntervalPointItem,
    viewerIntervalPointMinText,
    viewerIntervalPointMaxText,
}

export const getStyleFromExternal = ( key: StyleKey, styles?: Map<keyof typeof StyleKey, SxProps<Theme>>) => {
    let keyStr = StyleKey[key] as keyof typeof StyleKey;
    return styles && styles[keyStr];
};