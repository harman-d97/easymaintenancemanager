import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId: string = '';
  isLogin: boolean = false;
  employees: any = [];
  showMsg: boolean = false;
  msg: string = '';
  taskDescription: string = '';
  taskAssignedTo: string = '';
  taskRepeatAfter: Number = 0;
  taskEquipmentName: string = '';
  taskEquipmentNumber: string = '';
  taskDate: String = '';
  taskEstCompletionTime: string = '';



  constructor(private _api: ApiService, private _router: Router, private _activatedRoute: ActivatedRoute, private _auth: AuthService) { 
    
  }

  ngOnInit(): void {
    this.taskId = history.state[0];
    console.log(this.taskId);
    this.isUserLogin();
    this.populateForm();
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.getEmployees();
    } else {
      this._router.navigate(['login']);
    }
  }

  populateForm() {
    this._api.postTypeRequest('tasks/get-task-by-id', {taskId: this.taskId}).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.taskDescription = res.data[0].description;
        this.taskAssignedTo = res.data[0].employeeId;
        this.taskRepeatAfter = res.data[0].repeatAfter;
        this.taskEquipmentName = res.data[0].equipmentName;
        this.taskEquipmentNumber = res.data[0].equipmentNumber;
        this.taskDate = res.data[0].dateDue.slice(0, 10);
        this.taskEstCompletionTime = res.data[0].estCompletionTime;
        console.log(this.taskDescription + " " + this.taskAssignedTo + " " + this.taskRepeatAfter + " " + this.taskEquipmentName + " " + this.taskEquipmentNumber + " " + this.taskDate + " " + this.taskEstCompletionTime);
      } else {
        this.msg = 'Error while fetching task details';
        this.showMsg = true;
      }
    });
  }

  getEmployees() {
    this._api.getTypeRequest('user/get-all-employees').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.employees = res.data;
      } else {
        this.employees = [];
      }
    });
  }

  employeeChange(event: any) {
    console.log(event.value);
  }

  onSubmit(form: NgForm) {
    console.log('Edit task form data: ', form.value);
    let currentEmployeeId = this._auth.getUserId();
    this._api.postTypeRequest('tasks/update', { data: form.value, id: this.taskId, employee: currentEmployeeId }).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.msg = 'Task updated successfully';
        this.showMsg = true;
        form.reset(); 
      } else {
        this.msg = 'Error while updating task';
        this.showMsg = true;
      }
    });
  }

}
