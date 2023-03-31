import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { StyleKey, getStyleFromExternal } from '../models/style';
import { Survey, SurveyItem, SurveyItemType } from '../models/Survey';
import SurveyItemAdder from './SurveyItemAdder';
import SurveyItemList from './SurveyItemList';
import SurveyViewer, { SurveyViewerProps } from './SurveyViewer';

interface SurveyEditorProps extends SurveyViewerProps {
    preview?: boolean;
    previewHeader?: ReactNode;
    typeNameTextMap?: Map<SurveyItemType, string>;
    editorQuestionListItemRenderer?: (item: SurveyItem) => ReactNode;
    onHandleItemAdd: () => void;
}

interface SurveyEditorState {
    getSurvey: () => Survey;
}

const defaultSurveyItem = {
    title: '',
    type: 'shortAnswer',
    choiceList: [],
    required: false,
    intervalInfo: undefined,
} as SurveyItem;

const defaultSurvey = {
    title: '',
    description: '',
    itemList: [] as SurveyItem[],
} as Survey;

function SurveyEditorFunc(
    {
        preview,
        previewHeader,
        typeNameTextMap,
        survey,
        noItemMessage,
        backButtonText,
        nextButtonText,
        requiredText,
        styles,
        onClickBack,
        onClickNext,
        titleRenderer,
        descriptionRenderer,
        shortAnswerRenderer,
        longAnswerRenderer,
        multipleChoiceRenderer,
        intervalPointRenderer,
    }: SurveyEditorProps,
    ref?: Ref<SurveyEditorState>
) {
    const [currentSurvey, setCurrentSurvey] = useState<Survey>(survey || { ...defaultSurvey });
    const [selectedSurveyItem, setSelectedSurveyItem] = useState<SurveyItem>({
        ...defaultSurveyItem,
    });
    const [nowEdit, setNowEdit] = useState(false);

    const onHandleClickAddItem = () => {
        let index = currentSurvey.itemList.findIndex((o) => o == selectedSurveyItem);
        if (index == -1) {
            currentSurvey.itemList.push(selectedSurveyItem);
        } else {
            currentSurvey.itemList.splice(index, 1, { ...selectedSurveyItem });
        }

        setSelectedSurveyItem({
            ...defaultSurveyItem,
        });
        setCurrentSurvey({ ...currentSurvey });
        setNowEdit(false);
    };

    const onHandleClickEdit = (surveyItem: SurveyItem) => {
        setSelectedSurveyItem(surveyItem);
        setNowEdit(true);
    };

    const onHandleClickDelete = (surveyItem: SurveyItem) => {
        let index = currentSurvey.itemList.findIndex((o) => surveyItem);
        currentSurvey.itemList.splice(index, 1);

        setCurrentSurvey({ ...currentSurvey, itemList: [...currentSurvey.itemList] });
        setNowEdit(true);
    };

    const onHandleCancelEdit = () => {
        setNowEdit(false);
        setSelectedSurveyItem({ ...defaultSurveyItem });
    };

    useImperativeHandle(ref, () => ({
        getSurvey: () => {
            return currentSurvey;
        },
    }));

    useEffect(() => {
        if (survey) setCurrentSurvey(survey);
        else setCurrentSurvey({ ...defaultSurvey });
    }, [survey]);

    return (
        <Box
            sx={
                getStyleFromExternal(StyleKey.rootContainer, styles) || {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }
            }
        >
            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Stack spacing={1} sx={
                            getStyleFromExternal(StyleKey.editorContainer, styles) ||
                            { p: '10px', textAlign: 'center' }
                        }>
                            <TextField
                                label="title"
                                fullWidth
                                size="small"
                                value={currentSurvey.title || ''}
                                sx={getStyleFromExternal(StyleKey.editorTitleTextField, styles)}
                                onChange={(o) => {
                                    setCurrentSurvey({ ...currentSurvey, title: o.target.value });
                                }}
                            />
                            <TextField
                                multiline
                                fullWidth
                                size='small'
                                minRows={4}
                                label="description"
                                sx={getStyleFromExternal(StyleKey.editorDescriptionTextField, styles)}
                                value={currentSurvey.description || ''}
                                onChange={(o) => {
                                    setCurrentSurvey({
                                        ...currentSurvey,
                                        description: o.target.value,
                                    });
                                }}
                            />
                        </Stack>
                        <SurveyItemList
                            survey={currentSurvey}
                            styles={styles}
                            typeNameTextMap={typeNameTextMap}
                            onHandleClickDelete={onHandleClickDelete}
                            onHandleClickEdit={onHandleClickEdit}
                        />
                    </Grid>
                    {preview && (
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ p: '15px' }}>
                            <Card>
                                <CardHeader>{previewHeader}</CardHeader>
                                <CardContent>
                                    <SurveyViewer 
                                        survey={currentSurvey}
                                        {...{
                                            noItemMessage,
                                            backButtonText,
                                            nextButtonText,
                                            requiredText,
                                            styles,
                                            onClickBack,
                                            onClickNext,
                                            titleRenderer,
                                            descriptionRenderer,
                                            shortAnswerRenderer,
                                            longAnswerRenderer,
                                            multipleChoiceRenderer,
                                            intervalPointRenderer,
                                        }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <SurveyItemAdder
                typeNameTextMap={typeNameTextMap}
                selectedSurveyItem={selectedSurveyItem}
                isEdit={nowEdit}
                onHandleCancelEdit={onHandleCancelEdit}
                setSelectedSurveyItem={setSelectedSurveyItem}
                onHandleAddItem={onHandleClickAddItem}
            />
        </Box>
    );
}

const SurveyEditor = forwardRef<SurveyEditorState, SurveyEditorProps>(SurveyEditorFunc);
SurveyEditor.defaultProps = {
    typeNameTextMap: new Map<SurveyItemType, string>([
        [SurveyItemType.shortAnswer, 'Short answer'],
        [SurveyItemType.longAnswer, 'Long answer'],
        [SurveyItemType.multipleChoice, 'Multipli choice'],
        [SurveyItemType.intervalPoint, 'Interval point'],
    ]),
};
export default SurveyEditor;
