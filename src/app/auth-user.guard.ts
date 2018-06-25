import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

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
