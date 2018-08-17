import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS } from '../shared/approval';
import { DashService } from '../dash/dash.service';
import { LoaderService } from '../loader/loader.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-my-project-list',
	templateUrl: './my-project-list.component.html',
	styleUrls: ['./my-project-list.component.css']
})
export class MyProjectListComponent implements OnInit {

	window:any = window;
	Object = Object;
	activeProjects: any;
	favProjects: any;
	results: any;
	selectedProject = {
		value: '',
		selected: false
	}
	constructor(public sharedService: SharedService,
		public route: ActivatedRoute,
		public dashService: DashService,
		public loaderService: LoaderService,
		public notificationBar: MatSnackBar) { 
		
	}

	openNotificationbar(message: string, action: string) {
		this.notificationBar.open(message, action, {
			duration: 5000,
			verticalPosition: 'top'
		});
	}

	ngAfterViewInit() {
		// setTimeout(_ => this.window.showSidenav = false);
		// this.cdRef.detectChanges();
	}
	ngOnInit() {
		this.route.data
			.subscribe((res: any) => {
				var self = this;
				console.log('resolved projectTasks list is ', res);
				this.activeProjects = res.projects.data;
				this.favProjects = res.favorites.data;
				this.favProjects.forEach(function(item){
					item.selected = true;
				});
				console.log('fav projects with selected ', this.favProjects);
				this.favProjects.forEach(function(obj){
					self.activeProjects.forEach(function(item){
						if(item.project_name == obj.project_name && item.project_category == obj.project_category){
							item.selected = true;
						} else {
							//item.selected = false;
						}
					})
				})
				// this.activeProjects = PROJECTS;
				this.results = this.activeProjects.reduce(function (h, a) {
					var _a;
					return Object.assign(h, (_a = {}, _a[a.project_category] = (h[a.project_category] || []).concat(a), _a));
				}, {});
				
				console.log('grouped active projects are ', this.results);
			})
	}

	addToFav(obj) {
		console.log('click event fired', obj);
		var self = this;
		for (var key in this.results) {
			this.results[key].forEach(function (item) {
				if (item.project_name == obj.project_name && item.project_category == obj.project_category) {
					if (item.selected && item.project_name != 'Common') {
						item.selected = false;
						var idx = self.favProjects.findIndex(o => o.project_name == obj.project_name && o.project_category == obj.project_category);
						if (idx >= 0) {
							self.favProjects.splice(idx, 1);
						}
					} else {
						item.selected = true;
						var idx = self.favProjects.findIndex(function (o) {
							if (o.project_name == obj.project_name && o.project_category == obj.project_category) {
								return o;
							}
						});
						if (idx == -1) {
							self.favProjects.push(item);
						}
					}
				} else {
					//item.selected = false;
				}
			});
		}
		// this.activeProjects.forEach(function (item) {
		// 	if (item.value == obj.value) {
		// 		if (item.selected) {
		// 			item.selected = false;
		// 			var idx = self.favProjects.findIndex(o => o.value == item.value);
		// 			if (idx >= 0) {
		// 				self.favProjects.splice(idx, 1);
		// 			}
		// 		} else {
		// 			item.selected = true;
		// 			var idx = self.favProjects.findIndex(function (o) {
		// 				if (o.value == item.value) {
		// 					return o;
		// 				}
		// 			});
		// 			if (!!idx) {
		// 				self.favProjects.push(item);
		// 			}
		// 		}
		// 	} else {
		// 		//item.selected = false;
		// 	}
		// });
	}

	saveFav() {
		console.log('fav projects are ', this.favProjects);
		this.loaderService.show();
		this.dashService.postFavProjects(this.favProjects)
			.subscribe(
				(response) => {
					console.log('logeffort submit response is ', response);
					if (response['status'] == 'true') {

						// localStorage.setItem('logEffort', JSON.stringify(response['data']));
						this.openNotificationbar('Favorites saved successfully!', 'Close');
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
}
