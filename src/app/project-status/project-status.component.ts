import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { LoaderService } from '../loader/loader.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

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
	dates = {
		start_date: '',
		base_ta: ''
	}
	addProject = {
		project_name: '',
		project_category: '',
		os_version: '',
		suffix: '',
		active: '',
		project_leader: '',
		base_ta: '',
		start_date: '',
		comments: ''
	}

	constructor(public sharedService: SharedService,
		public route: ActivatedRoute,
		public adminService: AdminService,
		public loaderService: LoaderService,
		public notificationBar: MatSnackBar) { }

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
		this.detailsHeader = obj.project_name + ' Project Details';
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

	editEnable(): void {
		console.log('click event')
		this.showEditOptions = true;
	}

	saveProject(str): void {
		if(str == 'cancel'){
			this.showEditOptions = false;
		} else {
			//save the project
		}
	}

	key_press(e) {
		//block user from entering in leave dates
		console.log('event fired');
		e.preventDefault();
	}

	addNewProject(){
		console.log('add project before moment', this.addProject);
		this.addProject.base_ta = moment(this.dates.base_ta).format("DD-MM-YYYY");
		this.addProject.start_date = moment(this.dates.start_date).format("DD-MM-YYYY");
		console.log('add project', this.addProject);
	}

}
