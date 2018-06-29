interface WorkStatusInterface {
    project_name: string;
    skill_set: string;
    task_name: string;
    hours: string;
    mins: string;
}

interface EffortInterface {
    iris_time: string;
    iris_date: string;
    day: string;
    filled_state:string;
    isActive: boolean;
    comments: string;
    total_log_time: string;
    effort: WorkStatusInterface[];
}

export class LogeffortTwo {
    week_number: string;
    time_sheet: EffortInterface[];
}