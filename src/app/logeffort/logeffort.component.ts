import { Component, OnInit } from '@angular/core';
import { Logeffort } from '../shared/logeffort';
import { LOGEFFORTS } from '../shared/mock-logeffort';
import { LogeffortTwo } from '../shared/logeffort-two';
import { LOGEFFORTSTWO } from '../shared/mock-two-logeffort';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-logeffort',
    templateUrl: './logeffort.component.html',
    styleUrls: ['./logeffort.component.css']
})
export class LogeffortComponent implements OnInit {

    windowheight: any;
    logefforts: any;
    logeffortstwo: any;
    projectName: string;
    skillSet: string;
    taskName: string;
    time: string;
    panelOpenState: boolean = false;
    //disableSelect: boolean;
    // userLogEffort = {
    // 	project_name: '',
    // 	skill_set: '',
    // 	task_name: '',
    // 	time: ''
    // };
    userLogEfforts = [{
        project_name: '',
        skill_set: '',
        task_name: '',
        hours: '00',
        mins: '00'
    }];
    userLogEffortSummary = [];
    postUserData = [];
    /*  projects,
        tasks,
        commonTasks ==> will be fetched thrupgh a seperate api call
    */
    projects = [
        { value: 'Project A', viewValue: 'Project A' },
        { value: 'Project B', viewValue: 'Project B' },
        { value: 'Project C', viewValue: 'Project C' },
        { value: 'Project D', viewValue: 'Project D' },
        { value: 'Common', viewValue: 'Common' }
    ];
    projectTasks = [
        { value: 'Task A', viewValue: 'Task A' },
        { value: 'Task B', viewValue: 'Task B' },
        { value: 'Task C', viewValue: 'Task C' },
        { value: 'Task D', viewValue: 'Task D' },
    ];
    commonTasks = [
        { value: 'Innovation and Tools', viewValue: 'Innovation and Tools' },
        { value: 'Learning and Development', viewValue: 'Learning and Development' },
        { value: 'Leave', viewValue: 'Leave' },
    ];

    constructor(public notificationBar: MatSnackBar) {

    }

    openNotificationbar(message: string, action: string) {
        this.notificationBar.open(message, action, {
            duration: 5000,
        });
    }

    getEffortTime(time, state, index): void {
        console.log('user entered time is', time);
        if (state === "hours" && (Number(time) >= 24 || Number(time) < 0)) {
            this.userLogEfforts[index].hours = '';
            this.openNotificationbar('Enter value between 0 and 23!', 'Close');
        } else if (state === "mins" && (Number(time) >= 60 || Number(time) < 0)) {
            this.userLogEfforts[index].mins = '';
            this.openNotificationbar('Enter value between 0 and 23!', 'Close');
        }
    }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    disableOption(selected, index): void {
        console.log('selected value is', selected);
        if (selected.value === 'Common') {
            //this.disableSelect = true;
            this.userLogEfforts[index].skill_set = '';
        } else {
            //this.disableSelect = false;
        }
    }

    addUserEffort(index): void {
        if (this.userLogEfforts[index].project_name && this.userLogEfforts[index].task_name && (this.userLogEfforts[index].hours !=='00' || this.userLogEfforts[index].mins !== '00')) {
            //push an empty object
            this.userLogEfforts.push({
                project_name: '',
                skill_set: '',
                task_name: '',
                hours: '00',
                mins: '00'
            });
            this.userLogEfforts = this.filterUserEffort(this.userLogEfforts);
            console.log('user filled data after filter is', this.userLogEfforts);
            this.userLogEffortSummary = this.summerizeUserEffort(this.userLogEfforts);
            this.postUserData = this.prepareUserEffort(this.userLogEfforts);
        } else {
            //show an alert to fill required fields
            this.openNotificationbar('Fill all the required fields!', 'Close');
        }

    }

    filterUserEffort(array): any {
        //this will retun an array of unique objects
        return array = array.filter((item, index, self) =>
            index === self.findIndex((obj) =>
                obj.project_name === item.project_name && obj.skill_set === item.skill_set && obj.task_name === item.task_name)
        );
    }

    deleteUserEffort(index): void {
        this.userLogEfforts.splice(index, 1);
        console.log('user data after delete is', this.userLogEfforts);
    }

    prepareUserEffort(array): any {
        let self = this;
        let prepareArray = [];
        array.forEach(function (item) {
            if (item.project_name !== '' && item.task_name !== '' && (item.hours !== '00' || item.mins !== '00')) {
                prepareArray.push(item);
            }
        });
        prepareArray = this.filterUserEffort(prepareArray);
        return prepareArray;
    }

    minsToHours(hours, mins): any {
        var total = (hours * 60 + mins) / 60;
        console.log("total is", total);
        var h = total.toString().split('.')[0];
        if (total.toString().split('.')[1]) {
            var m = "0." + total.toString().split('.')[1];
        } else {
            var m = "0";
        }
        console.log("h is", h);
        console.log("m is", m);
        m = (+m * 60).toFixed(0);
        if (m.toString().length > 1) {
            var t = h + ':' + m
        } else {
            var t = h + ':0' + m
        }
        return t;
    }

    summerizeUserEffort(array): any {
        let self = this;
        array.forEach(function (val) {
            val.task = [{ skill_set: val.skill_set, task_name: val.task_name, hours: val.hours, mins: val.mins }];
        });

        var output = [];

        array.forEach(function (value) {
            console.log('output is', output);
            var existing = output.filter(function (v, i) {
                return v.project_name == value.project_name;
            });
            console.log('existing is', existing);
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].task = output[existingIndex].task.concat(value.task);
            } else {
                output.push(value);
            }
        });

        console.log('final output is', output);
        output = this.prepareUserEffort(output);
        output.forEach(function (item) {
            if (item.task.length > 1) {
                var totalHours = item.task.reduce(function (v, n) {
                    return +v.hours + +n.hours;
                });
                var totalMins = item.task.reduce(function (v, n) {
                    return +v.mins + +n.mins;
                });

                item.time = self.minsToHours(totalHours, totalMins);
            } else {
                item.time = self.minsToHours(+item.task[0].hours, +item.task[0].mins);
            }

        })
        return output;

    }

    postUserEffort(state): void {
        this.postUserData = this.prepareUserEffort(this.userLogEfforts);
        this.userLogEffortSummary = this.summerizeUserEffort(this.postUserData);
        if (!this.postUserData.length && this.userLogEfforts.length) { // just to avoid the display of redundant data on screen
            //do nothing
        } else {
            this.userLogEfforts = this.postUserData;
        }
        console.log('post data is ', this.postUserData);
        if (this.postUserData.length) {
            //post data to the server
            if (state === 'save') {
                // save the data
                this.openNotificationbar('Effort data saved successfully!', 'Close');
            } else if (state === 'submit') { //check for the total time 
                //submit the data
                this.openNotificationbar('Effort data submitted successfully!', 'Close');
            } else {
                // do nothing
            }
        } else {
            //no data availble to post
            this.openNotificationbar('No effort data available!', 'Close');
        }
    }

    ngOnInit() {
        this.windowheight = (60 * window.screen.height) / 100;
        //Math.floor(400 / window.screen.height * 100);
        console.log("window height " + this.windowheight);

        this.logefforts = LOGEFFORTSTWO;

        //this.logeffortstwo = LOGEFFORTSTWO;

        //console.log('log effort two is ', this.logeffortstwo);

    }

}
