import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  data:any=[{
    "minutes":300,
    "user":"Prinsu Kumar",
    "userId":"a859777d-3599-6993-aeb7-ae3b64cca1d1",
    "date":"2020-04-06",
    "dateWeek":"2020-W15",
    "workItemId":7237,
    "type":"02 Design",
    "comment":"TASK 7367 Create ui to show tag list design",
    "id":"0e0960fa-a5e5-43f2-8ce2-c682fc520461",
    "__etag":1
}]
  filename:string = 'SheetJS.xlsx';
  constructor() { }

  ngOnInit() {
  }

  getSheet(){
    /*generate worksheet*/
    const ws:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    /*generate workbook and add the worksheet*/
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.filename);
  }
}
