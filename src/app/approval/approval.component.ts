import { Component, OnInit } from '@angular/core';
import { APPROVAL } from '../shared/approval';

@Component({
	selector: 'app-approval',
	templateUrl: './approval.component.html',
	styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

	approvals: any;
	selectedTab: number;
	windowheight: number;

	constructor() { }

	activeTab(array): any {
        return array.map(function (item) { return item.isActive; }).indexOf(true);
    }

	ngOnInit() {
		this.windowheight = (73 * window.screen.height) / 100;
		this.approvals = APPROVAL.data;
		console.log(this.approvals[0].empEfforts);
		this.selectedTab = this.activeTab(this.approvals);
	}

	// Doughnut
	public doughnutChartLabels: string[] = ['Emma Plus', 'CV1 Prime', 'Joan O'];
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
