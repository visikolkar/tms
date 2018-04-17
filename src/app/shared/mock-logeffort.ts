import { Logeffort } from './logeffort';

export const LOGEFFORTS: Logeffort = {
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
        timeSheet: {
            common: [{
                projectName: "Common",
                jobTaskName: "Innovation and Tools",
                time: "2:30"
            }, {
                projectName: "Common",
                jobTaskName: "Leave",
                time: "2:30"
            }],
            modelDevelopment: [{
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
            }],
            comments: "Life's Good"
        }
    }, {
        irisTime: "09:00 Hours",
        date: new Date(2018, 3, 9),
        day: "Monday",
        isSubmitted: false,
        isApproved: false,
        isSelfRejected: false,
        timeSheet: {
            common: [{
                projectName: "Common",
                jobTaskName: "Innovation and Tools",
                time: "2:30"
            }],
            modelDevelopment: [{
                projectName: "Project D",
                jobTask: [{
                    jobTaskName: "Task C",
                    isPrimarySkill: true,
                    isSecondarySkill: false,
                    time: "3:00"
                }]
            }, {
                projectName: "Project B",
                jobTask:[{
                    jobTaskName: "Task A",
                    isPrimarySkill: true,
                    isSecondarySkill: false,
                    time: "4:00"
                }]
            }],
            comments: "Life's Good"
        }
    }]
}