import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';

// @NgModule({
// 	imports: [ RouterModule.forRoot(routes) ],
// 	exports: [ RouterModule ]
// })

const routes: Routes = [
	{
		path: "login", component: LoginComponent
	},
	{
		path: "dash", component: DashComponent
	},
	{
		path: '', redirectTo: '/login', pathMatch: 'full'
	},
]

// export class AppRoutingModule { }
export const AppRoutingModule = RouterModule.forRoot(routes);
