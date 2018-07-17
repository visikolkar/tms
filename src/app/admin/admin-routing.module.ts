import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectStatusComponent } from '../project-status/project-status.component';
import { JobTaskListComponent } from '../job-task-list/job-task-list.component';


const adminRoutes: Routes = [
    { 
        path: 'project-status', 
        component: ProjectStatusComponent
    }, { 
        path: 'job-task-list', 
        component: JobTaskListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }