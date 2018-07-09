import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashService } from './dash.service';


@Injectable()
export class DashResolve implements Resolve<any> {
    constructor(private dashService: DashService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.dashService.loadEffort();
    }
}

@Injectable()
export class ProjectResolve implements Resolve<any> {
    constructor(private dashService: DashService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.dashService.projectTaskList();
    }
}

@Injectable()
export class ApprovalResolve implements Resolve<any> {
    constructor(private dashService: DashService ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.dashService.loadApproval();
    }
}