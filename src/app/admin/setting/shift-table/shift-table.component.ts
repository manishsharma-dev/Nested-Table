import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shift-table',
  templateUrl: './shift-table.component.html',
  styleUrls: ['./shift-table.component.scss']
})
export class ShiftTableComponent implements OnInit {
  private modalRef: NgbModalRef;
  @ViewChild('content',{static:true}) private content;
  displayedColumns: string[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  ShiftList = [];
  ShiftForm: FormGroup;
  event = {
    eampm: "AM"
  }
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.ShiftList);
    this.createForm();
  }

  createForm() {
    try {
      this.ShiftForm = new FormGroup({
        ShiftId: new FormControl(),
        ShiftName: new FormControl(),
        ShiftStart: new FormControl(),
        ShiftEnd: new FormControl(),
      });
    }
    catch (ex) {

    }
  }

  submitShift(f){
    console.log(f.ShiftId,f.ShiftName,f.shiftStart,f.ShiftEnd);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  open(content){
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
    });
  }

  closeModal(){
    try{
      this.modalRef.close();
    }
    catch(ex){

    }
    
  }

  editUser(r){}
}
