import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminService } from './admin.service';


@Injectable()
export class AdminResolve implements Resolve<any> {
    constructor(private adminService: AdminService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return this.adminService.getAllProjectList();
    }
}
