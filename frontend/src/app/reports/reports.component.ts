import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  isLogin: boolean = false;
  dateTime: any = [];
  showForm: boolean = false;
  reports: any = [];
  reportsWithFilters: any = [];
  noFilters: boolean = false;
  withFilters: boolean = false;

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.noFilters = true;
      this.renderReports();
    } else {
      this._router.navigate(['login']);
    }
  }

  renderReports() {
    console.log('render reports');
    this.reports = [];
    this._api.getTypeRequest('reports/get-all-reports').subscribe((res: any) => {
      console.log(res);
      if(res.status) {
        for (let i = 0; i < res.data.length; i++) {
          let employeeId = res.data[i].employeeId;
          let changeDescription = res.data[i].changeDescription;
          let date = res.data[i].date

          if (!this.dateTime.includes(date.toString())) {
            this.dateTime.push(date.toString());

            this._api.postTypeRequest('tasks/get-employee-name', {employeeId: employeeId}).subscribe((res: any) => {
              console.log(res);
              if(res.status) {
                let employeeName = res.data[0].firstName + ' ' + res.data[0].lastName;
                let modifiedDate = date.toString().replace('T', ' ');
                let finalDate = modifiedDate.toString().replace('.000Z', ' ');
                this.reports.push({employeeName: employeeName, changeDescription: changeDescription, date: finalDate});
              }
            });
          }
        }
      }
    });
  }

  showFiltersForm() {
    this.showForm = true;
  }

  onSubmit(form: any) {
    this.noFilters = false;
    this.reportsWithFilters = this.reports;
    console.log(form.value);
    let employeeName = form.value.employeeName;
    let startDate = form.value.startDate;
    let endDate = form.value.endDate;

    if ( ((startDate.length > 0 && endDate == '') || (startDate == '' && endDate.length > 0)) &&  employeeName.length == 0) {
      alert('Please enter both a start and end date');
    } else {
      for (let i = 0; i < this.reportsWithFilters.length; i++) {
        let date = this.reportsWithFilters[i].date;
        let formattedDate = date.slice(0, 10);
        console.log(startDate + ' ' + formattedDate);
        if (formattedDate < startDate || formattedDate > endDate) {
          this.reportsWithFilters.splice(i, 1);
        }
      }
      this.withFilters = true;
    }

    if (employeeName.length > 0 && startDate.length == 0 && endDate.length == 0) {
      for (let i = 0; i < this.reportsWithFilters.length; i++) {
        let employee = this.reportsWithFilters[i].employeeName;
        if (!employee.toLowerCase().includes(employeeName.toLowerCase())) {
          this.reportsWithFilters.splice(i, 1);
        }
      }
      this.withFilters = true;
    }

    if (employeeName.length > 0 && startDate.length > 0 && endDate.length > 0) {
      for (let i = 0; i < this.reportsWithFilters.length; i++) {
        let employee = this.reportsWithFilters[i].employeeName;
        let date = this.reportsWithFilters[i].date;
        let formattedDate = date.slice(0, 10);
        if (!employee.toLowerCase().includes(employeeName.toLowerCase()) && (formattedDate < startDate || formattedDate > endDate)) {
          this.reportsWithFilters.splice(i, 1);
        }
      }
      this.withFilters = true;
    }

    if (employeeName.length == 0 && startDate.length == 0 && endDate.length == 0) {
      alert('Please enter a name or a date range');
      this.noFilters = true;
      this.withFilters = false;
    }
    form.reset();
  }

  

}
