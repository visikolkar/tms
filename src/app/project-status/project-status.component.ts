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
	detailsHeader = 'Project Details'
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
	}

	addNew(): void{
		this.detailsShow = false;
		this.addNewShow = true;
	}

}
