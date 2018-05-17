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
		time: ''
	}];
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
	];

	constructor(public notificationBar: MatSnackBar) {

	}

	openNotificationbar(message: string, action: string) {
		this.notificationBar.open(message, action, {
			duration: 5000,
		});
	}

	getTime(time): void {
		console.log('user entered time is', time);
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
		if (this.userLogEfforts[index].project_name && this.userLogEfforts[index].task_name) { //&& this.time => needs fix
			//push an empty object
			this.userLogEfforts.push({
				project_name: '',
				skill_set: '',
				task_name: '',
				time: ''
			});
			this.userLogEfforts = this.filterUserEffort(this.userLogEfforts);
			console.log('user filled data after filter is', this.userLogEfforts);
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

	postUserEffort(state): void {
		let postUserData = [];
		this.userLogEfforts.forEach(function (item) {
			if (item.project_name !== '' && item.task_name !== '') {
				postUserData.push(item);
			}
		});
		postUserData = this.filterUserEffort(postUserData);
		if(!postUserData.length && this.userLogEfforts.length){ // just to avoid the display of redundant data on screen
			//do nothing
		} else {
			this.userLogEfforts = postUserData; 
		}
		console.log('post data is ', postUserData);
		if (postUserData.length) {
			//post data to the server
			if (state === 'save') {
				// save the data
				this.openNotificationbar('Effort data saved successfully!', 'Close');
			} else if (state === 'submit') { //check for the total time 
				//sunmit the data
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
