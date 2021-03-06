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
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { DashModule } from './dash/dash.module';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import { DashComponent, DialogLogout } from './dash/dash.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginService } from './login/login.service';
import { LoaderService } from './loader/loader.service';
import { AuthUserGuard, AuthRoleGuard } from './auth-user.guard';
import { CalendarService } from './calendar/calendar.service';
import { DashResolve, ProjectResolve, ApprovalResolve, FavProjectResolve, ActiveProjectResolve } from './dash/dash.resolve.service';
import { DashService } from './dash/dash.service';
import { SharedService } from './shared/shared.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { DialogApproveAll, DialogReject } from './approval/approval.component';
import { DialogLeave, DialogClearAll } from './logeffort/logeffort.component';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/admin.service';
import { AdminResolve, JobTaskListResolve } from './admin/admin.resolve';
import { ReportsComponent } from './reports/reports.component';

import { ReportModule } from './reports/reports.module';
import { ReportsService } from './reports/reports.service';
import { ReportsResolve, ReportsProjectResolve, ReportsDomainResolve, ReportsSkillResolve } from './reports/reports.resolve';
// import { ProjectStatusComponent } from './project-status/project-status.component';
// import { JobTaskListComponent } from './job-task-list/job-task-list.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashComponent,
        CalendarComponent,
        EmployeeProfileComponent,
        DialogApproveAll,
        DialogReject,
        DialogLeave,
        DialogLogout,
        DialogClearAll,
        LoaderComponent,
        NotfoundComponent,
        AdminComponent,
        ReportsComponent,
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        AppRoutingModule,
        DashModule,
        AdminModule,
        ReportModule
    ],
    providers: [
        LoginService,
        LoaderService,
        CalendarService,
        // LogeffortService,
        AuthUserGuard,
        AuthRoleGuard,
        DashService,
        DashResolve,
        AdminService,
        AdminResolve,
        ReportsService,
        ReportsResolve,
        ProjectResolve,
        FavProjectResolve,
        ActiveProjectResolve,
        ApprovalResolve,
        SharedService,
        MatDatepickerModule,
        JobTaskListResolve,
        ReportsProjectResolve,
        ReportsDomainResolve,
        ReportsSkillResolve
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EmployeeProfileComponent,
        DialogApproveAll,
        DialogReject,
        DialogLeave,
        DialogLogout,
        DialogClearAll
    ]
})
export class AppModule { }
