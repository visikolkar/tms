import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-my-project-list',
	templateUrl: './my-project-list.component.html',
	styleUrls: ['./my-project-list.component.css']
})
export class MyProjectListComponent implements OnInit {

	activeProjects: any;
	favProjects = [];
	selectedProject = {
		value: '',
		selected: false
	}
	constructor(public sharedService: SharedService,
				public route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data
            .subscribe((res: any) => {
                console.log('resolved projectTasks list is ', res);
                this.activeProjects = res.projectTasks.data.projects;
            })
	}

	addToFav(obj){
		console.log('click event fired', obj);
		var self = this;
		this.activeProjects.forEach(function(item){
			if(item.value == obj.value){
				if(item.selected){
					item.selected = false;
					var idx = self.favProjects.findIndex(o => o.value == item.value);
					if(idx >= 0){
						self.favProjects.splice(idx, 1);
					}
				} else {
					item.selected = true;
					var idx = self.favProjects.findIndex(function(o){
						if(o.value == item.value){
							return o;
						}
					});
					if(!!idx){
						self.favProjects.push(item);
					}
				}
			} else {
				//item.selected = false;
			}
		});
	}

	saveFav(){
		console.log('fav projects are ', this.favProjects);
	}
}
