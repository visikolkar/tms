interface CommonInterface {
    projectName: string;
    jobTaskName: string;
    time: string;
}

interface ModelJobTaskInterface {
    isPrimarySkill: boolean;
    isSecondarySkill: boolean;
    jobTaskName: string;
    time: string;
}

interface ModelDevelopmentInterface {
    projectName: string;
    jobTask: ModelJobTaskInterface[];
}

interface EffortInterface {
    irisTime: string;
    date: Date;
    day: string;
    isSubmitted: boolean;
    isApproved: boolean;
    isSelfRejected: boolean;
    timeSheet: {
        common: CommonInterface[];
        modelDevelopment: ModelDevelopmentInterface[];
        comments: string;
    };
}

export class Logeffort {
    weekNumber: Number;
    lastFilledDate: Date;
    approvedDate: Date;
    effort: EffortInterface[];
}