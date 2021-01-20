import { ResponseType } from './../../../Resources/response.model';
import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvailabitityService } from 'src/app/availabitity.service';
import { stringify } from 'querystring';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from 'src/app/Resources/alert/alert.component';

@Component({
  selector: 'app-RequestChange',
  templateUrl: './RequestChange.component.html',
  styleUrls: ['./RequestChange.component.css']
})
export class RequestChangeComponent implements OnInit {
  remarkList = [];
  selectedRemark;
  @Input() ChildData;
  @Output() closeEvent = new EventEmitter<string>();
  loginRquestForm: FormGroup;
  constructor(private api:AvailabitityService
            ,public _snackBar: MatSnackBar) { }
  ngOnInit() {    
   this.getRemarkList();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.populateField(changes.ChildData.currentValue);
    
  }

  populateField(ChildData){
    //console.log(ChildData);
    this.ChildData = ChildData;
    this.createLoginRequestForm();
  }

  createLoginRequestForm(){
    try{
    this.loginRquestForm = new FormGroup({
        Id:new FormControl({value:this.ChildData.Id}),
        loginDate: new FormControl({value:this.ChildData.SignInDate,disabled:true}),
        loginTime: new FormControl(this.ChildData.SignInTime,[Validators.required]),
        logoutTime: new FormControl(this.ChildData.SignOutTime,[Validators.required]),
        changeReason:new FormControl(''),
        changeReasonDesc: new FormControl(''),
        UserId:new FormControl(this.ChildData.UserId)
    })
    }
    catch(ex){

    }
  }

  getRemarkList(){
    this.api.getRemark()
        .subscribe((res : ResponseType)=>{
          this.remarkList = res.Data;          
        },(err)=>{

        })
  }

  onRemarkSelect($event){

  }

  submitLoginRequest(loginRquestForm){
    try{
      let changeRequestModel = new ChangeRequestModel();
      changeRequestModel.SignInDate = loginRquestForm.controls.loginDate.value;
      changeRequestModel.SignInTime = loginRquestForm.controls.loginTime.value;
      changeRequestModel.SignOutTime = loginRquestForm.controls.logoutTime.value;
      changeRequestModel.Remarks = loginRquestForm.controls.changeReason.value;
      changeRequestModel.RemarksDescription = loginRquestForm.controls.changeReasonDesc.value;
      changeRequestModel.CreatedBy = this.api.StorageData.get("UserId");
      changeRequestModel.UserId = loginRquestForm.controls.UserId.value;
      this.api.addLoginRequest(JSON.stringify(changeRequestModel)).subscribe(
        (res :ResponseType) =>{
          console.log(res);
          this.openSnackBar(res.Data.Message,"alert-message");   
          this.closeEvent.next();       
        },(err)=>{

        })
    }
    catch(ex){

    }
  }

  clearRequestForm(){

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


class ChangeRequestModel{
  Id:String;
  SignInDate:String;
  SignInTime:String;
  SignOutTime:String;
  Remarks:String;
  RemarksDescription:String;
  CreatedBy:string
  UserId:String;
}
