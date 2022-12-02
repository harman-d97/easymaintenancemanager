import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
  isAdmin: boolean = false;

  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.isAdminUser();
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  isAdminUser() {
    if(this._auth.getAdminStatus() == '1') {
      this.isAdmin = true;
    }
  }

  navigateToHome() {
    this._router.navigate(['/']);
  }

  navigateToPricing() {
    this._router.navigate(['/pricing']);
  }

  navigateToLogin() {
    this._router.navigate(['/login']);
  }

  navigateToHomepageLoggedIn() {
    this._router.navigate(['/homepage-logged-in']);
  }

  navigateToAllTasks() {
    this._router.navigate(['/all-tasks']);
  }

  navigateToMessenger() {
    this._router.navigate(['/messages']);
  }

  navigateToReports() {
    this._router.navigate(['/reports']);
  }

  navigateToManageEmployees() {
    this._router.navigate(['/manage-employees']);
  }

  logout() {
    console.log('logout button clicked');
    this._auth.clearStorage();
    this._router.navigate(['login']);
    window.location.reload();
  }

}
