import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogeffortComponent } from '../logeffort/logeffort.component';

import { DashRoutingModule } from './dash-routing.module'
import { ApprovalComponent } from '../approval/approval.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LogeffortComponent,
        ApprovalComponent
    ],
    providers: []
})
export class DashModule { }