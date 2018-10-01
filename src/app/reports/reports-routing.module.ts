import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReportComponent } from '../my-report/my-report.component';
import { TeamStatsComponent } from '../team-stats/team-stats.component';


const reportRoutes: Routes = [
    { 
        path: 'my-report', 
        component: MyReportComponent
    }, { 
        path: 'team-stats', 
        component: TeamStatsComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(reportRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ReportsRoutingModule { }