import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-my-report',
	templateUrl: './my-report.component.html',
	styleUrls: ['./my-report.component.css']
})
export class MyReportComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	logefforts: any;
	windowheight:any;

	//projects pie-chart
	public pieChartProjectLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
	public pieChartProjectData: number[] = [300, 500, 100];
	public pieChartProjectType: string = 'pie';

	// events
	public projectChartClicked(e: any): void {
		console.log(e);
	}

	public projectChartHovered(e: any): void {
		console.log(e);
	}

	//skilss bars-chart
	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType: string = 'bar';
	public barChartLegend: boolean = true;

	public barChartData: any[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
		{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
	];

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	public randomize(): void {
		// Only Change 3 values
		let data = [
			Math.round(Math.random() * 100),
			59,
			80,
			(Math.random() * 100),
			56,
			(Math.random() * 100),
			40];
		let clone = JSON.parse(JSON.stringify(this.barChartData));
		clone[0].data = data;
		this.barChartData = clone;
		/**
		 * (My guess), for Angular to recognize the change in the dataset
		 * it has to change the dataset variable directly,
		 * so one way around it, is to clone the data, change it and then
		 * assign it;
		 */
	}

	// total log time lineChart
	public lineChartData:Array<any> = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
		{data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
	  ];
	  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	  public lineChartOptions:any = {
		responsive: true
	  };
	  public lineChartColors:Array<any> = [
		{ // grey
		  backgroundColor: 'rgba(148,159,177,0.2)',
		  borderColor: 'rgba(148,159,177,1)',
		  pointBackgroundColor: 'rgba(148,159,177,1)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{ // dark grey
		  backgroundColor: 'rgba(77,83,96,0.2)',
		  borderColor: 'rgba(77,83,96,1)',
		  pointBackgroundColor: 'rgba(77,83,96,1)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(77,83,96,1)'
		},
		{ // grey
		  backgroundColor: 'rgba(148,159,177,0.2)',
		  borderColor: 'rgba(148,159,177,1)',
		  pointBackgroundColor: 'rgba(148,159,177,1)',
		  pointBorderColor: '#fff',
		  pointHoverBackgroundColor: '#fff',
		  pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	  ];
	  public lineChartLegend:boolean = true;
	  public lineChartType:string = 'line';

	ngOnInit() {
		this.windowheight = (73 * window.screen.height) / 100;
		this.route.data
			.subscribe((res: any) => {
				console.log('resolved logeffort is ', res);
				this.logefforts = res.logeffort.data;
			});
		console.log('logeffort data is ', this.logefforts);
	}

}
