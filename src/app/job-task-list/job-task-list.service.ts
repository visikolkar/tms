import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../shared/config';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class JobTaskListService {

    constructor(private http: HttpClient) {
        //console.log('api url is', SERVER_URL);
    }

    //employee = JSON.parse(localStorage.getItem('employeeInfo'));

    //extract the last 4 digits of emp_id
    //empID = this.employee.empinfo.emp_id.substr(this.employee.empinfo.emp_id.length - 4);

    //addProjectUrl = SERVER_URL + 'api/project/add';

    getAllTaskUrl = SERVER_URL + 'api/task/all/';
    getAllTaskList(): Observable<any> {
        return this.http.get<any>(this.getAllTaskUrl);
    }

    modifyTask(obj:any, url:string): Observable<any> {
        let modifyUrl = SERVER_URL + 'api/task/' + url;
        return this.http.post<any>(modifyUrl, obj);
    }
    
}