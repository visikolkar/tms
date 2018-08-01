import { Component, OnInit } from '@angular/core';
import { ROLES } from '../shared/config';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

	constructor() { }
	
	ROLES: any = ROLES;
	employee = JSON.parse(localStorage.getItem('employeeInfo'));

	ngOnInit() {
	}

}
