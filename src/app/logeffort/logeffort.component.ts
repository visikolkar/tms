import { Component, OnInit } from '@angular/core';
import { Logeffort } from '../shared/logeffort';
import { LOGEFFORTS } from '../shared/mock-logeffort';

@Component({
	selector: 'app-logeffort',
	templateUrl: './logeffort.component.html',
	styleUrls: ['./logeffort.component.css']
})
export class LogeffortComponent implements OnInit {

    windowheight: any;
    /*  projects,
        tasks,
        commonTasks ==> will be fetched thrupgh a seperate api call
    */
	projects = [
		{ value: 'Project A', viewValue: 'Project A' },
		{ value: 'Project B', viewValue: 'Project B' },
		{ value: 'Project C', viewValue: 'Project C' },
		{ value: 'Project D', viewValue: 'Project D' },
    ];
    tasks = [
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
		
	}

	ngOnInit() {
		this.windowheight = (60 * window.screen.height) / 100;
		//Math.floor(400 / window.screen.height * 100);
		console.log("window height " + this.windowheight);
    }
    
    logefforts = LOGEFFORTS;

}
