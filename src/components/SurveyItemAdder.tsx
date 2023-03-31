import { DeleteForever, Add } from '@mui/icons-material';
import {
    Stack,
    TextField,
    MenuItem,
    Button,
    Fade,
    Box,
    Card,
    CardContent,
    Switch,
    IconButton,
    FormControlLabel,
    Typography,
    Alert,
} from '@mui/material';
import React, { useState } from 'react';
import { Choice, SurveyItem, SurveyItemType } from '../models/Survey';

interface SurveyItemAdderProps {
    typeNameTextMap: Map<SurveyItemType, string>;
    selectedSurveyItem: SurveyItem;
    isEdit?: boolean;
    onHandleCancelEdit?: () => void;
    setSelectedSurveyItem: (selectedSurveyItem: SurveyItem) => void;
    onHandleAddItem: () => void;
}

const defaultChoice = {
    content: '',
    hasShortAnswer: false,
} as Choice;

function SurveyItemAdder({
    typeNameTextMap,
    selectedSurveyItem,
    isEdit,
    onHandleCancelEdit,
    setSelectedSurveyItem,
    onHandleAddItem,
}: SurveyItemAdderProps) {
    const [editingChoice, setEditingChoice] = useState<Choice>({ ...defaultChoice });

    const onHandleAddChoice = () => {
        let choiceList = selectedSurveyItem.choiceList || [];
        choiceList.push(editingChoice);

        setEditingChoice({ ...defaultChoice });
        setSelectedSurveyItem({
            ...selectedSurveyItem,
            choiceList,
        });
    };

    return (
        <Stack spacing={1} sx={{ width: '100%' }}>
            {isEdit && (
                <Alert color="warning" onClose={onHandleCancelEdit}>
                    {'Now Editing...'}
                </Alert>
            )}
            <Stack spacing={1} direction="row" sx={{ display: 'flex', p: '5px' }}>
                <TextField
                    size="small"
                    label={'Title'}
                    fullWidth
                    value={selectedSurveyItem.title}
                    onChange={(e) => {
                        setSelectedSurveyItem({ ...selectedSurveyItem, title: e.target.value });
                    }}
                />
                <TextField
                    select
                    size="small"
                    label={'Type'}
                    fullWidth
                    value={selectedSurveyItem.type}
                    onChange={(e) => {
                        setSelectedSurveyItem({
                            ...selectedSurveyItem,
                            type: e.target.value as keyof typeof SurveyItemType,
                        });
                    }}
                >
                    {Object.keys(SurveyItemType)
                        .filter((o) => isNaN(parseInt(o)))
                        .map((o) => {
                            let text = typeNameTextMap && typeNameTextMap.get(SurveyItemType[o]);
                            if (text) {
                                return <MenuItem value={o}>{text}</MenuItem>;
                            }
                        })}
                </TextField>
                <FormControlLabel
                    control={
                        <Switch
                            checked={selectedSurveyItem.required}
                            onChange={(o, checked) => {
                                setSelectedSurveyItem({ ...selectedSurveyItem, required: checked });
                            }}
                        />
                    }
                    label={'Required'}
                />
                {isEdit && (
                    <Button color="success" variant="contained" onClick={onHandleAddItem}>
                        {'Edit'}
                    </Button>
                )}
                {!isEdit && (
                    <Button color="success" variant="contained" onClick={onHandleAddItem}>
                        {'Add'}
                    </Button>
                )}
            </Stack>
            {SurveyItemType[selectedSurveyItem.type] == SurveyItemType.multipleChoice && (
                <Fade in={SurveyItemType[selectedSurveyItem.type] == SurveyItemType.multipleChoice}>
                    <Box>
                        <Card>
                            <CardContent>
                                <Stack spacing={1}>
                                    {(selectedSurveyItem.choiceList || []).map((o) => {
                                        return (
                                            <Stack direction={'row'} spacing={1}>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={o.content}
                                                    onChange={(e) => {
                                                        o.content = e.target.value;
                                                        setSelectedSurveyItem({
                                                            ...selectedSurveyItem,
                                                        });
                                                    }}
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={o.hasShortAnswer}
                                                            onChange={(e, checked) => {
                                                                o.hasShortAnswer = checked;
                                                                setSelectedSurveyItem({
                                                                    ...selectedSurveyItem,
                                                                });
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Typography
                                                            variant="overline"
                                                            sx={{ whiteSpace: 'nowrap' }}
                                                        >
                                                            {'Has short answer'}
                                                        </Typography>
                                                    }
                                                />
                                                <IconButton>
                                                    <DeleteForever />
                                                </IconButton>
                                            </Stack>
                                        );
                                    })}
                                    <Stack direction={'row'} spacing={1}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            value={editingChoice.content}
                                            onChange={(e) => {
                                                setEditingChoice({
                                                    ...editingChoice,
                                                    content: e.target.value,
                                                });
                                            }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={editingChoice.hasShortAnswer}
                                                    onChange={(e, checked) => {
                                                        setEditingChoice({
                                                            ...editingChoice,
                                                            hasShortAnswer: checked,
                                                        });
                                                    }}
                                                />
                                            }
                                            label={
                                                <Typography
                                                    variant="overline"
                                                    sx={{ whiteSpace: 'nowrap' }}
                                                >
                                                    {'Has short answer'}
                                                </Typography>
                                            }
                                        />
                                        <IconButton onClick={onHandleAddChoice} color="success">
                                            <Add />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                </Fade>
            )}
        </Stack>
    );
}

export default SurveyItemAdder;
