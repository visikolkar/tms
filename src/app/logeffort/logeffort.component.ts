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
		{ value: 'Common', viewValue: 'Common'}
    ];
    projectTasks = [
		{ value: 'Task A', viewValue: 'Task A' },
		{ value: 'Task B', viewValue: 'Task B' },
		{ value: 'Task C', viewValue: 'Task C' },
		{ value: 'Task D', viewValue: 'Task D' },
    ];
    commonTasks = [
		{ value: 'Innovation and Tools', viewValue: 'Innovation and Tools' },
		{ value: 'Leave', viewValue: 'Leave' },
	];
	
	constructor(public notificationBar: MatSnackBar) { 

	}

	openNotificationbar() {
		this.notificationBar.open('Fill all the fields!', 'Close', {
			duration : 5000,
		});	
	}

	getTime(time): void{
		console.log('user entered time is', time);
	}

	disableOption(selected, index): void {
		console.log('selected value is', selected);
		console.log('selected value index is ', index);
		if(selected.value === 'Common'){
			//this.disableSelect = true;
			this.userLogEfforts[index].skill_set = '';
		} else {
			//this.disableSelect = false;
		}
	}


	addUserEffort(index): void {
		console.log('current index is', index);
		if (this.userLogEfforts[index].project_name && this.userLogEfforts[index].task_name) { //&& this.time => needs fixing
			//push the empty object
			this.userLogEfforts.push({
				project_name: '',
				skill_set: '',
				task_name: '',
				time: ''
			});
			console.log('user filled data before filter is', this.userLogEfforts);
			this.userLogEfforts = this.userLogEfforts.filter((item, index, self) => 
				index === self.findIndex((t) => 
				t.project_name === item.project_name && t.skill_set === item.skill_set && t.task_name === item.task_name)
			);
			console.log('user filled data after filter is', this.userLogEfforts);
		} else {
			//show an alert to fill required fields
			console.log("show an alert to fill the required fields");
			this.openNotificationbar();
		}
		
	}

	deleteUserEffort(index): void {
		this.userLogEfforts.splice(index, 1);
		console.log('user data after delete is', this.userLogEfforts);
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
