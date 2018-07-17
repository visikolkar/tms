import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../shared/config';

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) {
        //console.log('api url is', SERVER_URL);
    }

    employee = JSON.parse(localStorage.getItem('employeeInfo'));

    //extract the last 4 digits of emp_id
    empID = this.employee.empinfo.emp_id.substr(this.employee.empinfo.emp_id.length - 4);

    getAllProjectsUrl = SERVER_URL + 'api/project/all/';
    getAllProjectList(): Observable<any> {
        return this.http.get<any>(this.getAllProjectsUrl);
    }

    projectTaskUrl = SERVER_URL + 'api/project/list';
    projectTaskList(): Observable<any> {
        return this.http.get<any>(this.projectTaskUrl);
    }

}