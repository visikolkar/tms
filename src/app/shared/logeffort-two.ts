interface JobTaskInterface {
    isPrimarySkill: boolean;
    isSecondarySkill: boolean;
    jobTaskName: string;
    time: string;
}

interface WorkStatusInterface {
    projectName: string;
    jobTask: JobTaskInterface[];
}

interface EffortInterface {
    irisTime: string;
    date: Date;
    day: string;
    isSubmitted: boolean;
    isApproved: boolean;
    isSelfRejected: boolean;
    comments: string;
    manDayStatus: string;
    totalLogTime: string;
    timeSheet: WorkStatusInterface[];
}

export class LogeffortTwo {
    weekNumber: Number;
    lastFilledDate: Date;
    approvedDate: Date;
    effort: EffortInterface[];
}