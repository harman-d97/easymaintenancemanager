import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent implements AfterViewChecked {

  isLogin: boolean = false;
  isAdmin: boolean = false;
  buttonIds: any = [];

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) {
    this.isUserLogin();
    this.isAdminUser();
  }

  // ngOnInit(): void {
  //   this.isUserLogin();
  // }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.renderAllTasks();
    } else {
      this._router.navigate(['login']);
    }
  }

  isAdminUser() {
    if(this._auth.getAdminStatus() == '1') {
      this.isAdmin = true;
    }
  }

  renderAllTasks() {
    console.log('render all tasks');
    this._api.getTypeRequest('tasks/get-all-tasks').subscribe((res: any) => {
      console.log(res);
      if(res.status) {
        for(let i = 0; i < res.data.length; i++) {
          let equipmentName = res.data[i].equipmentName;
          let equipmentNumber = res.data[i].equipmentNumber;
          let description = res.data[i].description;
          let dateDue = res.data[i].dateDue.slice(0, 10);
          let employeeId = res.data[i].employeeId;
          let taskId = res.data[i].taskId.toString();

          this.buttonIds.push(taskId);

          this._api.postTypeRequest('tasks/get-employee-name', {employeeId: employeeId}).subscribe((res: any) => {
            console.log(res);
            if(res.status) {
              let employeeName = res.data[0].firstName + ' ' + res.data[0].lastName;
              let html = `
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-text">${equipmentName} - ${equipmentNumber}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text">&nbsp;&nbsp;&nbsp;&nbsp;Date Due: ${dateDue}&nbsp;&nbsp;&nbsp;&nbsp;Assigned To: ${employeeName}</p>
                  </div>
                  <div class="card-footer text-end">
                    <button type="button" class="btn btn-primary" id="edit${taskId}">Edit</button>
                    <button type="button" class="btn btn-primary" id="completed${taskId}">Completed</button>
                    <button type="button" class="btn btn-primary" id="delete${taskId}">Delete</button>
                  </div>
                </div>`
              $('#tasks').append(html);
              $('.card').css('background-color', '#3b5249');
              $('.card').css('color', 'white');
            }
          });
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    let currentEmployeeId = this._auth.getUserId();
    for(let i = 0; i < this.buttonIds.length; i++) {
      let id = this.buttonIds[i];

      $(`#edit${id}`).click(() => {
        console.log("edit button clicked with id: " + id);
        this._router.navigateByUrl('/edit-task', {state: id});
      });

      $(`#completed${id}`).click(() => {
        console.log("completed button clicked with id: " + id);
        this._api.postTypeRequest('tasks/update-task-status', {taskId: id, employee: currentEmployeeId}).subscribe((res: any) => {
          console.log(res);
          if(res.status) {
            window.location.reload();
          } else {
            alert("Error updating task status");
          }
        });
      });

      $(`#delete${id}`).click(() => {
        console.log("delete button clicked with id: " + id);
        this._api.postTypeRequest('tasks/delete', {taskId: id, employee: currentEmployeeId}).subscribe((res: any) => {
          console.log(res);
          if(res.status) {
            window.location.reload();
          } else {
            alert("Error deleting task");
          }
        });
      });

      if (!this.isAdmin) {
        $(`#delete${id}`).prop('disabled', true);
      }
    }
  }

  navigateToCreateNewEquipment() {
    this._router.navigate(['/create-new-equipment']);
  }

  navigateToCreateNewTask() {
    this._router.navigate(['/create-new-task']);
  }

  navigateToEmployeeSchedule() {
    this._router.navigate(['/employee-schedule']);
  }

  navigateToAllEmployeeSchedules() {
    this._router.navigate(['/all-employee-schedules']);
  }

}
