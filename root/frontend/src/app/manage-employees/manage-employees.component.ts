import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements AfterViewChecked {

  isLogin: boolean = false;
  isAdmin: boolean = false;
  buttonIds: any = [];

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) {
    this.isUserLogin();
    this.isAdminUser();
  }


  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.renderAllEmployees();
    } else {
      this._router.navigate(['login']);
    }
  }

  isAdminUser() {
    if(this._auth.getAdminStatus() == '1') {
      this.isAdmin = true;
    }
  }

  renderAllEmployees() {
    console.log('render all employees');
    this._api.getTypeRequest('user/get-all-users').subscribe((res: any) => {
      console.log(res);
      if(res.status) {
        for(let i = 0; i < res.data.length; i++) {
          let employeeId = res.data[i].employeeId;
          let firstName = res.data[i].firstname;
          let lastName = res.data[i].lastname;

          this.buttonIds.push(employeeId);

          let html = `
            <tr class="text-center">
              <td>${firstName} ${lastName}</td>
              <td><button id="delete${employeeId}" class="btn btn-danger btn-sm">Delete</button></td>
              <td><button id="adminAccess${employeeId}" class="btn btn-primary btn-sm">Give Admin Access</button></td>
            </tr>`

          $('#employees').append(html);
        }
      }
    });
  }

  ngAfterViewChecked() {
    for(let i = 0; i < this.buttonIds.length; i++) {
      let id = this.buttonIds[i];
      $(`#delete${id}`).click(() => {
        console.log('delete button clicked');
        this._api.postTypeRequest('user/delete-user', {employeeId: id}).subscribe((res: any) => {
          console.log(res);
          if(res.status) {
            window.location.reload();
          } else {
            alert("Error deleting employee");
          }
        });
      });

      $(`#adminAccess${id}`).click(() => {
        console.log('give admin access button clicked');
        this._api.postTypeRequest('user/give-admin-access', {employeeId: id}).subscribe((res: any) => {
          console.log(res);
          if(res.status) {
            window.location.reload();
          } else {
            alert("Error occurred in promoting employee to admin");
          }
        });
      });
    }
  }

}
