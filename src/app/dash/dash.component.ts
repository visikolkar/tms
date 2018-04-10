import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee';
import { EMPLOYEEDETAILS } from '../shared/mock-employee';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    
    employee = EMPLOYEEDETAILS;

}
