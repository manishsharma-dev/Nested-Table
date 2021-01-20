import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-timesheet-table',
  templateUrl: './timesheet-table.component.html',
  styleUrls: ['./timesheet-table.component.scss']
})
export class TimesheetTableComponent implements OnInit {
  displayedColumns = ["Action","UserStory","Time","Type"]
  dataSource = new MatTableDataSource(data);
  SignInDate : string; 

  @ViewChild (MatPaginator, { static:true }) paginator:MatPaginator;
  @ViewChild (MatSort, { static:true }) sort : MatSort;
  constructor(private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.SignInDate=(param.get('SignInDate'));
    })
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  getInfo(row){
    console.log("hello");
  }

  editInfo(row){
    
  }
}

export interface TimesheetData{
  UserStory:string;
  time:string;
  type:string;
}

const data:TimesheetData[] = [
{
  UserStory:"2056",
  time:"2",
  type:"design"
},
{
  UserStory:"7233",
  time:"1",
  type:"development"
}
]
