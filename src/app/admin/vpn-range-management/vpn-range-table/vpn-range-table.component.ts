import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { ResponseType } from './../../../Resources/response.model';
import { MatTableDataSource, MatSort, MatPaginator,MatSnackBar } from '@angular/material';
import { AdminService } from '../../admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertComponent } from '../../../Resources/alert/alert.component';
@Component({
  selector: 'app-vpn-range-table',
  templateUrl: './vpn-range-table.component.html',
  styleUrls: ['./vpn-range-table.component.scss']
})
export class VpnRangeTableComponent implements OnInit {
  displayedColumns: string[] = [];
  rangeList = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  tempColumnList = ["RangeFrom","RangeTo","IsActive"];
  @Output() rangeObjEmit = new EventEmitter<any>();
  constructor(private AdminApi:AdminService
    ,private SpinnerService: NgxSpinnerService
    , public _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRangelist();
  }

  getRangelist(){
    try{
      this.SpinnerService.show();
        this.AdminApi.getRangeData().subscribe((res: ResponseType) => {
            this.rangeList = res.Data;
            this.dataSource = new MatTableDataSource(this.rangeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.rangeList!=null && this.rangeList.length>0){
        let dataKeys = Object.keys(this.rangeList[0]);
        this.displayedColumns = dataKeys.filter(val => this.tempColumnList.includes(val));
        this.displayedColumns.unshift("Action"); 
        }
        else{
          this.displayedColumns = [];
        }
        
      this.SpinnerService.hide();
      },(err)=>{

        })
    }
    catch(ex){

    }
  }

  editRange(row){
    try{
  this.rangeObjEmit.emit(row);
    }
    catch(ex){

    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRange(row){
    try{  
        var rangeObj = {
          "Id":row.Id
        }
        this.AdminApi.deleteRange(JSON.stringify(rangeObj)).subscribe((res:ResponseType)=>{
        this.getRangelist();
        this.openSnackBar(res.Data.Message,"alert-message");
        },(err)=>{
          
        })

    }
    catch(ex){

    }
  }

  openSnackBar(alertMessage: string, panelClass: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: alertMessage,
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

}
