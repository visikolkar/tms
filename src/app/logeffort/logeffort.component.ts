import { Component, OnInit } from '@angular/core';
import { Logeffort } from '../shared/logeffort';
import { LOGEFFORTS } from '../shared/mock-logeffort';
import { LogeffortTwo } from '../shared/logeffort-two';
import { LOGEFFORTSTWO } from '../shared/mock-two-logeffort';

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
		time = {
			value: new Date(2018,0,1,0,0,0),
		};
		disableSelect: boolean;
		userLogEffort = {
			project_name: '',
			skill_set: '',
			task_name: '',
			time: ''
		};
		userEffort = [];
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
	
	constructor() { 
		// var timeControl = document.getElementById("startTime");
		// timeControl.value = '00:00';
		// this.time = timeControl.value;
	}

	getTime(time): void{
		console.log('user entered time is', time);
	}

	disableOption(selected): void {
		console.log('selected value is', selected);
		if(selected.value === 'Common'){
			this.disableSelect = true;
			this.skillSet = '';
		} else {
			this.disableSelect = false;
		}
	}

	addUserData(): void {
		this.userLogEffort.project_name = this.projectName;
		this.userLogEffort.skill_set = this.skillSet;
		this.userLogEffort.task_name = this.taskName;
		this.userLogEffort.time = this.time.value.toDateString();
		this.userEffort.push(this.userLogEffort);
		console.log('user filled data is', this.userEffort);
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
