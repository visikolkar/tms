import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Logeffort } from '../shared/logeffort';
import { LOGEFFORTS } from '../shared/mock-logeffort';
import { LogeffortTwo } from '../shared/logeffort-two';
import { LOGEFFORTSTWO } from '../shared/mock-two-logeffort';
import { MatSnackBar } from '@angular/material';
import { STATE } from '../shared/config';
import { LogeffortService } from './logeffort.service';
import { LoaderService } from '../loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'app-logeffort',
    templateUrl: './logeffort.component.html',
    styleUrls: ['./logeffort.component.css']
})
export class LogeffortComponent implements OnInit {

    windowheight: any;
    logefforts: any;
    logeffortstwo: any;
    STATE: any;
    selected;
    selectedTab: number;
    projectName: string;
    skillSet: string;
    taskName: string;
    time: string;
    panelOpenState: boolean = false;
    employee: any;
    projects = [];
    projectTasks = [];
    commonTasks = [];
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

    constructor(public notificationBar: MatSnackBar, 
                private logeffortService: LogeffortService, 
                private loaderService: LoaderService, 
                private route: ActivatedRoute,
                private sharedService: SharedService
            ) { }

    openNotificationbar(message: string, action: string) {
        this.notificationBar.open(message, action, {
            duration: 5000,
        });
    }

    activeTab(array): any {
        return array.map(function (item) { return item.isActive; }).indexOf(true);
    }

    getEffortTime(time, state, index, arr): void {
        console.log('user entered time is', time);
        if (state === "hours" && (Number(time) >= 24 || Number(time) < 0)) {
            arr[index].hours = '';
            this.openNotificationbar('Enter value between 0 and 23!', 'Close');
        } else if (state === "mins" && (Number(time) >= 60 || Number(time) < 0)) {
            arr[index].mins = '';
            this.openNotificationbar('Enter value between 0 and 59!', 'Close');
        }
    }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    disableOption(selected, index, arr): void { //this function is not required
        console.log('selected value is', selected);
        if (selected.value === 'Common') {
            //this.disableSelect = true;
            arr[index].skill_set = '';
        } else {
            //this.disableSelect = false;
        }
    }

