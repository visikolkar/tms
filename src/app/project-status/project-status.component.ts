import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { LoaderService } from '../loader/loader.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-project-status',
	templateUrl: './project-status.component.html',
	styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {

	projects:any;
	detailsShow: boolean;
	addNewShow: boolean;
	detailsHeader = 'Project Details';
	searchText: string;
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

}
