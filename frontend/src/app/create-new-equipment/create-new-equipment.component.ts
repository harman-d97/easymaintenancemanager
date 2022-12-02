import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-new-equipment',
  templateUrl: './create-new-equipment.component.html',
  styleUrls: ['./create-new-equipment.component.scss']
})
export class CreateNewEquipmentComponent implements OnInit {

  isLogin: boolean = false;
  showMsg: boolean = false;
  msg: string = '';

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
    } else {
      this._router.navigate(['login']);
    }
  }

  onSubmit(form: NgForm) {
    console.log('Create new equipment form data: ', form.value);
    let currentEmployeeId = this._auth.getUserId();
    this._api.postTypeRequest('equipment/create', { data: form.value, employee: currentEmployeeId }).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.msg = 'Equipment created successfully';
        this.showMsg = true;
        form.reset(); 
      } else {
        this.msg = 'Error while creating equipment';
        this.showMsg = true;
      }
    });
  }

}
