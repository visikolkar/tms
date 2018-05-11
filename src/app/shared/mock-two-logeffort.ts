import { LogeffortTwo } from './logeffort-two';

export const LOGEFFORTSTWO: LogeffortTwo = {
    weekNumber: 15,
    lastFilledDate: new Date(2018, 3, 7),
    approvedDate: new Date(2018, 3, 1),
    effort: [{
        irisTime: "09:15 Hours",
        date: new Date(2018, 3, 8),
        day: "Sunday",
        isSubmitted: true,
        isApproved: false,
        isSelfRejected: false,
        comments: "Life's Good",
        manDayStatus: "90",
        totalLogTime: "8:59 Hours",
        timeSheet: [{
            projectName: "Common",
            jobTask: [{
                isPrimarySkill: false,
                isSecondarySkill: false,
                jobTaskName: "Innovation and Tools",
                time: "2:30"
            }, {
                isPrimarySkill: false,
                isSecondarySkill: false,
                jobTaskName: "Leave",
                time: "2:30"
            }]
        }, {
            projectName: "Project A",
            jobTask: [{
                jobTaskName: "Task B",
                isPrimarySkill: true,
                isSecondarySkill: false,
                time: "3:00"
            }, {
                jobTaskName: "Task D",
                isPrimarySkill: false,
                isSecondarySkill: true,
                time: "1:00"
            }]
        }, {
            projectName: "Project B",
            jobTask: [{
                jobTaskName: "Task A",
                isPrimarySkill: false,
                isSecondarySkill: true,
                time: "4:00"
            }]
        }]
    }]
}