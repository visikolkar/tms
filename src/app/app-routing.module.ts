import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard, AuthRoleGuard } from './auth-user.guard';

import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { LogeffortComponent } from './logeffort/logeffort.component';
import { ApprovalComponent } from './approval/approval.component';
import { DashResolve, ProjectResolve, ApprovalResolve, FavProjectResolve, ActiveProjectResolve } from './dash/dash.resolve.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { MyProjectListComponent } from './my-project-list/my-project-list.component';
import { AdminComponent } from './admin/admin.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { JobTaskListComponent } from './job-task-list/job-task-list.component';
import { AdminResolve } from './admin/admin.resolve';
import { ReportsComponent } from './reports/reports.component';
import { MyReportComponent } from './my-report/my-report.component';
import { ReportsResolve } from './reports/reports.resolve';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
	{
		path: 'login', 
		component: LoginComponent
	},
	{
		path: 'dash',
		component: DashComponent,
		canActivate: [AuthUserGuard],
		children: [
			{
				path:'',
				redirectTo: 'logeffort',
				pathMatch: 'full' 
			}, {
				path: 'logeffort',
				component: LogeffortComponent,
				resolve : {
					logeffort: DashResolve,
					projectTasks: ProjectResolve,
					favorites: FavProjectResolve
				}

			}, {
				path: 'approval',
				component: ApprovalComponent,
				canActivate: [AuthRoleGuard],
				resolve: {
					approvals: ApprovalResolve
				}
			}, {
				path: 'my-project-list',
				component: MyProjectListComponent,
				resolve : {
					projects: ActiveProjectResolve,
					favorites: FavProjectResolve
				}
			}, {
				path: 'about',
				component: AboutUsComponent,
			}
		]
	}, {
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthUserGuard, AuthRoleGuard],
		children: [
			{
				path: 'project-status',
				component: ProjectStatusComponent,
				resolve : {
					projects: AdminResolve,
				}

			}, {
				path: 'job-task-list',
				component: JobTaskListComponent,
				resolve: {
					tasks: AdminResolve
				}
			}
		]
	}, {
		path: 'reports',
		component: ReportsComponent,
		canActivate: [AuthUserGuard],
		children: [
			{
				path: 'my-report',
				component: MyReportComponent,
				resolve : {
					logeffort: ReportsResolve
				}

			}
		]
	},
	{
		path: '', 
		redirectTo: 'dash', 
		pathMatch: 'full'
	},
	{
		path: '**',
		component: NotfoundComponent
	},
]

export const AppRoutingModule = RouterModule.forRoot(routes);
