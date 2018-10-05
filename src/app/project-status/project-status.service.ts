import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../shared/config';

@Injectable()
export class ProjectStatusService {

    constructor(private http: HttpClient) {
        //console.log('api url is', SERVER_URL);
    }

    employee = JSON.parse(localStorage.getItem('employeeInfo'));

    //extract the last 4 digits of emp_id
    empID = this.employee.empinfo.emp_id.substr(this.employee.empinfo.emp_id.length - 4);

    //addProjectUrl = SERVER_URL + 'api/project/add';
    modifyProject(obj:any, url:string): Observable<any> {
        let modifyUrl = SERVER_URL + 'api/project/' + url;
        return this.http.post<any>(modifyUrl, obj);
    }

}