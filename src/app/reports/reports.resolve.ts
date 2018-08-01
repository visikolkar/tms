import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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