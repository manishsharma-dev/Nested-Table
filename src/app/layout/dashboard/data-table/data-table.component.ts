import { AvailabitityService } from './../../../availabitity.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DataTableComponent implements OnInit {
  @Input() TableDataArr: any = [];

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<HistoryData>;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) childPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) childSort: MatSort;
  tempColumnList = ["SignInDate", "SignInTime", "SignOutTime", "LoginTime","TimesheetHours"];
  columnsToDisplay = ["SignInDate", "SignInTime", "SignOutTime", "LoginTime","Timesheet","Email"];
  childColumnsToDisplay=["OrganisationName","TeamProject","AreaPath","IterationPath","WorkItemType","Title","WorkHours"];
  expandedElement: any | null;
  userWorkItemDataSource:MatTableDataSource<UserWorkItemData>;
  startDate;
  EndDate;
  constructor(private api: AvailabitityService,private router : Router
    , private SpinnerService: NgxSpinnerService) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {    
    var curr = new Date; // get current date
    // last day is the first day + 6
    this.startDate = this.getMondayOfCurrentWeek(curr);
    this.EndDate = this.getSundayOfCurrentWeek(curr);
    this.api.HistoryTableData.subscribe((res) => {
      this.TableDataArr = res.map(data => {
        data.SignInDate = data.SignInDate.slice(0, 10);
        data.TotalMinutes = data.TotalMinutes;
        return data;
      });
      this.displayedColumns = [];
      let dataKeys = this.TableDataArr.length ? Object.keys(this.TableDataArr[0]) : [];
      this.displayedColumns = dataKeys.filter(val => this.tempColumnList.includes(val));
      this.displayedColumns.push("LoginTime");
      this.displayedColumns.push("TimesheetHours");
      this.TableDataArr = this.TableDataArr.map(function (el) {
        var o = Object.assign({}, el);
        o.LoginTime = this.calculateLoginHours(o);
        o.SignInTime = o.SignInTime?o.SignInTime.split('.')[0] : null;
        o.SignOutTime = o.SignOutTime ? o.SignOutTime.split('.')[0] : null;
        return o;
      }, this);
      this.dataSource = new MatTableDataSource(this.TableDataArr);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
    this.getWeeklySigninData();
  }
  setNextWeek(){
    let temp = this.EndDate;
    var d= new Date(this.EndDate);
    this.EndDate = d.setDate(d.getDate() + 7);
    let x = new Date(temp); 
    this.startDate = x.setDate(x.getDate() + 1);
    this.getWeeklySigninData();
  }

  getWeeklySigninData(){   
    this.SpinnerService.show() 
    let userId = this.api.StorageData.get("UserId");
    var weeklySigInRequest = {
      "UserId":userId,
      "StartDate":this.convertDate(new Date(this.startDate),"B"),
      "EndDate":this.convertDate(new Date(this.EndDate),"B")
    }
    this.api.getWeeklySigninHistory(weeklySigInRequest).subscribe((res: any) => {    
        this.api.RefreshDataTable(res.Data);
        this.SpinnerService.hide()           
    }, (err) => {
      console.log(err);     
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  generateDatatable() {
    try {

    }
    catch (ex) {

    }
  }

  calculateLoginHours = function (obj) {
    let differenceValueinSeconds = null;
    let differenceValueinHms = null;
    try {
      if (obj.SignOutTime) {
        differenceValueinSeconds = this.api.HmsToSeconds(obj.SignOutTime) - this.api.HmsToSeconds(obj.SignInTime);
        differenceValueinHms = this.api.secondsToHms(differenceValueinSeconds);
      }

    }
    catch (ex) {

    }
    return differenceValueinHms;
  }

  OpenTimesheet(row:any){
   this.router.navigate(['/Timesheet',row.UserId,row.SignInDate])
  }

  getUserWorkItems(element){
    if(element.TotalMinutes==0)
    {
      this.userWorkItemDataSource=new MatTableDataSource([]);
      return;  
    }
    this.SpinnerService.show();
    this.api.getUserWorkItems(element).subscribe((res:any)=>{
      let tempRecords=res.Data.map(data => {
        data.Minutes = data.Minutes;
        return data;
      })
      this.userWorkItemDataSource=new MatTableDataSource(tempRecords);
      this.userWorkItemDataSource.paginator = this.childPaginator;
      this.userWorkItemDataSource.sort = this.childSort;
      this.SpinnerService.hide()
    })
  }
}

export interface HistoryData {
  id: string;
  SignInDate: string;
  SignInTime: string;
  SignOutTime: string;
  TotalMinutes:string;
  Email:string;
}

export interface UserWorkItemData{
  OrganisationName:string,
  AreaPath:string,
  TeamProject:string,
  IterationPath:string,
  WorkItemType:string,
  Title:string,
  Minutes:string
}


