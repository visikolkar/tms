import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from './login.service';
import { Subscription } from "rxjs";

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
	
	constructor(private router: Router, private loginService: LoginService, public notificationBar: MatSnackBar) {
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
        });
    }

	onLogin() {
		console.log('user data is', this.userData);
		if(this.userData.username && this.userData.password){
			if(this.request){
				this.request.unsubscribe();
			}
			this.request = this.loginService.login(this.userData)
				.subscribe(
					(response) => {
						console.log('login api response is', response);
						if(response['status'] == 'true'){
							localStorage.setItem('employeeInfo', response['data']);
							this.router.navigateByUrl('/dash');
						} else {
							console.log('Login failed', response);
							this.openNotificationbar(response['message'], 'Close');
						}
					}, (err) => {
						console.error('something does not look good',err);
					}
				);
		} else {
			this.openNotificationbar('Username and Password are required', 'Close');
		}
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if(this.request){
			this.request.unsubscribe();
		}
	}

}
