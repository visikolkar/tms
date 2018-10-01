import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../shared/config';

@Injectable()
export class LogeffortService {

    constructor(private http: HttpClient) { }

    employee = JSON.parse(localStorage.getItem('employeeInfo'));

    //extract the last 4 digits of emp_id
    empID = this.employee.empinfo.emp_id.substr(this.employee.empinfo.emp_id.length - 4);

    //logEffortUrl = SERVER_URL + 'api/effort/add/' + this.empID;

    headers = new HttpHeaders({
        'Content-Type': 'text/plain'
    });
    options = { headers: this.headers };

    postEffort(effortData: any, state: number): Observable<any> {
        var logEffortUrl = SERVER_URL + 'api/effort/add/' +state;
        console.log('logEffort api url is', logEffortUrl);
        return this.http.post<any>(logEffortUrl, effortData, this.options);
    }

    
    weekEffort(week, year): Observable<any> {
        var weekUrl = SERVER_URL+ '/api/effort/' + this.empID + '/w/' + week + '/y/' + year;
        console.log('weekEffort api url is', weekUrl);
        return this.http.get<any>(weekUrl);
    }

    leaveUrl = SERVER_URL + 'api/effort/leave';
    postLeave(leave): Observable<any> {
        return this.http.post<any>(this.leaveUrl, leave);
    }
}