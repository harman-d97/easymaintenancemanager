import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PricingComponent } from './pricing/pricing.component';
import { BusinessSignUpComponent } from './business-sign-up/business-sign-up.component';
//import { RegisterComponent } from './auth/register/register.component';
//import { LoginComponent } from './auth/login/login.component';
import { CreateNewTaskComponent } from './create-new-task/create-new-task.component';
import { HomepageLoggedInComponent } from './homepage-logged-in/homepage-logged-in.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CreateNewEquipmentComponent } from './create-new-equipment/create-new-equipment.component';
import { MessagesComponent } from './messages/messages.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { ReportsComponent } from './reports/reports.component';
import { AllEmployeeSchedulesComponent } from './all-employee-schedules/all-employee-schedules.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { AuthModule } from './auth/auth/auth.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    PricingComponent,
    BusinessSignUpComponent,
    CreateNewTaskComponent,
    HomepageLoggedInComponent,
    AllTasksComponent,
    EmployeeScheduleComponent,
    EditTaskComponent,
    CreateNewEquipmentComponent,
    MessagesComponent,
    NewChatComponent,
    ReportsComponent,
    AllEmployeeSchedulesComponent,
    ManageEmployeesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
