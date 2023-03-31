export enum SurveyItemType {
    shortAnswer,
    multipleChoice,
    longAnswer,
    intervalPoint,
}

export interface Choice {
    content: string;
    hasShortAnswer?: boolean;
}

export interface IntervalInfo {
    min: number;
    max: number;
    interval: number;
    minText: string;
    maxText: string;
}

export interface SurveyItem {
    required?: boolean;
    title: string;
    choiceList?: Choice[];
    type: keyof typeof SurveyItemType;
    intervalInfo?: IntervalInfo;
}

export interface Survey {
    title: string;
    description: string;
    itemList: SurveyItem[];
}