    addUserEffort(index, obj, j): void {
        console.log('adding item to the array ', obj);
        console.log('j value is ', j);
        var arr = obj.effort;
        if (arr[index].project_name && arr[index].task_name && (arr[index].hours !== '00' || arr[index].mins !== '00')) {
            //push an empty object
            arr.push({
                project_name: '',
                skill_set: '',
                task_name: '',
                hours: '00',
                mins: '00'
            });
            arr = this.filterUserEffort(arr);
            console.log('user filled data after filter is', arr);
            this.postUserData = this.prepareUserEffort(arr);
            
            obj.effort = arr;
            obj.summaryEffort = this.summerizeUserEffort(arr);
            console.log('summary array is ', obj.summaryEffort);
            console.log('this.logefforts before ', this.logefforts);
            this.logefforts.time_sheet.splice(j, 1, obj);
            console.log('this.logefforts is ', this.logefforts);
            this.logefforts.time_sheet = JSON.parse(JSON.stringify(this.logefforts.time_sheet));
            
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

    deleteUserEffort(index, obj, j): void {

        obj.effort.splice(index, 1);
        obj.summaryEffort = this.summerizeUserEffort(obj.effort);
        this.logefforts.time_sheet.splice(j, 1, obj);
        console.log('this.logefforts is ', this.logefforts);
        this.logefforts.time_sheet = JSON.parse(JSON.stringify(this.logefforts.time_sheet));
        console.log('user data after delete is', obj);
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

    summerizeUserEffort(arr): any {
        let self = this;
        var array = JSON.parse(JSON.stringify(arr)); //arr.map(x => Object.assign({}, x)); //deep copy of array (without reference) with this this.userLogEffort will not be effected
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
                    return v + +n.hours;
                }, 0);
                var totalMins = item.task.reduce(function (v, n) {
                    return v + +n.mins;
                }, 0);

                item.time = self.minsToHours(totalHours, totalMins);
            } else {
                item.time = self.minsToHours(+item.task[0].hours, +item.task[0].mins);
            }

        })
        return output;

    }

    totalLogTime(array): any {
        let self = this;
        //let arr = array.effort;//this.prepareUserEffort(array.effort);
        array.forEach(function(item){
            let arr = self.prepareUserEffort(item.effort);
            var totalHours = arr.reduce(function (v, n) {
                return v + +n.hours;
            }, 0);
            var totalMins = arr.reduce(function (v, n) {
                return v + +n.mins;
            }, 0);
            item.total_log_time = self.minsToHours(totalHours, totalMins);
        });
    }

    postData(state, obj, arr, message): void {
        var finalSubmitData = {
            emp_id: this.employee.empinfo.emp_id,
            iris_date: obj.iris_date,
            filled_state: state,
            effort: arr,
            comments: obj.comments
        };
        this.loaderService.show();
        this.logeffortService.postEffort(finalSubmitData, state)
            .subscribe(
                (response) => {
                    console.log('logeffort submit response is ', response);
                    if (response['status'] == 'true') {
                        console.log('response data is ', response['data']);
                        this.logefforts = this.effortSumarry(response['data']);
                        console.log('logeffort with summary after server call ', this.logefforts);
                        this.logefforts.time_sheet = JSON.parse(JSON.stringify(this.logefforts.time_sheet));
                        this.selectedTab = JSON.parse(JSON.stringify(this.activeTab(this.logefforts.time_sheet)));
                        // this.selected.setValue(this.selectedTab);
                        console.log('selectedTab is', this.selectedTab);
                        console.log('selectedTab is', this.selected);
                        this.openNotificationbar(message, 'Close');
                        this.sharedService.update(this.logefforts.color_dates);
                    } else {
                        this.openNotificationbar(response['message'], 'Close');
                    }
                }, (err) => {
                    console.error('logeffort submit error ', err);
                    this.loaderService.hide();
                }, () => {
                    this.loaderService.hide(); //on complete hide the loader
                }
            );
    }

    postUserEffort(state, obj): void {
        var arr = obj.effort;
        this.postUserData = this.prepareUserEffort(arr);
        console.log('post data is ', this.postUserData);
        if (this.postUserData.length) {
            //post data to the server
            if (state === STATE.SAVED) {
                // save the data
                console.log('save data is ', arr);
                var message = "Effort data Saved successfuly.!"
                this.postData(state, obj, this.postUserData, message);
            } else if (state === STATE.SUBMITTED) { //check for the total time 
                //submit the data
                if(obj.total_log_time > obj.iris_time.split(' ')[0] && obj.comments){
                    var message = "Effort data Submitted successfuly.!"
                    this.postData(state, obj, this.postUserData, message);
                } else{
                    this.openNotificationbar("Your total log time is more than IRIS Time. Please provide comments!", 'Close');
                }
            } else if (state === STATE.REJECTED) {
                // self rejection
                var message = "Effort data Rejected successfuly.!"
                this.postData(state, obj, this.postUserData, message);
            }
        } else {
            //no data availble to post
            this.openNotificationbar('No effort data available!', 'Close');
        }
    }

    postPrevNextWeek(weekNumber, year): void {
        this.loaderService.show();
        this.logeffortService.weekEffort(weekNumber, year)
            .subscribe(
                (response) => {
                    console.log('week logeffort response is ', response);
                    if (response['status'] == 'true') {
                        this.logefforts = this.effortSumarry(response['data']);
                        this.logefforts.time_sheet = JSON.parse(JSON.stringify(this.logefforts.time_sheet));
                        this.selectedTab = JSON.parse(JSON.stringify(this.activeTab(this.logefforts.time_sheet)));
                        // this.selected.setValue(this.selectedTab);
                        console.log('weekEffort selectedTab is', this.selectedTab);

                    } else {
                        this.openNotificationbar(response['message'], 'Close');
                    }
                }, (err) => {
                    console.error('logeffort submit error ', err);
                    this.loaderService.hide();
                }, () => {
                    this.loaderService.hide(); //on complete hide the loader
                }
            );
    }

    prevNextWeek(str): void {
        if(str === 'prev'){
            let weekNumber = this.logefforts.week_number - 1;
            let year = this.logefforts.time_sheet[0].iris_date.split("-")[2];
            this.postPrevNextWeek(weekNumber, year);
        } else if(str === 'next'){
            let weekNumber = this.logefforts.week_number + 1;
            let year = this.logefforts.time_sheet[0].iris_date.split("-")[2];
            this.postPrevNextWeek(weekNumber, year);
        }

    }

    effortSumarry(obj): any {
        var self = this;
        this.totalLogTime(obj.time_sheet);
        obj.time_sheet.forEach(function (item) {
            // if (item.effort.length) {
            //     item.summaryEffort = self.summerizeUserEffort(item.effort);
            // }
            var month = +item.iris_date.split('-')[1] -1 ;
            item.displayDate = new Date(item.iris_date.split('-')[2], month, item.iris_date.split('-')[0]).toDateString().slice(0,10);
            item.summaryEffort = self.summerizeUserEffort(item.effort);
        });
        console.log('logeffort with summary is ', obj);
        return obj;
    }

    ngOnInit() {
        this.windowheight = (60 * window.screen.height) / 100;
        //Math.floor(400 / window.screen.height * 100);
        console.log("window height " + this.windowheight);
        this.employee = JSON.parse(localStorage.getItem('employeeInfo'));

        this.route.data
            .subscribe((res: any) => {
                console.log('resolved logeffort is ', res);
                this.logefforts = this.effortSumarry(res.logeffort.data);
                this.selectedTab = this.activeTab(this.logefforts.time_sheet);
            });
        console.log('logeffort data is ', this.logefforts);

        this.route.data
            .subscribe((res: any) => {
                console.log('resolved projectTasks list is ', res);
                this.projects = res.projectTasks.data.projects;
                this.projectTasks = res.projectTasks.data.projectTasks;
                this.commonTasks = res.projectTasks.data.commonTasks;

            })
        
        // this.selected = new FormControl(this.selectedTab);

        // if (localStorage.getItem('logEffort')) {
        //     var obj = JSON.parse(localStorage.getItem('logEffort'))
        //     this.logefforts = this.effortSumarry(obj);
        //     this.selectedTab = this.activeTab(this.logefforts.time_sheet);
        // }
        this.STATE = STATE;

    }

}
