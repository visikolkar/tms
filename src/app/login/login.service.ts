import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../shared/config';

export interface LoginUser {
    username: string,
    password: string
}

const httpOptions = {
    headers: new HttpHeaders({
        'content-type': 'text/plain'
    })
};

@Injectable()
export class LoginService {

    private isUserLoggedIn;
    constructor(private http: HttpClient) {
        // this.isUserLoggedIn = false;
        console.log('api url is', SERVER_URL);
    }

    loginUrl = SERVER_URL + 'api/login/emp';
    /** POST: user data to the server for authentication */
    login(user: LoginUser): Observable<any> {
        return this.http.post<any>(this.loginUrl, user, httpOptions);
    }

    setUserLoggedIn(status: boolean) {
        this.isUserLoggedIn = status;
    }

    getUserLoggedIn() {
        if (localStorage.getItem('employeeInfo')) { //require additional level of authentication
            this.isUserLoggedIn = true;
        } else {
            this.isUserLoggedIn = false;
        }
        return this.isUserLoggedIn;
    }

}