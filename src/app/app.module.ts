import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTooltipModule,
    MatSnackBarModule,
} from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { DashModule } from './dash/dash.module';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
// import { LogeffortComponent } from './logeffort/logeffort.component';
// import { ApprovalComponent } from './approval/approval.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginService } from './login/login.service';
import { LoaderService } from './loader/loader.service';
import { AuthUserGuard } from './auth-user.guard';
import { CalendarService } from './calendar/calendar.service';
import { DashResolve, ProjectResolve } from './dash/dash.resolve.service';
import { DashService } from './dash/dash.service';
import { SharedService } from './shared/shared.service';
// import { LogeffortService } from './logeffort/logeffort.service';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashComponent,
        CalendarComponent,
        EmployeeProfileComponent,
        LoaderComponent,
        // LogeffortComponent,
        // ApprovalComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule, 
        ReactiveFormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatInputModule,
        MatListModule,
        MatExpansionModule,
        MatTabsModule,
        MatSelectModule,
        MatDialogModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatGridListModule,
        MatSnackBarModule,
        MatTooltipModule,
        AppRoutingModule,
        DashModule,
    ],
    providers: [
        LoginService,
        LoaderService,
        CalendarService,
        // LogeffortService,
        AuthUserGuard,
        DashService,
        DashResolve,
        ProjectResolve,
        SharedService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EmployeeProfileComponent
    ]
})
export class AppModule { }
