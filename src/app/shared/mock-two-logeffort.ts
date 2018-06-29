import { LogeffortTwo } from './logeffort-two';

export const LOGEFFORTSTWO: LogeffortTwo = {
    week_number: "15",
    time_sheet: [{
        iris_time: "09:15 Hours",
        iris_date: "Tue Apr 9",
        day: "Sunday",
        filled_state: "0",
        isActive: false,
        comments: "Life's Good",
        total_log_time: "8:59 Hours",
        effort: [{
            project_name: '',
            skill_set: '',
            task_name: '',
            hours: '00',
            mins: '00'
        }]
    },{
        iris_time: "09:15 Hours",
        iris_date: "Tue Apr 10",
        day: "Sunday",
        filled_state: "2",
        isActive: true,
        comments: "Life's Good",
        total_log_time: "8:59 Hours",
        effort: [{
                project_name: 'Project A',
                skill_set: 'Primary Skill',
                task_name: 'Task A',
                hours: '01',
                mins: '00'
            }, {
                project_name: 'Common',
                skill_set: '',
                task_name: 'Innovation and Tools',
                hours: '01',
                mins: '00'
            }]
    }, {
        iris_time: "09:15 Hours",
        iris_date: "Tue Apr 11",
        day: "Sunday",
        filled_state: "1",
        isActive: false,
        comments: "Life's Good",
        total_log_time: "8:59 Hours",
        effort: [{
                project_name: 'Project B',
                skill_set: 'Secondary Skill',
                task_name: 'Task B',
                hours: '01',
                mins: '00'
            }, {
                project_name: 'Common',
                skill_set: '',
                task_name: 'Innovation and Tools',
                hours: '01',
                mins: '00'
            }, {
                project_name: '00',
                skill_set: '00',
                task_name: '00',
                hours: '00',
                mins: '00'
            }]
    }]
}