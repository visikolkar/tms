import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from './login.service';
import { Subscription } from "rxjs";
import { LoaderService } from '../loader/loader.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
	emailFormControl: FormControl;
	passwordFormControl: FormControl;
	userData = {
		username : '',
		password : ''
	};
	request: Subscription;
	
	constructor(private router: Router, private loginService: LoginService, public notificationBar: MatSnackBar, private loaderService: LoaderService) {
		this.emailFormControl = new FormControl('', [
			Validators.required
		]);

		this.passwordFormControl = new FormControl('', [
			Validators.required,
		]);
	}

	openNotificationbar(message: string, action: string) {
        this.notificationBar.open(message, action, {
			duration: 5000,
			verticalPosition: 'top'
        });
	}

	onLogin() {
		console.log('user data is', this.userData);
		if(this.userData.username && this.userData.password){
			if(this.request){
				this.request.unsubscribe();
			}
			//this.showLoader();
			this.loaderService.show();
			this.request = this.loginService.login(this.userData)
				.subscribe(
					(response) => {
						console.log('login api response is', response);
						if(response['status'] == 'true'){
							localStorage.setItem('employeeInfo', JSON.stringify(response['data']));
							this.loginService.setUserLoggedIn(true);
							this.router.navigate(['/dash'], { replaceUrl: true }); //remove login page from history
						} else {
							console.log('Login failed', response);
							this.loginService.setUserLoggedIn(false);
							this.openNotificationbar(response['message'], 'Close');
						}
						this.loaderService.hide();
					}, (err) => {
						console.error('something does not look good',err);
						this.loaderService.hide();
					}, () => {
						this.loaderService.hide(); //on complete hide the loader
					}
				);
		} else {
			this.openNotificationbar('Username and Password are required', 'Close');
		}
	}

	ngOnInit() {
		if(this.loginService.getUserLoggedIn()){
			this.router.navigate(['/dash'], { replaceUrl: true }); //remove login page from history
		} else {
			//land on login page
		}
	}

	ngOnDestroy() {
		if(this.request){
			this.request.unsubscribe();
		}
	}

}
