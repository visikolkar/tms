import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogeffortComponent } from '../logeffort/logeffort.component';

import { DashRoutingModule } from './dash-routing.module'

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LogeffortComponent
    ],
    providers: []
})
export class DashModule { }