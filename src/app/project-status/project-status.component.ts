import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { LoaderService } from '../loader/loader.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { ProjectStatusService } from './project-status.service';

@Component({
	selector: 'app-project-status',
	templateUrl: './project-status.component.html',
	styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {

	projects:any;
	detailsShow: boolean;
	addNewShow: boolean;
	showEditOptions: boolean = false;
	detailsHeader = 'Project Details';
	searchText: string;
	selectedProject: any;
	//disableEditFields:boolean = true;
	dates = {
		start_date: '',
		end_date: '',
		base_ta: ''
	}
	addProject = {
		project_name: '',
		project_category: '',
		project_code: '',
		os_version: '',
		suffix: '',
		// active: '',
		project_leader: '',
		base_ta: '',
		start_date: '',
		end_date: '',
		description: ''
	}

	constructor(public sharedService: SharedService,
		public route: ActivatedRoute,
		public adminService: AdminService,
		public projectStatusService : ProjectStatusService,
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
				console.log('resolved projects list is ', res);
				this.projects = res.projects.data;
			})
	}

	selectProject(obj): void {
		console.log('selected project is ', obj);
		this.selectedProject = obj;
		this.detailsShow = true;
		this.addNewShow = false;
		this.showEditOptions = false;
		this.detailsHeader = obj.project_name + ' Project Details';
		// obj.base_ta = this.dates.base_ta;
		// obj.start_date = this.dates.start_date;
		// obj.end_date = this.dates.end_date;

		this.projects.forEach(function(item){
			item.selected = false;
			if (item.project_name == obj.project_name && item.project_category == obj.project_category){
				item.selected = true;
			}
		})
	}

	addNew(): void{
		this.detailsShow = false;
		this.addNewShow = true;
		this.projects.forEach(function(item){
			item.selected = false;
		})
	}

	enableEdit(): void {
		console.log('click event')
		this.showEditOptions = true;
		//this.disableEditFields = false; //this variable is depricated

	}

	saveProject(str, obj): void {
		if(str == 'cancel'){
			this.showEditOptions = false;
		} else {
			//save the project
			obj.base_ta = moment(obj.base_ta).format("YYYY-MM-DD");
			obj.start_date = moment(obj.start_date).format("YYYY-MM-DD");
			obj.end_date = moment(obj.end_date).format("YYYY-MM-DD");
			console.log('selected project is ', obj);
			if(this.checkProperties(obj) && obj.end_date > obj.start_date){
				this.modifyProjects(obj, 'update', 'Project has been updated!')
			} else if(obj.end_date <= obj.start_date) {
				this.openNotificationbar('End date should be greater than Start date', 'Close');
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

		if(obj.base_ta !== 'Invalid date' && obj.end_date !== 'Invalid date' && obj.os_version !== '' && obj.project_category !== '' && obj.project_code !== '' && obj.project_leader !== '' && obj.project_name !== '' && obj.start_date !== 'Invalid date' && obj.suffix !== ''){
			return true;
		} else {
			return false;
		}
	}

	addNewProject(){
		console.log('add project before moment', this.addProject);
		this.addProject.base_ta = moment(this.addProject.base_ta).format("YYYY-MM-DD");
		this.addProject.start_date = moment(this.addProject.start_date).format("YYYY-MM-DD");
		this.addProject.end_date = moment(this.addProject.end_date).format("YYYY-MM-DD");
		console.log('add project', this.addProject);
		if(this.checkProperties(this.addProject) && this.addProject.end_date > this.addProject.start_date){
			this.modifyProjects(this.addProject, 'add', 'Project has been added!')
		} else if(this.addProject.end_date <= this.addProject.start_date) {
			this.openNotificationbar('End date should be greater than Start date', 'Close');
		} else {
			this.openNotificationbar('All the fields are mandatory', 'Close');
		}
	}

	modifyProjects(obj, url, message): void {
		this.loaderService.show();
		this.projectStatusService.modifyProject(obj, url)
			.subscribe(
				(response) => {
					console.log('project status add update response is ', response);
					if(response['status'] == 'true'){
						this.projects = response['data'];
						this.openNotificationbar(message, 'Close');
						if(url == 'add'){
							this.addProject = {
								project_name: '',
								project_category: '',
								os_version: '',
								suffix: '',
								// active: '',
								project_leader: '',
								base_ta: '',
								start_date: '',
								end_date: '',
								description: '',
								project_code: ''
							}
						} else {
							//this.disableEditFields = true;
							this.showEditOptions = false;
						}
					} else{
						this.openNotificationbar(response['message'], 'Close');
					}
					this.loaderService.hide();
				}, (err) => {
                    console.error('modify project error ', err);
                    this.loaderService.hide();
                }, () => {
                    this.loaderService.hide(); //on complete hide the loader
                }
			)
	}

}
