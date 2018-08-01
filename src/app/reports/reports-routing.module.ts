import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReportComponent } from '../my-report/my-report.component';


const reportRoutes: Routes = [
    { 
        path: 'my-report', 
        component: MyReportComponent
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