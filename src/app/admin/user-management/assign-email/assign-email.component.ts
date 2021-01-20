import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { AdminService } from './../../../admin/admin.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-assign-email',
  templateUrl: './assign-email.component.html',
  styleUrls: ['./assign-email.component.scss']
})
export class AssignEmailComponent implements OnInit {
  //displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;
  @Input() userDetailList:any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  organisationList:any=[];
  displayedColumns: string[] = ['UserEmail'];
  constructor(private fb:FormBuilder
              ,private api:AdminService) {              
               }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.userDetailList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

