import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseType } from './../../../Resources/response.model';
import { AdminService } from './../../admin.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignEmailComponent } from '../assign-email/assign-email.component';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.scss']
})
export class UserManagementTableComponent implements OnInit {
  UserList = [];
  displayedColumns: string[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() userObjEmit = new EventEmitter<any>();
  @Output() userEmailEmit = new EventEmitter<any>();
  dataSource = new MatTableDataSource();
  tempColumnList = ["Action","Name","Email", "RolesText"];
  constructor(private AdminApi: AdminService
             ,private SpinnerService: NgxSpinnerService
             ,private modalService: NgbModal) { }
  ngOnInit() {
    this.getActiveUserList();
  } 

  public getActiveUserList() {
    try {
      this.SpinnerService.show();
        this.AdminApi.getAllActiveusers().subscribe((res: ResponseType) => {
        this.UserList = res.Data;
        this.dataSource = new MatTableDataSource(this.UserList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        let dataKeys = Object.keys(this.UserList[0]);
        this.displayedColumns = dataKeys.filter(val => this.tempColumnList.includes(val));
        this.displayedColumns.unshift("Action");
        this.SpinnerService.hide();
      }, (err) => {
        this.SpinnerService.hide();
      })
    }
    catch (ex) {
      this.SpinnerService.hide();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ViewUser(e){

  }
  
  editUser(e){
    this.userObjEmit.emit(e);
  }

  assignEmail(e){
    this.userEmailEmit.emit(e);
  }

  deleteUser(e){
      try{
            this.AdminApi.deleteUser(e).subscribe((res)=>{
      this.getActiveUserList();
            },(err)=>{
              this.getActiveUserList();
            })
      }
      catch(ex){

      }
  }

  
}
