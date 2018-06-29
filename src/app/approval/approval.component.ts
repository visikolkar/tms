import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-approval',
	templateUrl: './approval.component.html',
	styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	// Doughnut
	public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	public doughnutChartData: number[] = [350, 450, 100];
	public doughnutChartType: string = 'doughnut';

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

}
