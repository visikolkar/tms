import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface LoginUser {
    id : string,
    password: string
}

const httpOptions = {
    headers : new HttpHeaders({
        'content-type' : 'application/json',
        'Authorization' : 'my-auth-token'
    })
};

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    loginUrl = 'api/login/emp';
    /** POST: user data to the server for authentication */
    login (user: LoginUser) : Observable<LoginUser> {
        return this.http.post<LoginUser>(this.loginUrl, user, httpOptions);
    }

}