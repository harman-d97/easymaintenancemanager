import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-all-employee-schedules',
  templateUrl: './all-employee-schedules.component.html',
  styleUrls: ['./all-employee-schedules.component.scss']
})
export class AllEmployeeSchedulesComponent implements OnInit {

  isLogin: boolean = false;
  isAdmin: boolean = false;
  date: string = '';
  employeeId: string = '';
  employees: any = [];

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.isAdminUser();
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.getEmployees();
      this.populateWithAllTasks();
    } else {
      this._router.navigate(['login']);
    }
  }

  isAdminUser() {
    if(this._auth.getAdminStatus() == '1') {
      this.isAdmin = true;
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

  populateWithAllTasks() {
    this._api.getTypeRequest('tasks/get-all-tasks').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        $('#schedules').empty();
        for (let i = 0; i < res.data.length; i++) {
          let taskDescription = res.data[i].description;
          let equipmentName = res.data[i].equipmentName;
          let equipmentNumber = res.data[i].equipmentNumber;
          let estCompletionTime = res.data[i].estCompletionTime;

          let html = `
            <div class="card mx-5 my-3">
              <div class="card-body">
                <h5 class="card-text">Equipment: ${equipmentNumber} - ${equipmentName}</h5>
                <p class="card-text">Description: ${taskDescription}</p>
                <p class="card-text">Estimated Completion Time: ${estCompletionTime} mins</p>
              </div>
            </div>`
          $('#schedules').append(html);
          $('.card').css('background-color', '#3b5249');
          $('.card').css('color', 'white');

        }
      } 
    });
  }

  getSchedule(date: HTMLInputElement, employeeId: HTMLSelectElement) {
    this.date = date.value.toString();
    this.employeeId = employeeId.value.toString();
    console.log("hi");
    console.log("Date: " + this.date + " Employee ID: " + this.employeeId);

    if(this.date == '' && this.employeeId == '') {
      this.populateWithAllTasks();
    }

    if(this.date.length > 0 && this.employeeId == '') {
      this._api.postTypeRequest('tasks/get-employees-schedules-by-date', {date: this.date}).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          $('#schedules').empty();
          for (let i = 0; i < res.data.length; i++) {
            let taskDescription = res.data[i].description;
            let equipmentName = res.data[i].equipmentName;
            let equipmentNumber = res.data[i].equipmentNumber;
            let estCompletionTime = res.data[i].estCompletionTime;

            let html = `
              <div class="card mx-5 my-3">
                <div class="card-body">
                  <h5 class="card-text">Equipment: ${equipmentNumber} - ${equipmentName}</h5>
                  <p class="card-text">Description: ${taskDescription}</p>
                  <p class="card-text">Estimated Completion Time: ${estCompletionTime} mins</p>
                </div>
              </div>`
            $('#schedules').append(html);
            $('.card').css('background-color', '#3b5249');
            $('.card').css('color', 'white');

          }
        } 
      });
    }

    if(this.date == '' && this.employeeId.length > 0) {
      this._api.postTypeRequest('tasks/get-employees-schedules-by-employee', {employee: this.employeeId}).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          $('#schedules').empty();
          for (let i = 0; i < res.data.length; i++) {
            let taskDescription = res.data[i].description;
            let equipmentName = res.data[i].equipmentName;
            let equipmentNumber = res.data[i].equipmentNumber;
            let estCompletionTime = res.data[i].estCompletionTime;

            let html = `
              <div class="card mx-5 my-3">
                <div class="card-body">
                  <h5 class="card-text">Equipment: ${equipmentNumber} - ${equipmentName}</h5>
                  <p class="card-text">Description: ${taskDescription}</p>
                  <p class="card-text">Estimated Completion Time: ${estCompletionTime} mins</p>
                </div>
              </div>`
            $('#schedules').append(html);
            $('.card').css('background-color', '#3b5249');
            $('.card').css('color', 'white');

          }
        } 
      });
    }

  }

}
