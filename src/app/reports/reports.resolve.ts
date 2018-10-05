import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReportsService } from './reports.service';


@Injectable()
export class ReportsResolve implements Resolve<any> {
    constructor(private reportService: ReportsService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.reportService.loadEffort();
    }
}

@Injectable()
export class ReportsProjectResolve implements Resolve<any> {
    constructor(private reportService: ReportsService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.reportService.reportsProject('2018'); //fetch 2018 year report by default
    }
}