import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.scss']
})
export class EmployeeScheduleComponent implements OnInit {

  isLogin: boolean = false;

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
    } else {
      this._router.navigate(['login']);
    }
  }

  getSchedule(event: any) {
    let date = event.value;
    let employeeId = this._auth.getUserId();
    console.log(date + " " + employeeId);
    this._api.postTypeRequest('tasks/get-employee-schedule', {employeeId: employeeId, date: date}).subscribe((res: any) => {
      console.log(res);
      if(res.status) {
        $('#schedule').empty();
        for(let i = 0; i < res.data.length; i++) {
          let equipmentName = res.data[i].equipmentName;
          let equipmentNumber = res.data[i].equipmentNumber;
          let description = res.data[i].description;
          let estCompletionTime = res.data[i].estCompletionTime;
          console.log(equipmentName + " " + equipmentNumber + " " + description + " " + estCompletionTime);
          let html = `
            <div class="card mx-5 my-3">
              <div class="card-body">
                <h5 class="card-text">Equipment: ${equipmentNumber} - ${equipmentName}</h5>
                <p class="card-text">Description: ${description}</p>
                <p class="card-text">Estimated Completion Time: ${estCompletionTime} mins</p>
              </div>
            </div>`
          $('#schedule').append(html);
          $('.card').css('background-color', '#3b5249');
          $('.card').css('color', 'white');
        }
      }
    });
  }

}
