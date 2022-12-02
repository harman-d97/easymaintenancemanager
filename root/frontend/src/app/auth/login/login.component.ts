import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;
  errorMessage: any;

  constructor(private _api: ApiService, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    console.log('login form data: ', form.value);
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._auth.setDataInLocalStorage('admin', res.data[0].adminAccess.toString());
        this._auth.setDataInLocalStorage('id', res.data[0].employeeId.toString());
        window.location.href = '/homepage-logged-in';
      } else {
        alert("Invalid username or password");
      }

    });
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    console.log('logout button clicked');
    this._auth.clearStorage();
    this._router.navigate(['login']);
  }

  navigateToRegister() {
    console.log('navigate to register');
    this._router.navigate(['register']);
  }

}
