import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { ROLES } from './shared/config';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	window: any = window;
	employee = JSON.parse(localStorage.getItem('employeeInfo'));//EMPLOYEEDETAILS;
	ROLES = ROLES;

	constructor(public dialog: MatDialog) {
		this.window.showSidenav = false;
	}

	openDialog(): void {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		let dialogRef = this.dialog.open(EmployeeProfileComponent, {
			width: '250px',
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

}
