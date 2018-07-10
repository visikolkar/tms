import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../shared/config';

@Injectable()
export class DashService {

    constructor(private http: HttpClient) {
        //console.log('api url is', SERVER_URL);
    }

    employee = JSON.parse(localStorage.getItem('employeeInfo'));

    //extract the last 4 digits of emp_id
    empID = this.employee.empinfo.emp_id.substr(this.employee.empinfo.emp_id.length - 4);

    loadEffortUrl = SERVER_URL + 'api/effort/' + this.empID;

    loadEffort(): Observable<any> {
        console.log('logEffort api url is', this.loadEffortUrl);
        return this.http.get<any>(this.loadEffortUrl);
    }

    projectTaskUrl = SERVER_URL + 'api/project/list';
    projectTaskList(): Observable<any> {
        return this.http.get<any>(this.projectTaskUrl);
    }

    empEmail = this.employee.empinfo.emp_email;
	approvalUrl = SERVER_URL + 'api/approval/chetan.lavti' //+ this.empEmail;

	loadApproval(): Observable<any> {
		console.log('approval api url is', this.approvalUrl);
		return this.http.get<any>(this.approvalUrl);
	}

}