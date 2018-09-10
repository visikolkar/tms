import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild, ElementRef, Renderer } from '@angular/core';
import { APPROVAL } from '../shared/approval';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
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
	STATES: any = STATE;
	widthPerMin: any;
	showApprovalAll: number;
	showNotifyAll: number;

	//@ViewChild('widthToMeasure', {read: ElementRef} )elementView: ElementRef;
	employee = JSON.parse(localStorage.getItem('employeeInfo'));

	empEmail = this.employee.empinfo.emp_email;
	private el: ElementRef;
	constructor(public notificationBar: MatSnackBar,
		private approvalService: ApprovalService,
		private loaderService: LoaderService,
		private route: ActivatedRoute,
		private sharedService: SharedService,
		public dialog: MatDialog,
		public cdRef: ChangeDetectorRef,
		el: ElementRef,
		public renderer: Renderer,
	) {
		this.el = el.nativeElement;
		this.renderer = renderer;
	}

	ngAfterViewInit() {
		// setTimeout(_ => this.window.showSidenav = false);
		// this.cdRef.detectChanges();
		//setTimeout(_ => console.log('task list div width', this.elementView.nativeElement.offsetWidth));
		setTimeout(_ => this.onResize());
	}

	onResize(): void {
		console.log('resize is called');
		let totalWidth = (window.innerWidth * 60) / 100;
		this.widthPerMin = totalWidth / 660;
		console.log('width per min ', this.widthPerMin);
	}

	openNotificationbar(message: string, action: string) {
		this.notificationBar.open(message, action, {
			duration: 5000,
			verticalPosition: 'top'
		});
	}

	activeTab(array): any {
		return array.map(function (item) { return item.isActive; }).indexOf(true);
	}

	postApproverAction(data: any, message): void {
		this.loaderService.show();
		this.approvalService.postApproverAction(data)
			.subscribe(
				(response) => {
					console.log('approver action res is ', response);
					this.approvals = this.effortSumarry(response['data']);
					this.selectedTab = this.activeTab(this.approvals.approval);
					this.openNotificationbar(message, 'Close');
					this.loaderService.hide();
				}, (err) => {
					console.log('approver action err is ', err);
					this.loaderService.hide();
				}, () => {
					this.loaderService.hide();
				}
			);
	}

	notify(approval: any) {
		console.log('notify employee are ', approval);
		let recipients = '';
		approval.empEfforts.forEach(function (item) {
			if (item.filled_state == '0' || item.filled_state == '1') {
				recipients += item.emp_email + ';';
			}
		})
		location.href = ("mailto:" + recipients + "?subject=[TMS2.0 Reminder!!] Fill your logefforts for [" + approval.displayDate + "]" + "&body=Dears,%0D%0A%0D%0AKinldy fill the Timesheet for " + approval.displayDate + ".%0D%0A%0D%0Ahttp://qtms.lge.com:8080/TMS2 %0D%0AThank you!%0D%0A" + this.employee.empinfo.emp_name);
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
					emp_email: emp.emp_email,
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
				emp_email: emp.emp_email,
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
			var dummyReport = [];
			var dummyTaskReport = [];
			var dummySkillReport = [];
			self.totalLogTime(item.empEfforts);
			item.empEfforts.forEach(function (emp) {
				if(emp.effort.length){
					emp.summaryEffort = self.summerizeUserEffort(emp.effort, 'project');
					emp.taskSummaryEffort = self.summerizeUserEffort(emp.effort, 'task');
					emp.skillSummaryEffort = self.summerizeUserEffort(emp.effort, 'skill');
					emp.summaryEffort.forEach(e => dummyReport.push(e));
					emp.taskSummaryEffort.forEach(e => dummyTaskReport.push(e));
					emp.skillSummaryEffort.forEach(e => dummySkillReport.push(e));
				}
				
			});
			item.report = self.chartReport(dummyReport, 'project');
			item.taskReport = self.chartReport(dummyTaskReport, 'task');
			item.skillReport = self.chartReport(dummySkillReport, 'skill');
			//item.taskReport = self.chartReport(dummyReport);
			item.projectName = [];
			item.projectEffort = [];
			item.report.forEach(function (project) {
				item.projectName.push(project.project_name);
				item.projectEffort.push(parseFloat(project.time.replace(":", ".")).toFixed(2));
			});
			item.taskName = [];
			item.taskEffort = [];
			item.taskReport.forEach(function (task) {
				item.taskName.push(task.task_name);
				item.taskEffort.push(parseFloat(task.time.replace(":", ".")).toFixed(2));
			});
			item.skillName = [];
			item.skillEffort = [];
			item.skillReport.forEach(function (skill) {
				item.skillName.push(skill.skill_set == '' ? 'Common' : skill.skill_set);
				item.skillEffort.push(parseFloat(skill.time.replace(":", ".")).toFixed(2));
			});
		});

		console.log('approval with summary is ', obj);
		return obj;
	}

	summerizeUserEffort(arr, str): any {
		let self = this;
		var array = JSON.parse(JSON.stringify(arr)); //arr.map(x => Object.assign({}, x)); //deep copy of array (without reference) with this this.userLogEffort will not be effected
		if(str == 'project'){
			array.forEach(function (val) {
				val.task = [{ skill_set: val.skill_set, task_name: val.task_name, hours: val.hours, mins: val.mins }];
			});
		} else if(str == 'task') {
			array.forEach(function (val) {
				val.project = [{ skill_set: val.skill_set, project_name: val.project_name, hours: val.hours, mins: val.mins }];
			});
		} else {
			array.forEach(function (val) {
				val.skill = [{ task_name: val.task_name, project_name: val.project_name, hours: val.hours, mins: val.mins }];
			});
		}

		var out = this.chartReport(array, str);
		return out;
	}

	chartReport(array, str) {
		var self = this;
		var output = [];

		array.forEach(function (value) {
			console.log('output is', output);
			var existing = output.filter(function (v, i) {
				if(str == 'project'){
					return v.project_name == value.project_name;
				} else if(str == 'task') {
					return v.task_name == value.task_name;
				} else {
					return v.skill_set == value.skill_set;
				}
			});
			console.log(str + 'existing is', existing);
			
			if (existing.length) {
				var existingIndex = output.indexOf(existing[0]);
				if(str == 'project'){
					output[existingIndex].task = output[existingIndex].task.concat(value.task);
				} else if(str == 'task') {
					output[existingIndex].project = output[existingIndex].project.concat(value.project);
				} else {
					output[existingIndex].skill = output[existingIndex].skill.concat(value.skill);
				}
			} else {
				output.push(value);
			}
		});

		console.log('final output is', output);
		output = this.prepareUserEffort(output);
		if(str == 'project'){
			var rep = 'task';
		} else if(str == 'task'){
			var rep = 'project';
		} else {
			var rep = 'skill';
		}
		output.forEach(function (item) {
			if (item[rep].length > 1) {
				var totalHours = item[rep].reduce(function (v, n) {
					return v + +n.hours;
				}, 0);
				var totalMins = item[rep].reduce(function (v, n) {
					return v + +n.mins;
				}, 0);

				item.time = self.minsToHours(totalHours, totalMins);
			} else {
				item.time = self.minsToHours(+item[rep][0].hours, +item[rep][0].mins);
			}

		})
		return output;
	}

	totalLogTime(array): any {
		let self = this;
		//let arr = array.effort;//this.prepareUserEffort(array.effort);
		array.forEach(function (item) {
			let arr = self.prepareUserEffort(item.effort);
			var totalHours = arr.reduce(function (v, n) {
				return v + +n.hours;
			}, 0);
			var totalMins = arr.reduce(function (v, n) {
				return v + +n.mins;
			}, 0);
			item.total_log_time = self.minsToHours(totalHours, totalMins);
		});
	}

	minsToHours(hours, mins): any {
		var total = (hours * 60 + mins) / 60;
		console.log("total is", total);
		var h = total.toString().split('.')[0];
		if (total.toString().split('.')[1]) {
			var m = "0." + total.toString().split('.')[1];
		} else {
			var m = "0";
		}
		console.log("h is", h);
		console.log("m is", m);
		m = (+m * 60).toFixed(0);
		if (m.toString().length > 1) {
			var t = h + ':' + m
		} else {
			var t = h + ':0' + m
		}
		return t;
	}

	filterUserEffort(array): any {
		//this will retun an array of unique objects
		//array.sort(function (a, b) { if (a.project_name && b.project_name) { return (a.project_name > b.project_name) ? 1 : ((b.project_name > a.project_name) ? -1 : 0); } });
		return array = array.filter((item, index, self) =>
			index === self.findIndex((obj) =>
				obj.project_name === item.project_name && obj.skill_set === item.skill_set && obj.task_name === item.task_name)
		);
	}

	prepareUserEffort(array): any {
		let self = this;
		let prepareArray = [];
		array.forEach(function (item) {
			if (item.project_name !== '' && item.task_name !== '' && (item.hours !== '' || item.mins !== '')) {
				prepareArray.push(item);
			}
		});
		prepareArray = this.filterUserEffort(prepareArray);
		return prepareArray;
	}

	onTabClick(event: MatTabChangeEvent): void {
        let self = this;
		console.log('Mat tab change ', event);
		this.showApproveNotifyAllCheck(event.index);
    }

	showApproveNotifyAllCheck(index: number): void {
		this.showApprovalAll = this.approvals.approval[index].empEfforts.findIndex(function(item){
			return item.filled_state == STATE.SUBMITTED
		});
		this.showNotifyAll = this.approvals.approval[index].empEfforts.findIndex(function(item){
			return item.filled_state == STATE.SAVED || item.filled_state == STATE.NOT_FILLED;
		});
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
				this.selectedTab = this.selectedTab == -1 ? 0 : this.selectedTab;
				console.log('selected tab is ', this.selectedTab);
				this.showApproveNotifyAllCheck(this.selectedTab);
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
					this.loaderService.hide();
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
	public doughnutChartType: string = 'doughnut';
	public projectOptions = {
		legend: {
			display: true,
			position: 'right',
			labels: {
				fontColor: 'black',
				fontSize: 12,
				position: 'bottom',
				usePointStyle: true,
				boxWidth: 100
			}
		},
		title: {
			display: true,
			position: 'top',
			text: 'Project Wise Analysis'
		},
		elements: {
			radius: 20
		}
	};
	public taskOptions = {
		legend: {
			display: true,
			position: 'right',
			labels: {
				fontColor: 'black',
				fontSize: 12,
				position: 'bottom',
				usePointStyle: true,
				boxWidth: 100
			}
		},
		title: {
			display: true,
			position: 'top',
			text: 'Task Wise Analysis'
		},
		elements: {
			radius: 20
		}
	};
	public skillOptions = {
		legend: {
			display: true,
			position: 'right',
			labels: {
				fontColor: 'black',
				fontSize: 12,
				position: 'bottom',
				usePointStyle: true,
				boxWidth: 100
			}
		},
		title: {
			display: true,
			position: 'top',
			text: 'Skill Wise Analysis'
		},
		elements: {
			radius: 20
		}
	};

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
