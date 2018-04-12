import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from '../shared/employee';
import { EMPLOYEEDETAILS } from '../shared/mock-employee';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

    constructor(public dialog: MatDialog) { }

    
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

    ngOnInit() {
    }

    employee = EMPLOYEEDETAILS;

}
