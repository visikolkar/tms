import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './admin.service';
import { JobTaskListService } from '../job-task-list/job-task-list.service';



@Injectable()
export class AdminResolve implements Resolve<any> {
    constructor(private adminService: AdminService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.adminService.getAllProjectList();
    }
}
@Injectable()
export class JobTaskListResolve implements Resolve<any> {
    constructor(private jobTaskListservice: JobTaskListService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.jobTaskListservice.getAllTaskList();
    }
    
}


