import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: any;

  constructor(private _api: ApiService, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log("register clicked");
    console.log(form.value);
    this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        console.log(res.data);
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._auth.setDataInLocalStorage('id', form.value.employeeId.toString());
        this.logout();
        this._router.navigate(['login']);
      } else {
        console.log(res);
        alert(res.msg);
      }
    });
  }

  logout() {
    this._auth.clearStorage();
  }

}
