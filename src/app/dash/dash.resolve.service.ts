import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class FavProjectResolve implements Resolve<any> {
    constructor(private dashService: DashService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.dashService.favProjectList();
    }
}

@Injectable()
export class ActiveProjectResolve implements Resolve<any> {
    constructor(private dashService: DashService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.dashService.activeProjectList();
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