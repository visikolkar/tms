import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogeffortComponent } from '../logeffort/logeffort.component';
import { ApprovalComponent } from '../approval/approval.component';
import { MyProjectListComponent } from '../my-project-list/my-project-list.component';
import { AboutUsComponent } from '../about-us/about-us.component';

const dashRoutes: Routes = [
    { 
        path: 'logeffort', 
        component: LogeffortComponent 
    }, { 
        path: 'approval', 
        component: ApprovalComponent
    }, { 
        path: 'my-project-list', 
        component: MyProjectListComponent
    }, { 
        path: 'about', 
        component: AboutUsComponent
    }
];

//taken from angular.io
//Only call RouterModule.forRoot in the root AppRoutingModule (or the AppModule if 
//that's where you register top level application routes). In any other module, you 
//must call the RouterModule.forChild method to register additional routes.
@NgModule({
    imports: [
        RouterModule.forChild(dashRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashRoutingModule { }