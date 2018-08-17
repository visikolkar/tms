import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { ROLES } from './shared/config';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthUserGuard implements CanActivate {

	constructor(private loginservice: LoginService, private router: Router){}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(!this.loginservice.getUserLoggedIn()){
			this.router.navigate(['/login'], { skipLocationChange: true }); //Navigates without pushing a new state into history
			console.log("you're not authenticated");
		} else{
			console.log("you're authenticated");
		}
		return this.loginservice.getUserLoggedIn();
	}
}

@Injectable()
export class AuthRoleGuard implements CanActivate {

	constructor(public notificationBar: MatSnackBar, private router: Router){}

	openNotificationbar(message: string, action: string) {
        this.notificationBar.open(message, action, {
			duration: 5000,
			verticalPosition: 'top'
        });
    }

	canActivate(): boolean {
		var employee = JSON.parse(localStorage.getItem('employeeInfo'));
		if(employee.empinfo.emp_role == ROLES.APPROVER || employee.empinfo.emp_role == ROLES.ADMIN){
			console.log("it's approver!");
			return true;
		} else {
			console.log("Not an approver!");
			this.router.navigate(['/dash'], { skipLocationChange: true });
			this.openNotificationbar("You're not an approver!", 'Close');
			return false;
		}
	}
}
