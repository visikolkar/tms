import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  emailFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(private router: Router) {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required,
    ]);
  }

  onLogin() {
    this.router.navigateByUrl('/dash');
  }

  ngOnInit() {
  }

}
