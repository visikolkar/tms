import { Component, OnInit } from '@angular/core';
import { ROLES } from '../shared/config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  employee = JSON.parse(localStorage.getItem('employeeInfo'));
  ROLES = ROLES;
  constructor() { }

  ngOnInit() {
  }

}
