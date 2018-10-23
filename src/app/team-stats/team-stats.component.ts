import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-team-stats',
	templateUrl: './team-stats.component.html',
	styleUrls: ['./team-stats.component.css']
})

export class TeamStatsComponent implements OnInit {

	windowHeight: any;
	windowWidth: any;
	tableHeight: any;
	displayedColumns: string[] = ['col1Projection', 'col2Projection', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	// displayedColumnsProject: string[] = ['col1Projection', 'col2Projection'];
	dataSource: any;
	options = {
		reports: 'project'
	};
	year = {
		selected: '2018'
	};
	projectDisplay = true;
	domainDisplay = false;
	projects = [];
	domain = [];
	skill = [];

	paginationDetail = new BehaviorSubject({
		length: 1,
		pageIndex: 0,
		pageSize: 1,
	})
	constructor(private route: ActivatedRoute) { }

	trackByIndex = i => i;
	//trackByIndex = function(i) { return i; }

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit() {
		this.windowHeight = (73 * window.screen.height) / 100;
		this.windowWidth = (10 * window.screen.width) / 100;
		this.tableHeight = (73 * this.windowHeight) / 100;
		this.route.data
			.subscribe((res: any) => {
				console.log('resolved project report is ', res);
				//convert objects of objects to array of objects
				this.projects = Object.keys(res.project.data).map(function (key) {
					console.log('key is ', key);
					return res.project.data[key];
				});
				this.domain = Object.keys(res.domain.data).map(function (key) {
					console.log('key is ', key);
					return res.domain.data[key];
				});
				// this.skill = Object.keys(res.skill.data).map(function (key) {
				// 	console.log('key is ', key);
				// 	return res.skill.data[key];
				// });
			});
		console.log('proj data is ', this.projects);
		console.log('domain data is ', this.domain);
		// console.log('skill level data is ', this.skill);
		this.dataSource = new MatTableDataSource(this.projects);
		this.projectDisplay = true;
		this.domainDisplay = false;
	}

	ngAfterViewInit(){
		this.dataSource.paginator = this.paginator;
	}

	generateReport(): void {
		console.log(this.options, this.year);
		if(this.options.reports && this.year.selected){
			if(this.options.reports == 'domain'){
				this.dataSource = new MatTableDataSource(this.domain);
				this.projectDisplay = false;
				this.domainDisplay = true;
			} else if(this.options.reports == 'project'){
				this.dataSource = new MatTableDataSource(this.projects);
				this.projectDisplay = true;
				this.domainDisplay = false;
			}
		}
	}

	getUpdate(event) {
		this.paginationDetail.next(event);
	}

}
