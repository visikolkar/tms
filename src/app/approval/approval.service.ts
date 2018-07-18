import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../shared/config';

@Injectable()
export class ApprovalService {

	constructor(private http: HttpClient) { }

	employee = JSON.parse(localStorage.getItem('employeeInfo'));

	empEmail = this.employee.empinfo.emp_email.split('@')[0];

	approvalActionUrl = SERVER_URL + 'api/approval/update';

	postApproverAction(data: any): Observable<any> {
		console.log('approval api url is', this.approvalActionUrl);
		return this.http.post<any>(this.approvalActionUrl, data);
	}

	// empEmail = this.employee.empinfo.emp_id.substr(this.employee.empinfo.emp_id.length - 4);
	weekEffort(week, year): Observable<any> {
        var weekUrl = SERVER_URL+ '/api/approval/' + this.empEmail + '/w/' + week + '/y/' + year;  //'chetan.lavti'
        console.log('weekEffort approval api url is', weekUrl);
        return this.http.get<any>(weekUrl);
    }

}
