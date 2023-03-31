import { Edit, DeleteForever } from '@mui/icons-material';
import { Stack, Typography, FormControlLabel, Switch, IconButton, SxProps, Theme } from '@mui/material';
import React, { ReactNode } from 'react';
import { getStyleFromExternal, StyleKey } from '../models/style';
import { Survey, SurveyItem, SurveyItemType } from '../models/Survey';

interface SurveyItemListProps {
    survey: Survey;
    typeNameTextMap: Map<SurveyItemType, string>;
    styles?: Map<keyof typeof StyleKey, SxProps<Theme>>;
    onHandleClickEdit: (item: SurveyItem) => void;
    onHandleClickDelete: (item: SurveyItem) => void;
    editorQuestionListItemRenderer?: (item: SurveyItem) => ReactNode;
}

function SurveyItemList({
    survey,
    typeNameTextMap,
    styles,
    onHandleClickEdit,
    onHandleClickDelete,
    editorQuestionListItemRenderer,
}: SurveyItemListProps) {
    return (
        <Stack spacing={1} sx={getStyleFromExternal(StyleKey.editorQuestionListContainer, styles)}>
            {survey.itemList.map((o) => {
                if (editorQuestionListItemRenderer) return editorQuestionListItemRenderer(o);

                return (
                    <Stack spacing={1} direction={'row'} sx={
                        getStyleFromExternal(StyleKey.editorQuestionListItemContainer, styles) ||
                        { alignItems: 'center', p: '5px' }
                    }>
                        <Typography variant="subtitle1" sx={getStyleFromExternal(StyleKey.editorQuestionListItemTitle, styles)}>{o.title}</Typography>
                        <Typography variant="subtitle2" sx={getStyleFromExternal(StyleKey.editorQuestionListItemType, styles)}>
                            {typeNameTextMap && typeNameTextMap.get(SurveyItemType[o.type])}
                        </Typography>
                        <FormControlLabel
                            control={<Switch sx={getStyleFromExternal(StyleKey.editorQuestionListItemSwitch, styles)} checked={o.required} />}
                            label={'Required'}
                            disabled
                        />
                        <IconButton
                            color="info"
                            sx={getStyleFromExternal(StyleKey.editorQuestionListItemEditButton, styles)}
                            onClick={() => {
                                onHandleClickEdit(o);
                            }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            color="error"
                            sx={getStyleFromExternal(StyleKey.editorQuestionListItemDeleteButton, styles)}
                            onClick={() => {
                                onHandleClickDelete(o);
                            }}
                        >
                            <DeleteForever />
                        </IconButton>
                    </Stack>
                );
            })}
        </Stack>
    );
}

export default SurveyItemList;
