import { Component, OnInit,Inject, Compiler } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// import { Employee } from '../shared/employee';
import { EMPLOYEEDETAILS } from '../shared/mock-employee';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';
import { DashService } from './dash.service';
import { LoaderService } from '../loader/loader.service';
import { ROLES } from '../shared/config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

    window: any = window;
    ROLES: any;

    constructor(private router: Router,public dialog: MatDialog, private dashService: DashService, private loaderService: LoaderService, private _compiler: Compiler) { }

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
        this.window.sidenav = true;
        this.loadEffort();
        console.log('loadEffort is called');
        console.log(JSON.parse(localStorage.getItem('employeeInfo')));
        this.ROLES = ROLES;
    }

    logout():void{
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        let dialogRef = this.dialog.open(DialogLogout, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.loaderService.show();
                localStorage.clear();
                window.location.reload();
                this._compiler.clearCache();
                Observable.interval(500).takeWhile(function(){ return this.loaderService.hide()})
                //this.router.navigate(['/login'], { replaceUrl: true });
                console.log("logout successfull");
            }else{
                console.log("logout failed");
            }
         console.log('The dialog was closed');
        });
    }

    employee = JSON.parse(localStorage.getItem('employeeInfo'));//EMPLOYEEDETAILS;

    loadEffort(): void {
        this.dashService.loadEffort()
            .subscribe(
                (response) => {
                    console.log('logeffort submit response is ', response);
                    if (response['status'] == 'true') {

                        localStorage.setItem('logEffort', JSON.stringify(response['data']));
                        // this.openNotificationbar('Effort data submitted successfully!', 'Close');
                    } else {
                        // this.openNotificationbar(response['message'], 'Close');
                    }
                    this.loaderService.hide();
                }, (err) => {
                    console.error('logeffort submit error ', err);
                    this.loaderService.hide();
                }, () => {
                    this.loaderService.hide(); //on complete hide the loader
                }
            );
    }

}


@Component({
    selector: 'dialog-logout',
    templateUrl: './dialog-logout.html',
})
export class DialogLogout{

    constructor(
        public dialogRef: MatDialogRef<DialogLogout>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}