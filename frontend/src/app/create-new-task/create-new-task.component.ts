import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss']
})
export class CreateNewTaskComponent implements OnInit {

  isLogin: boolean = false;
  showMsg: boolean = false;
  msg: string = '';
  employees: any = [];
  equipments: any = [];
  equipmentNum: string = '';


  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.getEmployees();
      this.getEquipments();
    } else {
      this._router.navigate(['login']);
    }
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

  getEquipments() {
    this._api.getTypeRequest('equipment/get-all-equipment').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.equipments = res.data;
      } else {
        this.equipments = [];
      }
    });
  }

  showEquipmentNumber(event: any) {
    console.log(event.value);
    this.equipments.forEach((equipment: any) => {
      if(equipment.equipmentName == event.value) {
        this.equipmentNum = equipment.equipmentNumber;
      }
    });
  }

  employeeChange(event: any) {
    console.log(event.value);
  }

  onSubmit(form: NgForm) {
    console.log('Create new task form data: ', form.value);
    let currentEmployeeId = this._auth.getUserId();
    this._api.postTypeRequest('tasks/create', {data: form.value, currentEmployee: currentEmployeeId }).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.msg = 'Task created successfully';
        this.showMsg = true;
        form.reset(); 
      } else {
        this.msg = 'Error while creating task';
        this.showMsg = true;
      }
    });
  }

}
