import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Component({
	selector: 'app-team-stats',
	templateUrl: './team-stats.component.html',
	styleUrls: ['./team-stats.component.css']
})

export class TeamStatsComponent implements OnInit {

	windowheight: any;
	windowWidth: any;
	displayedColumnsProject: string[] = ['col1Projection', 'col2Projection', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	// displayedColumnsProject: string[] = ['col1Projection', 'col2Projection', 'JAN'];
	dataSource: any; 
	options = {
		reports: 'project'
	};
	year = {
		selected: '2018'
	};
	projects = [];
	constructor(private route: ActivatedRoute) { }

	trackByIndex = i => i;
	//trackByIndex = function(i) { return i; }
	ngOnInit() {
		this.windowheight = (73 * window.screen.height) / 100;
		this.windowWidth = (10 * window.screen.width) / 100;
		this.route.data
			.subscribe((res: any) => {
				console.log('resolved project report is ', res);
				//convert objects of objects to array of objects
				this.projects = Object.keys(res.project.data).map(function (key) {
					console.log('key is ', key);
					return res.project.data[key];
				});
			});
		console.log('proj data is ', this.projects);
		this.dataSource = new MatTableDataSource(this.projects);
	}

	generateReport(): void {
		console.log(this.options, this.year);
	}

}
