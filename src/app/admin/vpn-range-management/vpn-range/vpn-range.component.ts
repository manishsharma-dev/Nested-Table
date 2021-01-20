import { ResponseType } from './../../../Resources/response.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './../../admin.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AvailabitityService } from 'src/app/availabitity.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VpnRangeTableComponent } from "./../vpn-range-table/vpn-range-table.component";
import { AlertComponent } from 'src/app/Resources/alert/alert.component';

@Component({
  selector: 'app-vpn-range',
  templateUrl: './vpn-range.component.html',
  styleUrls: ['./vpn-range.component.scss']
})
export class VpnRangeComponent implements OnInit {
@ViewChild(VpnRangeTableComponent, { static: true }) table: VpnRangeTableComponent;
@ViewChild('content',{static:true}) private content;
  private modalRef: NgbModalRef;
  rangeForm: FormGroup;
  isUpdateFlag : boolean = false;
  isSubmitted:boolean = false;
  constructor(private AdminApi: AdminService
    , public _snackBar: MatSnackBar
    , private SpinnerService: NgxSpinnerService
    ,private api:AvailabitityService 
    ,public dialog: MatDialog
    ,private modalService: NgbModal) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    try{
    this.rangeForm = new FormGroup({
        Id:new FormControl({value:'', disabled:true}),
        RangeFrom: new FormControl('',[Validators.required]),
        RangeTo: new FormControl('',[Validators.required])
    })
    }
    catch(ex){

    }
  }

  open(content) {
     this.rangeForm.reset();
     this.isSubmitted = false;
     this.isUpdateFlag = false;
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

  editRange(e){
    try{
          this.open(this.content);
          this.rangeForm["controls"].Id.patchValue(e.Id);
          this.rangeForm["controls"].RangeFrom.patchValue(e.RangeFrom);
          this.rangeForm["controls"].RangeTo.patchValue(e.RangeTo);
          this.isUpdateFlag = true;
    }
    catch(ex){

    }
  }
  
  submitRange(rangeForm){
    try{
      this.SpinnerService.show(); 
      this.isSubmitted = true;
      if(this.rangeForm.invalid){
        this.SpinnerService.hide(); 
        return;
      }
      let newRange = new rangeData();      
      newRange.RangeFrom = rangeForm.value.RangeFrom;
      newRange.RangeTo = rangeForm.value.RangeTo;
      
          if(this.isUpdateFlag){
            //newRange.UpdatedBy = localStorage.getItem("UserId");
            newRange.UpdatedBy = this.api.StorageData.get("UserId");
            newRange.Id = rangeForm.controls.Id.value;

           this.AdminApi.updateRange(JSON.stringify(newRange)).subscribe((res:ResponseType)=>{
            this.SpinnerService.hide();
            this.table.getRangelist();
            this.closeModal();
            this.rangeForm.reset();
            this.isSubmitted = false;
            this.openSnackBar(res.Data.Message,"alert-message");
           },(err)=>{

           }) 
          }
          else{
            //newRange.CreatedBy = localStorage.getItem("UserId");
            newRange.CreatedBy = this.api.StorageData.get("UserId");
            this.AdminApi.InsertRangeData(JSON.stringify(newRange)).subscribe(
              (res: ResponseType) =>{
                this.SpinnerService.hide();
                this.table.getRangelist();
                this.closeModal();
                this.rangeForm.reset();
                this.isSubmitted =false;
                this.openSnackBar(res.Data.Message,"alert-message");
              },(err)=>{
                this.SpinnerService.hide();
              });
          }
   
    }
    catch(ex){
      this.SpinnerService.hide();
    }
  }

  
  clearRangeForm(){
    this.isSubmitted = false;
  }
  
  openSnackBar(alertMessage: string, panelClass: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: alertMessage,
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  get f() 
  { 
    return this.rangeForm.controls;
  }
}

class rangeData {
  Id: string;
  RangeFrom: string;
  RangeTo: string;
  CreatedBy: string|Object;
  UpdatedBy:string|Object;
}
