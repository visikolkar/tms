import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../shared/config';

@Injectable()
export class ReportsService {

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

    reportsProjectUrl = SERVER_URL + 'api/reports/analysis/project/';
    reportsProject(year: string): Observable<any> {
        this.reportsProjectUrl += year;
        return this.http.get<any>(this.reportsProjectUrl);
    }

    reportsDomainUrl = SERVER_URL + 'api/reports/analysis/skillset/group/';
    reportsDomain(year: string): Observable<any> {
        this.reportsDomainUrl += year;
        return this.http.get<any>(this.reportsDomainUrl);
    }

    reportsSkillUrl = SERVER_URL + 'api/reports/analysis/skillset/level/';
    reportsSkill(year: string): Observable<any> {
        this.reportsSkillUrl += year;
        return this.http.get<any>(this.reportsSkillUrl);
    }

}