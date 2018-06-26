import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../shared/config';

@Injectable()
export class DashService {

    constructor(private http: HttpClient) {
        //console.log('api url is', SERVER_URL);
    }

}