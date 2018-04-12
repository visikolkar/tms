import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogeffortComponent } from '../logeffort/logeffort.component';

const dashRoutes: Routes = [
    { path: 'logeffort', component: LogeffortComponent },
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