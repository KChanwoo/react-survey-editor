import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Stack,
    SxProps,
    TextareaAutosize,
    TextField,
    Theme,
    Typography,
    useTheme,
} from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleKey } from '../models/style';
import { IntervalInfo, Survey, SurveyItem, SurveyItemType } from '../models/Survey';

export interface SurveyViewerProps {
    survey?: Survey;
    answeredList?: string[];
    noItemMessage?: string;
    backButtonText?: string;
    nextButtonText?: string;
    requiredText?: string;
    styles?: Map<keyof typeof StyleKey, SxProps<Theme>>;
    onClickBack?: () => void;
    onClickNext?: (answerList: string[]) => void;
    titleRenderer?: (title: string) => ReactNode;
    descriptionRenderer?: (description: string) => ReactNode;
    shortAnswerRenderer?: (
        item: SurveyItem,
        answer: string,
        setAnswer: (newAnswer: string) => void
    ) => ReactNode;
    longAnswerRenderer?: (
        item: SurveyItem,
        answer: string,
        setAnswer: (newAnswer: string) => void
    ) => ReactNode;
    multipleChoiceRenderer?: (
        item: SurveyItem,
        answer: string,
        setAnswer: (newAnswer: string) => void
    ) => ReactNode;
    intervalPointRenderer?: (
        item: SurveyItem,
        answer: string,
        setAnswer: (newAnswer: string) => void
    ) => ReactNode;
}

function SurveyViewer({
    survey,
    answeredList,
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
}: SurveyViewerProps) {
    const theme = useTheme();

    const [answerList, setAnswerList] = useState<string[]>([]);
    const [requiredIsEmptyError, setRequiredIsEmptyError] = useState(false);

    const createIntervalArray = (intervalInfo: IntervalInfo) => {
        let array = [];
        for (let i = intervalInfo.min; i <= intervalInfo.max; i = i + intervalInfo.interval) {
            array.push(i);
        }

        return array;
    };

    const onValid = () => {
        if (survey) {
            return survey.itemList.every((o, i) => {
                let answer = answerList[i];
                return !o.required || (answer && answer.trim().length > 0);
            });
        }

        return true;
    };

    const onHandleClickNext = () => {
        setRequiredIsEmptyError(false);
        if (onValid() && onClickNext) {
            onClickNext(answerList);
        } else {
            setRequiredIsEmptyError(true);
        }
    };

    const renderQuestions = (o: SurveyItem, qNumber: number) => {
        let answer = answerList[qNumber];
        let question: ReactNode;
        if (SurveyItemType[o.type] == SurveyItemType.shortAnswer) {
            let onChangeAnswer = (newAnswer: string) => {
                answerList[qNumber] = newAnswer;
                setAnswerList([...answerList]);
            };

            if (shortAnswerRenderer) {
                return shortAnswerRenderer(o, answer, onChangeAnswer);
            }

            question = (
                <TextField
                    size="small"
                    fullWidth
                    value={answer}
                    onChange={(e) => {
                        onChangeAnswer(e.target.value);
                    }}
                />
            );
        } else if (SurveyItemType[o.type] == SurveyItemType.longAnswer) {
            let onChangeAnswer = (newAnswer: string) => {
                answerList[qNumber] = newAnswer;
                setAnswerList([...answerList]);
            };

            if (longAnswerRenderer) {
                return longAnswerRenderer(o, answer, onChangeAnswer);
            }

            question = (
                <TextField
                    multiline
                    fullWidth
                    size='small'
                    minRows={3}
                    value={answer}
                    onChange={(e) => {
                        onChangeAnswer(e.target.value);
                    }}
                />
            );
        } else if (SurveyItemType[o.type] == SurveyItemType.multipleChoice) {
            let onChangeAnswer = (newAnswer: string) => {
                answerList[qNumber] = newAnswer;
                setAnswerList([...answerList]);
            };

            if (multipleChoiceRenderer) {
                return multipleChoiceRenderer(o, answer, onChangeAnswer);
            }

            question = (
                <Stack spacing={1}>
                    {o.choiceList.map((e, choiceNumber) => {
                        let checked =
                            answer &&
                            answer.split(',').find((o) => o == choiceNumber.toString()) !=
                                undefined;
                        return (
                            <Box
                                sx={{
                                    height: '40px',
                                    display: 'flex',
                                    px: '5px',
                                    alignItems: 'center',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(e, checked) => {
                                                let choiceAnswerList = answer
                                                    ? answer.split(',')
                                                    : [];
                                                let index = choiceAnswerList.findIndex(
                                                    (o) => o == choiceNumber.toString()
                                                );
                                                if (checked) {
                                                    choiceAnswerList.push(choiceNumber.toString());
                                                } else if (index > -1) {
                                                    choiceAnswerList.splice(index, 1);
                                                }
                                                onChangeAnswer(choiceAnswerList.join(','));
                                            }}
                                        />
                                    }
                                    label={e.content}
                                />
                                {e.hasShortAnswer && <TextField size="small" sx={{ ml: '5px' }} />}
                            </Box>
                        );
                    })}
                </Stack>
            );
        } else if (SurveyItemType[o.type] == SurveyItemType.intervalPoint) {
            let onChangeAnswer = (newAnswer: string) => {
                answerList[qNumber] = newAnswer;
                setAnswerList([...answerList]);
            };

            if (intervalPointRenderer) {
                return intervalPointRenderer(o, answer, onChangeAnswer);
            }

            question = (
                <Box sx={{ px: '20px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {createIntervalArray(o.intervalInfo).map((score, i) => {
                            let clicked = answer == score.toString();
                            return (
                                <Box>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            width: '40px',
                                            height: '40px',
                                            background: clicked
                                                ? theme.palette.success.light
                                                : undefined,
                                            color: clicked ? 'white' : undefined,
                                            '&:hover': {
                                                background: clicked
                                                    ? theme.palette.success.dark
                                                    : undefined,
                                            },
                                        }}
                                        color={clicked ? 'success' : undefined}
                                        onClick={() => {
                                            onChangeAnswer(score.toString());
                                        }}
                                    >
                                        {score}
                                    </IconButton>
                                    {score == o.intervalInfo.min && (
                                        <Typography
                                            component="p"
                                            variant="overline"
                                            sx={{ textAlign: 'center' }}
                                        >
                                            {o.intervalInfo.minText}
                                        </Typography>
                                    )}
                                    {score + o.intervalInfo.interval > o.intervalInfo.max && (
                                        <Typography
                                            component="p"
                                            variant="overline"
                                            sx={{ textAlign: 'center' }}
                                        >
                                            {o.intervalInfo.maxText}
                                        </Typography>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            );
        }

        return (
            <Box sx={{ py: '10px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {o.required && '* '}
                    {o.title}
                </Typography>
                {requiredIsEmptyError && o.required && <Alert color="error">{requiredText}</Alert>}
                {question}
            </Box>
        );
    };

    useEffect(() => {
        if (survey) {
            if (answeredList) setAnswerList(answeredList);
            else setAnswerList(Array.from(survey.itemList, () => ''));
        }
    }, [survey, answeredList]);

    useEffect(() => {
        console.log(answerList);
    }, [answerList]);

    return (
        <Box>
            {survey && (
                <Box>
                    <Box sx={{ p: '10px', mb: '30px' }}>
                        {titleRenderer && titleRenderer(survey.title)}
                        {!titleRenderer && <Typography variant="h4">{survey.title}</Typography>}
                        {descriptionRenderer && descriptionRenderer(survey.description)}
                        {!descriptionRenderer && (
                            <Typography variant="body1">{survey.description}</Typography>
                        )}
                    </Box>
                    <Stack spacing={1} sx={{ p: '15px' }}>
                        {survey.itemList.map((o, qNumber) => {
                            return renderQuestions(o, qNumber);
                        })}
                    </Stack>
                </Box>
            )}
            {!survey && <Box textAlign={'center'}>{noItemMessage}</Box>}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '10px',
                }}
            >
                <Box>
                    {onClickBack && (
                        <Button variant="contained" color="info" onClick={onClickBack}>
                            {backButtonText}
                        </Button>
                    )}
                    <Button sx={{ ml: '5px' }} color="warning" onClick={onClickBack}>
                        {'Init'}
                    </Button>
                </Box>
                {onClickNext && (
                    <Button variant="contained" color="success" onClick={onHandleClickNext}>
                        {nextButtonText}
                    </Button>
                )}
            </Box>
        </Box>
    );
}

SurveyViewer.defaultProps = {
    noItemMessage: 'No items',
    backButtonText: 'Back',
    nextButtonText: 'Next',
    requiredText: 'This question is required',
};

export default SurveyViewer;
