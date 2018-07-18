import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { APPROVAL } from '../shared/approval';
import { MatSnackBar } from '@angular/material';
import { ApprovalService } from './approval.service';
import { LoaderService } from '../loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { STATE } from '../shared/config';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-approval',
	templateUrl: './approval.component.html',
	styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

	window: any = window;
	approvals: any;
	selectedTab: number;
	windowheight: number;
	STATES: any;

	employee = JSON.parse(localStorage.getItem('employeeInfo'));

	empEmail = this.employee.empinfo.emp_email;

	constructor(public notificationBar: MatSnackBar,
		private approvalService: ApprovalService,
		private loaderService: LoaderService,
		private route: ActivatedRoute,
		private sharedService: SharedService,
		public dialog: MatDialog,
		public cdRef: ChangeDetectorRef
	) { }

	ngAfterViewInit() {
		// setTimeout(_ => this.window.showSidenav = false);
		// this.cdRef.detectChanges();
	}

	openNotificationbar(message: string, action: string) {
		this.notificationBar.open(message, action, {
			duration: 5000,
		});
	}

	activeTab(array): any {
		return array.map(function (item) { return item.isActive; }).indexOf(true);
	}

	postApproverAction(data: any, message): void {
		this.loaderService.show()
		this.approvalService.postApproverAction(data)
			.subscribe(
				(response) => {
					console.log('approver action res is ', response);
					this.approvals = this.effortSumarry(response['data']);
					this.selectedTab = this.activeTab(this.approvals);
					this.openNotificationbar(message, 'Close');
				}, (err) => {
					console.log('approver action err is ', err);
					this.loaderService.hide();
				}, () => {
					this.loaderService.hide();
				}
			);
	}

	approverAction(state: string, date: string, emp: any, all: boolean): void {
		var self = this;
		console.log('apppver action is ', state);
		console.log('apppver date is ', date);
		console.log('apppver employee is ', emp.emp_id);

		if (state == this.STATES.APPROVED) {
			if (all) {
				//approve all
				const dialogRef = this.dialog.open(DialogApproveAll, {
					width: '250px',
				});

				dialogRef.afterClosed().subscribe(result => {
					console.log('The dialog was closed', result);
					if (result) {
						var empArr = [];
						emp.forEach(function (item) {
							if (item.filled_state == self.STATES.SUBMITTED) {
								empArr.push(item.emp_id);
							}
						});
						var actionData = {
							iris_date: date,
							filled_state: state,
							emp_ids: empArr,
							comments: 'Approved',
							approverEmail: this.empEmail
						};
						console.log('action data is ', actionData);
						var message = 'All employee Approval is complete';
						this.postApproverAction(actionData, message);
					} else {
						console.log('approve all aborted');
					}
				});
			} else {
				var empArr = [];
				empArr.push(emp.emp_id);
				var actionData = {
					iris_date: date,
					filled_state: state,
					emp_ids: empArr,
					comments: 'Approved',
					approverEmail: this.empEmail//'chetan.lavti'
				};
				console.log('action data is ', actionData);
				var message = 'Approval is complete';
				this.postApproverAction(actionData, message);
			}
		} else {
			var empArr = [];
			empArr.push(emp.emp_id);
			var actionData = {
				iris_date: date,
				filled_state: state,
				emp_ids: empArr,
				comments: 'Reject',
				approverEmail: this.empEmail//'chetan.lavti'
			};
			const dialogRef = this.dialog.open(DialogReject, {
				width: '250px',
				data: { comment: actionData }
			});

			dialogRef.afterClosed().subscribe(result => {
				console.log('The dialog was closed', result);
				console.log('action data is ', actionData);
				// actionData.comments = result;
				if (result && actionData.comments) {
					console.log('action data is ', actionData);
					var message = 'Rejection is complete';
					this.postApproverAction(actionData, message);
				} else {
					console.log('reject aborted');
				}
			});
		}
	}

	effortSumarry(obj): any {
		var self = this;
		obj.approval.forEach(function (item) {
			var month = +item.iris_date.split('-')[1] - 1;
			item.displayDate = new Date(item.iris_date.split('-')[2], month, item.iris_date.split('-')[0]).toDateString().slice(0, 10);
		});

		console.log('approval with summary is ', obj);
		return obj;
	}

	ngOnInit() {
		// this.window.showSidenav = true;
		this.windowheight = (73 * window.screen.height) / 100;
		// this.approvals = this.effortSumarry(APPROVAL.data);
		// this.selectedTab = this.activeTab(this.approvals);
		this.STATES = STATE;
		this.route.data
			.subscribe((res: any) => {
				console.log('resolved approvals are ', res);
				this.approvals = this.effortSumarry(res.approvals.data);
				this.selectedTab = this.activeTab(this.approvals.approval);
			});
	}

	postPrevNextWeek(weekNumber, year) {
		this.loaderService.show();
		this.approvalService.weekEffort(weekNumber, year)
			.subscribe(
				(response) => {
					console.log('week approval response is ', response);
					if (response['status'] == 'true') {
						this.approvals = this.effortSumarry(response['data']);
						this.selectedTab = this.activeTab(this.approvals.approval);
						// this.logefforts.time_sheet = JSON.parse(JSON.stringify(this.logefforts.time_sheet));
						// this.selectedTab = JSON.parse(JSON.stringify(this.activeTab(this.logefforts.time_sheet)));
						// this.selected.setValue(this.selectedTab);
						console.log('weekEffort selectedTab is', this.selectedTab);

					} else {
						this.openNotificationbar(response['message'], 'Close');
					}
				}, (err) => {
					console.error('logeffort submit error ', err);
					this.loaderService.hide();
				}, () => {
					this.loaderService.hide(); //on complete hide the loader
				}
			);
	}

	prevNextWeek(str: string): void {
		console.log("prevNextWeek fucntion call", str);
		if (str === 'prev') {
			let weekNumber = this.approvals.week_number - 1;
			let year = this.approvals.approval[0].iris_date.split("-")[2];
			this.postPrevNextWeek(weekNumber, year);
		} else if (str === 'next') {
			let weekNumber = this.approvals.week_number + 1;
			let year = this.approvals.approval[0].iris_date.split("-")[2];
			this.postPrevNextWeek(weekNumber, year);
		}
	}

	// Doughnut
	public doughnutChartLabels: string[] = ['Emma Plus', 'CV1 Prime', 'Joan O'];
	public doughnutChartData: number[] = [350, 450, 100];
	public doughnutChartType: string = 'doughnut';

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

}

@Component({
	selector: 'dialog-approve-all',
	templateUrl: './dialog-approve-all.html',
})
export class DialogApproveAll {

	constructor(
		public dialogRef: MatDialogRef<DialogApproveAll>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

}

@Component({
	selector: 'dialog-reject',
	templateUrl: './dialog-reject.html',
})
export class DialogReject {

	constructor(
		public dialogRef: MatDialogRef<DialogReject>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

}
