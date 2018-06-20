import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from './login.service';

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
		this.loginService.login(this.userData)
			.subscribe(
				(employee) => {
					if(employee.empInfo && employee.skill){ //employee['empInfo'] && employee['skill']
						console.log('login api response is', employee);
						localStorage.setItem('employeeLoginData', JSON.stringify(employee));
						this.router.navigateByUrl('/dash');
					} else {
						console.log('Login failed', employee);
						this.openNotificationbar(employee['message'], 'Close');
					}
				}, (err) => {
					console.error(err)
				}
			)
	}

	ngOnInit() {
	}

}
