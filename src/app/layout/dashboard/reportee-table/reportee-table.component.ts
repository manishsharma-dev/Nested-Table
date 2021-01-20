import { Component, OnInit, ViewChild } from '@angular/core';
import { AvailabitityService } from 'src/app/availabitity.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reportee-table',
  templateUrl: './reportee-table.component.html',
  styleUrls: ['./reportee-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ReporteeTableComponent implements OnInit {
  displayedColumns=["SignInDate","SignInTime","SignOutTime","IpAddress","Email","TotalMinutes"]
  childColumnsToDisplay=["OrganisationName","TeamProject","AreaPath","IterationPath","WorkItemType","Title","WorkHours"];
  userWorkItemDataSource:MatTableDataSource<any>;
  dataSource:MatTableDataSource<HistoryData>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) childPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) childSort: MatSort;
  userId = this.api.StorageData.get('UserId')
  startDate;
  EndDate;
  expandedElement: any | null;

  constructor(private api:AvailabitityService
    , private SpinnerService: NgxSpinnerService) { }
  ngOnInit() {    
    var curr = new Date;
    this.startDate = this.getMondayOfCurrentWeek(curr);
    this.EndDate = this.getSundayOfCurrentWeek(curr);
    this.getWeeklySigninData();
    // this.api.getReporteeData(this.userId).subscribe((res:any)=>{
    //   let tempRecords=res.Data.map(data => {
    //     data.SignInDate = data.SignInDate.slice(0, 10);
    //     return data;
    //   })
    //   this.dataSource=new MatTableDataSource(tempRecords)
    //   // this.dataSource.paginator=this.paginator
    //   this.dataSource.sort=this.sort
    // })
  }

  getUserWorkItems(element){
    if(element.TotalMinutes==0)
    {
      this.userWorkItemDataSource=new MatTableDataSource([]);
      return;  
    }
    this.SpinnerService.show();
    this.api.getUserWorkItems(element).subscribe((res:any)=>{
      this.userWorkItemDataSource=new MatTableDataSource(res.Data);
      this.userWorkItemDataSource.paginator = this.childPaginator;
      this.userWorkItemDataSource.sort = this.childSort;
      this.SpinnerService.hide()
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
    this.SpinnerService.show();
    let userId = this.api.StorageData.get("UserId");
    var weeklySigInRequest = {
      "UserId":userId,
      "StartDate":this.convertDate(new Date(this.startDate),"B"),
      "EndDate":this.convertDate(new Date(this.EndDate),"B")
    }
    this.api.getWeeklyReporteeHistory(weeklySigInRequest).subscribe((res: any) => {    
      let tempRecords=res.Data.map(data => {
        data.SignInDate = data.SignInDate.slice(0, 10);
        return data;
      })
      this.dataSource=new MatTableDataSource(tempRecords)
       this.dataSource.paginator=this.paginator
      this.dataSource.sort=this.sort;
      this.SpinnerService.hide();        
    }, (err) => {
      console.log(err);     
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
  }
}
export interface HistoryData {
  id: string;
  SignInDate: string;
  SignInTime: string;
  SignOutTime:string;
  IpAddress: string;
  TotalMinutes:string;
  Email:string;
}