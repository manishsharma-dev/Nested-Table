import { ResponseType } from './../../../admin/admindashboard/admin-data-table/admin-data-table.component';
import { AlertComponent } from '../../../Resources/alert/alert.component';
import { UserData } from './history.model';
import { AvailabitityService } from './../../../availabitity.service';
import { DataTableComponent } from '../data-table/data-table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(DataTableComponent, { static: false }) DataTable: DataTableComponent;
  constructor(private Api: AvailabitityService
    , private SpinnerService: NgxSpinnerService
    , private _snackBar: MatSnackBar) { }
  StatusFlag: string = "";
  isLoggedIn: boolean;
  isSuperAdmin:boolean= false;
  TimeLogged;
  timeCounter: number = 0;
  interval;
  RecordHistory = [];
  isSignIn: boolean = false;
  alertMessage: string = "";
  startDate;
  EndDate;
  ngOnInit() {
    var curr = new Date; // get current date
    // last day is the first day + 6
    this.startDate = this.getMondayOfCurrentWeek(curr);
    this.EndDate = this.getSundayOfCurrentWeek(curr);
   this.pageLoadMethod();
   var roleStr = this.Api.StorageData.get('Role');
   var roleArr = (roleStr + "").split("|");
   this.isSuperAdmin = (roleArr.includes("0") || roleArr.includes("1")) ? true : false;
  }
 getMondayOfCurrentWeek(d)
{
    var day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0?-6:1)-day );
}
getSundayOfCurrentWeek(d)
{
    var day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0?0:7)-day );
}

  pageLoadMethod(){
    this.SpinnerService.show();
    this.isLoggedIn = false;
    this.TimeLogged = "00:00:00";
    this.getUserHistory();
  }

  CheckSignInStatus() {
    try {
      //Math.max.apply(Math,array.map(function(o){return o.y;}))
      let newDate = new Date();
      let convertedDate = newDate.toJSON().split('T')[0];
      if(this.RecordHistory!=null && this.RecordHistory.length>0 && this.RecordHistory[0].SignInTime !=null ){
        if (convertedDate == this.RecordHistory[0].SignInDate && !this.RecordHistory[0].SignOutTime) {
          this.isLoggedIn = true;
          if(this.RecordHistory[0].SignInTime){
            var timeDifference = this.HmsToSeconds(newDate.getHours() +
            ':' + newDate.getMinutes()
            + ':' + newDate.getSeconds()) -
            this.HmsToSeconds(this.RecordHistory[0].SignInTime);
          this.startTimer(this.secondsToHms(timeDifference));
          }
         
          // if (!localStorage.getItem("loginKey")) {
          //   localStorage.setItem("loginKey", this.RecordHistory[0].Id);
          // }
          if (! this.Api.StorageData.get("loginKey")) {
              this.Api.StorageData.set("loginKey", this.RecordHistory[0].Id);
            }
        }
        else if (convertedDate == this.RecordHistory[0].SignInDate && this.RecordHistory[0].SignOutTime) {
          this.isSignIn = true;
          this.SpinnerService.hide();
        }
        else {
         // localStorage.removeItem("loginKey");
         this.Api.StorageData.remove("loginKey");
          this.signUserIn();
          this.isLoggedIn = false;
          //this.SpinnerService.hide();
        }
      }
      else{
        this.signUserIn();
      }
     
    }
    catch (ex) {

    }
  }

  formatDate(nDate){
    var month = '' + (nDate.getMonth() + 1),
        day = '' + nDate.getDate(),
        year = nDate.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  getUserHistory() {
    try {
      let userId = this.Api.StorageData.get("UserId");
      var SigninWeeklyRequest = {
        "UserId":userId,
        "StartDate":this.formatDate(this.startDate),
        "EndDate":this.formatDate(this.EndDate)
      }
      this.Api.getWeeklySigninHistory(SigninWeeklyRequest).subscribe((res: ResponseType) => {
        this.RecordHistory = res.Data;
        if (this.RecordHistory!=null && this.RecordHistory.length > 0) {
          this.Api.RefreshDataTable(this.RecordHistory);         
        }
        else {
          this.SpinnerService.hide();
        }
        this.CheckSignInStatus();
      }, (err) => {
        console.log(err);
        this.SpinnerService.hide();
      });
    }
    catch (ex) {

    }
  }

  signUserIn() {
    this.SpinnerService.show();
    // let userId = localStorage.getItem("UserId");
    let userId = this.Api.StorageData.get("UserId");
    let User = {
      "UserId": userId
    }
    this.Api.SignInUser(User)
      .subscribe((res) => {
        if (res.Data.Code === 101) {
          // localStorage.setItem("loginKey", res.Data.Data.Id);
          this.Api.StorageData.set("loginKey",res.Data.Data.Id);
        }
        this.isLoggedIn = true;
        this.openSnackBar(res.Data.Message, "alert-message");
        this.getUserHistory();

      }, (err) => {
        console.log(err);
      })
  }

  signUserOut() {
    try {
      this.SpinnerService.show();
      //let userId = localStorage.getItem("loginKey");
      let userId = this.Api.StorageData.get("loginKey");
      let User = {
        "Id": userId
      }
      this.Api.SignOutUser(User)
        .subscribe((res) => {
          if (res.Data.Code === 103) {
            //localStorage.removeItem("loginKey");
            this.Api.StorageData.remove("loginKey");
          }
          this.getUserHistory();
          this.isSignIn = true;
          this.TimeLogged = "00:00:00";
          this.isLoggedIn = false;
          clearInterval(this.interval);
          this.isLoggedIn = false;
          this.openSnackBar(res.Data.Message, "alert-message");

        }, (err) => {
          console.log(err);
        })
    }
    catch (ex) {

    }

  }


  startTimer(current) {
    let currentTime = current;
    currentTime ? this.timeCounter = this.HmsToSeconds(currentTime) : this.timeCounter = 0;
    this.interval = setInterval(() => {
      this.timeCounter++;
      this.TimeLogged = this.secondsToHms(this.timeCounter);
    }, 1000)
    this.SpinnerService.hide();
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + ":" : "00:";
    var mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + ":" : "00:";
    var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
    return hDisplay + mDisplay + sDisplay;

  }

  HmsToSeconds(Hms) {
    var timeInSeconds = Hms.split(':');
    return (+timeInSeconds[0]) * 60 * 60 + (+timeInSeconds[1]) * 60 + (+timeInSeconds[2]);
  }

  openSnackBar(alertMessage: string, panelClass: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: alertMessage,
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  syncTimesheet(){
    try{
      this.SpinnerService.show();
      this.Api.getWorkItems().subscribe((res)=>{
        console.log("loaded workItems");
        this.getTimelogs();
      })
    }
    catch(ex){
      console.log(ex)
      window.alert("error loading Workitems")
      return
    }
  }

  getTimelogs(){
    try{
      this.Api.getTimelog().subscribe((res)=>{
        this.SpinnerService.hide();
        window.alert("successfully synced timesheet")
      })

    }
    catch(ex){
      console.log(ex);
      this.SpinnerService.hide();
      window.alert("error loading timelog");
    }
  }

}
