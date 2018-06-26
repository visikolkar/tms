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

    postEffort(effortData: any, state: number): Observable<any> {
        var logEffortUrl = SERVER_URL + 'api/effort/add/' +state;
        console.log('logEffort api url is', logEffortUrl);
        return this.http.post<any>(logEffortUrl, effortData);
    }

}