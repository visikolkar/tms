import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-logeffort',
	templateUrl: './logeffort.component.html',
	styleUrls: ['./logeffort.component.css']
})
export class LogeffortComponent implements OnInit {

	windowheight: any;
	projects = [
		{ value: 'project-A', viewValue: 'Project A' },
		{ value: 'project-B', viewValue: 'Project B' },
		{ value: 'project-C', viewValue: 'Project C' },
		{ value: 'project-D', viewValue: 'Project D' },
	];
	constructor() { 
		
	}

	ngOnInit() {
		this.windowheight = window.screen.height - 460;
		//Math.floor(400 / window.screen.height * 100);
		console.log("window height " + this.windowheight);
	}

}
