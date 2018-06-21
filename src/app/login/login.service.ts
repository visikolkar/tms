import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


export interface LoginUser {
    username : string,
    password: string
}

const httpOptions = {
    headers : new HttpHeaders({
        'content-type' : 'text/plain'
    })
};

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    loginUrl = 'http://si-ramesh86:8080/TMS2/api/login/emp';
    /** POST: user data to the server for authentication */
    login (user: LoginUser): Observable<any> {
        return this.http.post<any>(this.loginUrl, user, httpOptions);
    }

}