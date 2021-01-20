import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-data-table',
  templateUrl: './admin-data-table.component.html',
  styleUrls: ['./admin-data-table.component.scss']
})
export class AdminDataTableComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  tempColumnList = ["UserName","Email","SignInDate", "SignInTime", "SignOutTime", "LoginTime","IpAddress"];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  userTableDataArr = [];
  startDate
  EndDate
  constructor(private adminApi: AdminService) {
   }

  ngOnInit() {
    this.adminApi.userHistoryTableData.subscribe((res)=>{
      if(res){
        this.userTableDataArr =res.map(data=>{
          data.SignInDate = data.SignInDate.slice(0,10);
         return data;
        });
      }
     
      if(res.length<=0){
        return;
      }
      let dataKeys = Object.keys(res[0]);
      this.displayedColumns = dataKeys.filter(val => this.tempColumnList.includes(val));
      this.displayedColumns.push("LoginTime");
    this.userTableDataArr = this.userTableDataArr.map(function(el) {
      var o = Object.assign({}, el);
      o.LoginTime = this.calculateLoginHours(o);
      o.SignInTime = o.SignInTime.split('.')[0];
      o.SignOutTime = o.SignOutTime? o.SignOutTime.split('.')[0]:null;
      return o;
    },this);
      this.dataSource = new MatTableDataSource(this.userTableDataArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  calculateLoginHours = function(obj){
    let differenceValueinSeconds = null;
    let differenceValueinHms = null;
      try{
        if(obj.SignOutTime){
          differenceValueinSeconds = this.adminApi.HmsToSeconds(obj.SignOutTime) - this.adminApi.HmsToSeconds(obj.SignInTime);
          differenceValueinHms = this.adminApi.secondsToHms(differenceValueinSeconds);
        }
        
      }
      catch(ex){

      }
      return differenceValueinHms;
  }

  getFilterData(data){
    try{
  console.log(data);
    }catch(ex){

    }
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

  convertDate(inputFormat,flag) {
    switch(flag){
       case "A":
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
         break;
       case "B":
        var month = '' + (inputFormat.getMonth() + 1),
        day = '' + inputFormat.getDate(),
        year = inputFormat.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
         break;
    }
    
  }
    setPreviousWeek(){
    let temp = this.startDate;
    var d= new Date(this.startDate);
    this.startDate = d.setDate(d.getDate() - 7);
    let x = new Date(temp)
    this.EndDate = x.setDate(x.getDate()-1);
    //this.getWeeklySigninData();
  }
  setNextWeek(){
    let temp = this.EndDate;
    var d= new Date(this.EndDate);
    this.EndDate = d.setDate(d.getDate() + 7);
    let x = new Date(temp); 
    this.startDate = x.setDate(x.getDate() + 1);
    //this.getWeeklySigninData();
  }

  // getWeeklySigninData(){    
  //   let userId = this.adminApi.StorageData.get("UserId");
  //   var weeklySigInRequest = {
  //     "UserId":userId,
  //     "StartDate":this.convertDate(new Date(this.startDate),"B"),
  //     "EndDate":this.convertDate(new Date(this.EndDate),"B")
  //   }
  //   this.adminApi.getWeeklyReporteeHistory(weeklySigInRequest).subscribe((res: any) => {    
  //     let tempRecords=res.Data.map(data => {
  //       data.SignInDate = data.SignInDate.slice(0, 10);
  //       return data;
  //     })
  //     this.dataSource=new MatTableDataSource(tempRecords)
  //      this.dataSource.paginator=this.paginator
  //     this.dataSource.sort=this.sort        
  //   }, (err) => {
  //     console.log(err);     
  //   });
  // }
}


export interface ResponseType {
  Data: any;
  Error: any;
  Success: boolean;
}


