import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Employee } from '../shared/employee';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
	emailFormControl: FormControl;
	passwordFormControl: FormControl;
	userData = {
		id : '',
		password : ''
	};
	employee : Employee;
	constructor(private router: Router, private loginService: LoginService) {
		this.emailFormControl = new FormControl('', [
			Validators.required,
			Validators.email,
		]);

		this.passwordFormControl = new FormControl('', [
			Validators.required,
		]);
	}

	onLogin() {
		console.log('user data is', this.userData);
		this.loginService.login(this.userData)
			.subscribe(
				(employee) => {
					if(employee){
						console.log('login api response is', employee);
						localStorage.setItem('employeeLoginData', JSON.stringify(employee));
						this.router.navigateByUrl('/dash');
					} else {
						console.log('Login failed', employee);
					}
				}, (err) => {
					console.error(err)
				}
			)
	}

	ngOnInit() {
	}

}
