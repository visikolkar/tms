import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { LoaderService } from '../loader/loader.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { JobTaskListService } from './job-task-list.service';

@Component({
  selector: 'app-job-task-list',
  templateUrl: './job-task-list.component.html',
  styleUrls: ['./job-task-list.component.css']
})
export class JobTaskListComponent implements OnInit {

	tasks: any;
	detailsShow: boolean;
	addNewShow: boolean;
	showEditOptions: boolean = false;
	detailsHeader = 'Task Details';
	searchText: string;
	selectedTask: any;
	//disableEditFields: boolean = true;
	
	addTask = {
		task_name: '',
		task_type: '',
		task_code: '',
		original_eng: '',
		original_kor: '',
		description: ''
	}

	constructor(public sharedService: SharedService,
		public route: ActivatedRoute,
		public adminService: AdminService,
		public jobTaskListservice: JobTaskListService,
		public loaderService: LoaderService,
		public notificationBar: MatSnackBar) { }

	openNotificationbar(message: string, action: string) {
		this.notificationBar.open(message, action, {
			duration: 5000,
			verticalPosition: 'top'
		});
	}

	ngOnInit() {
		this.addNewShow = true;
		this.detailsShow = false;
		this.route.data
			.subscribe((res: any) => {
				console.log('resolved tasks list is ', res);
				this.tasks = res.tasks.data;
			})
	}
	selectTask(obj): void {
		console.log('selected task is ', obj);
		this.selectedTask = obj;
		this.detailsShow = true;
		this.addNewShow = false;
		this.showEditOptions = false;
		this.detailsHeader = obj.task_name + ' Task Details';

		this.tasks.forEach(function (item) {
			item.selected = false;

			//if (item.task_name == obj.task_name){
			if (item.task_name == obj.task_name && item.task_type == obj.task_type) {
				item.selected = true;
			}
		})
	}


	addNew(): void {
		this.detailsShow = false;
		this.addNewShow = true;
		this.tasks.forEach(function (item) {
			item.selected = false;
		})
	}

	enableEdit(): void {
		console.log('click event')
		this.showEditOptions = true;
		//this.disableEditFields = false; //this variable is depricated

	}

	saveTask(str, obj): void {
		if (str == 'cancel') {
			this.showEditOptions = false;
		} else {
			//save the project
			console.log('selected task is ', obj);
			if (this.checkProperties(obj)) {
				this.modifyTasks(obj, 'update', 'Task has been updated!')
			} else {
				this.openNotificationbar('All the fields are mandatory', 'Close');
			}
		}
	}

	key_press(e) {
		//block user from entering in leave dates
		console.log('event fired');
		e.preventDefault();
	}

	checkProperties(obj) {
		// function isEmptyCheck(current) {
		// 	return (current !== null || current !== '' || current !== 'Invalid date');
		// }
		// const isEmpty = Object.values(obj).every(isEmptyCheck);
		// console.log('isEmpty ', isEmpty);
		// return isEmpty;

		if (obj.task_name !== '' && obj.task_type !== '' && obj.task_code !== '' && obj.original_eng !== '' && obj.original_kor !== '' && obj.description !== '') {
			return true;
		} else {
			return false;
		}
	}

	addNewTask() {


		console.log('add task', this.addTask);
		if (this.checkProperties(this.addTask)) {
			this.modifyTasks(this.addTask, 'add', 'Task has been added!')
		} else {
			this.openNotificationbar('All the fields are mandatory', 'Close');
		}
	}

	modifyTasks(obj, url, message): void {
		this.loaderService.show();
		this.jobTaskListservice.modifyTask(obj, url)
			.subscribe(
				(response) => {
					console.log('task status add update response is ', response);
					if (response['status'] == 'true') {
						this.tasks = response['data'];
						this.openNotificationbar(message, 'Close');
						if (url == 'add') {
							this.addTask = {
								task_name: '',
								task_type: '',
								task_code: '',
								original_eng: '',
								original_kor: '',
								description: ''
							}
						} else {
							//this.disableEditFields = true;
							this.showEditOptions = false;
						}
					} else {
						this.openNotificationbar(response['message'], 'Close');
					}
					this.loaderService.hide();
				}, (err) => {
					console.error('modify task error ', err);
					this.loaderService.hide();
				}, () => {
					this.loaderService.hide(); //on complete hide the loader
				}
			)
	}

}
