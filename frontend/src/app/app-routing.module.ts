import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PricingComponent } from './pricing/pricing.component';
import { BusinessSignUpComponent } from './business-sign-up/business-sign-up.component';
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
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'business-sign-up', component: BusinessSignUpComponent },
  { path: 'create-new-task', component: CreateNewTaskComponent},
  { path: 'homepage-logged-in', component: HomepageLoggedInComponent},
  { path: 'all-tasks', component: AllTasksComponent},
  { path: 'employee-schedule', component: EmployeeScheduleComponent},
  { path: 'edit-task', component: EditTaskComponent},
  { path: 'create-new-equipment', component: CreateNewEquipmentComponent},
  { path: 'messages', component: MessagesComponent},
  { path: 'new-chat', component: NewChatComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'all-employee-schedules', component: AllEmployeeSchedulesComponent},
  { path: 'manage-employees', component: ManageEmployeesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
