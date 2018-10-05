import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_URL } from '../shared/config';


@Injectable()
export class CalendarService {

    constructor(private http: HttpClient) { }

    employee = JSON.parse(localStorage.getItem('employeeInfo'));

    //extract the last 4 digits of emp_id
    empID = this.employee.empinfo.emp_id.substr(this.employee.empinfo.emp_id.length - 4);

    calendarUrl = SERVER_URL + 'api/effort/cal/' + this.empID;

    calendarSelectedDateUrl = SERVER_URL + 'api/effort/' + this.empID + '/';

    calendar(): Observable<any> {
        console.log('calendar api url is', this.calendarUrl);
        return this.http.get<any>(this.calendarUrl);
    }

    calendarSelectedDate(date: string): Observable<any> {
        console.log('calendarSelectedDate api url is', this.calendarSelectedDateUrl + date);
        return this.http.get<any>(this.calendarSelectedDateUrl + date);
    }

}