import { AvailabitityService } from './../../../availabitity.service';
import { ResponseType } from './../../../Resources/response.model';
import { AlertComponent } from '../../../Resources/alert/alert.component';
import { UserManagementTableComponent } from './../user-management-table/user-management-table.component';
import { AdminService } from './../../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { FormGroup, FormArray, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        backgroundColor: 'orange',
        width: '100px',
        height: '100px'
      })),
      state('out', style({
        backgroundColor: 'blue',
        width: '200px',
        height: '200px'
      })),
      transition('in=>out', animate('3000ms')),
      transition('out=>in', animate('3000ms'))
    ])
  ]
})

export class UserManagementComponent implements OnInit {
  private modalRef: NgbModalRef;
  userDetailList = [];
  UserForm: FormGroup;
  addFormFlag: boolean = false;
  newUser = new UserData();
  selectedUser;
  isSelectDisabled:boolean;
  isUpdateFlag:boolean;
  isSubmitted:boolean;
  selectedOrganisation:any;
  organisationList = [];
  selectedUserforEmail:any;
  assignedEmail:string = "";
  assignEmailUserName:string ="";
  userId:any;
  isDefaultEmail:boolean = false;
  @ViewChild(UserManagementTableComponent, { static: true }) table: UserManagementTableComponent;
  @ViewChild('content',{static:true}) private content;
  @ViewChild('emailcontent',{static:true}) private emailContent;
  roleData: any = [];
  constructor(private AdminApi: AdminService
    , public _snackBar: MatSnackBar
    , private SpinnerService: NgxSpinnerService
    ,private api:AvailabitityService 
    ,public dialog: MatDialog
    ,private modalService: NgbModal
       ) { }
  ADUserList: any = [];
  userForm: FormGroup;
  selectedAssignUserId:any;
  ngOnInit() {
    this.SpinnerService.show();
    this.addFormFlag = false;
    this.isSelectDisabled = false;
    this.getADUserList();    
    this.isUpdateFlag = false;
  }

  open(content) {
    this.isSelectDisabled = false;
     this.isUpdateFlag = false;
     this.userForm.reset();
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
    });
  }



  createForm() {
    try {
      this.userForm = new FormGroup({
        userId: new FormControl(),
        userName: new FormControl({value: '', disabled: true}),
        roles: new FormArray([])
      });
    }
    catch (ex) {

    }
  }

  createCheckBox() {
    try {
      this.roleData.forEach((element, i) => {
        const control = new FormControl();
        (this.userForm.controls.roles as FormArray).push(control);
      });
      this.SpinnerService.hide();
    }
    catch (ex) {

    }
  }

  getADUserList() {
    this.AdminApi.getADUserList().subscribe((res) => {
      this.ADUserList = res;
      this.getRoleList();
    });
  }

  getRoleList(){
    try{
      this.AdminApi.getRoles().subscribe((res:ResponseType) => {
        this.roleData = res.Data;
        this.createForm();
        this.createCheckBox();        
      });
    }
    catch(ex){

    }
  }

  onUserSelect(event) {
    try {
     
      this.newUser.UserName = event.SAMAccountName;
      this.newUser.UserObjectGuid = event.ObjectGUID;
      this.newUser.Email= event.Mail;
      this.newUser.Roles = [];
      //this.newUser.CreatedBy = localStorage.getItem("UserId");
      this.newUser.CreatedBy = this.api.StorageData.get('UserId');
    }
    catch (ex) {
    }
  }

  toggleForm() {
    try {
      this.isSelectDisabled = false;
      this.isUpdateFlag = false;
      this.addFormFlag = this.addFormFlag ? false : true;
      let roleLen = this.userForm['controls'].roles['controls'].length;
      this.userForm.reset();
      this.selectedUser =[];     
    }
    catch (ex) {

    }
  }

  syncAllUsers(){
    
    try{
      this.SpinnerService.show();
      //this.newUser.CreatedBy = localStorage.getItem("UserId");
      this.newUser.CreatedBy = this.api.StorageData.get("UserId");
      this.AdminApi.syncAllUsers(JSON.stringify(this.newUser)).subscribe((res : ResponseType)=>{
        this.table.getActiveUserList();
        this.openSnackBar(res.Data.Message, "alert-message");
        this.SpinnerService.hide();
      },(err)=>{

      })
      
    }
    catch(ex){

    }
  }

  clearUserForm() {
    try {
      this.isSelectDisabled = false;
      this.selectedUser = [];
      this.isSubmitted = false;
    }
    catch (ex) {

    }
  }

  submitUser(userForm) {
    try {
      this.SpinnerService.show(); 
      this.isSubmitted = true;
    
      if(!this.newUser.Roles){
        this.newUser.Roles = [];
      }        
      userForm.controls.roles.value.forEach((element, i) => {
        if (element) {
          this.newUser.Roles.push(i);
        }
      });
      if(!this.isUpdateFlag){
        if((this.selectedUser == null || this.selectedUser.length<=0) && this.userForm.valid ){
          this.SpinnerService.hide(); 
          return;        
        }
        this.AdminApi.addUser(JSON.stringify(this.newUser)).subscribe((res: ResponseType) => {
          this.table.getActiveUserList();
          this.newUser.Roles = [];
          this.openSnackBar(res.Data.Message, "alert-message");
          this.clearField(userForm);
          this.modalRef.close();
          this.isSubmitted = false;
        }, (err) => {
          this.SpinnerService.hide();
          this.isSubmitted = false;
        })
      }
      else{
        this.newUser.Id = userForm.controls.userId.value;  
        this.AdminApi.updateUser(JSON.stringify(this.newUser)).subscribe((res : ResponseType)=>{
          this.table.getActiveUserList();
          this.openSnackBar(res.Data.Message, "alert-message");
          this.clearField(userForm);
          this.modalRef.close();
        },(err)=>{
          this.isSubmitted = false;
        }) 
      }
      
    }
    catch (ex) {
      this.isSubmitted = false;
      console.log(ex.message);
    }
  }

  clearField(userForm) {
    try {
      this.isSubmitted = false;
      let len = userForm.controls.roles.value.length;
      this.isSelectDisabled = false;
      this.userForm.reset();
      this.selectedUser = [];
      this.SpinnerService.hide();
    }
    catch (ex) {
      this.SpinnerService.hide();
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

  
  editUser($event){
    try{
      this.open(this.content);
      this.addFormFlag =true;
      this.isSelectDisabled = true;
      this.isUpdateFlag = true;
      let Len =this.ADUserList.length;
      this.newUser.Roles = [];
      for(let r = 0; r<Len; r++){
        if(this.ADUserList[r].ObjectGUID === $event.UserObjectGuid){
          this.selectedUser = this.ADUserList[r];
          break;
        }
      }  
      for(let x=0;x<this.userForm.get('roles').value.length;x++){
         if($event.Roles.includes(x)){
          this.userForm.get('roles').value[x]=true;
          this.userForm['controls'].roles['controls'][x].value=true;
         }
         else{
          this.userForm.get('roles').value[x]=false;
          this.userForm['controls'].roles['controls'][x].value=false;
         }
      }
      this.newUser.UserName = $event.UserName;
      this.newUser.UserObjectGuid = $event.UserObjectGuid;
      //this.newUser.UpdatedBy =localStorage.getItem("UserId");
      this.newUser.UpdatedBy = this.api.StorageData.get('UserId'); 
      this.userForm["controls"].userId.patchValue($event.Id);
      this.userForm["controls"].userName.patchValue($event.Name);
      this.userForm.patchValue(this.userForm.value);  
    }
    catch(ex){
      console.log(ex);
    }   
  }  

  assignUserEmail($event){
    this.selectedUserforEmail = $event;
    this.assignEmailUserName = $event.Name;
    this.userId= $event.UserId;
    this.getAllOrganisationNames($event);
    
  }

  closeModal(){
    try{
      this.modalRef.close();
    }
    catch(ex){

    }
    
  }

  getAllOrganisationNames($event){
    try{
      this.AdminApi.getAllOrganisationNames()
          .subscribe((res:any)=>{
              this.organisationList= res.Data;
              this.getUserDetailsList($event.Id,0);  
          })
    }
    catch(ex){

    }
  }

  getUserDetailsList($event,flag){
      try{
        var user ={
          "UserId":$event
        }
        this.AdminApi.getUserDetailList(user)
            .subscribe((res:any)=>{
              this.userDetailList = res.Data;
              if(!flag){
                this.open(this.emailContent); 
              }
              
            })
      }
      catch(ex){

      }
  }

  onOrgansiationSelect(row){
    console.log(row);
  }
  AssignEmailToUser(){
    try{
let x = this.userDetailList;
let user = {
  "UserEmail":this.assignedEmail,
  "UserId":this.selectedUserforEmail.Id,
  "OrganiationId":this.selectedOrganisation.Id,
  "CreatedBy":this.api.StorageData.get("UserId"),
  "IsDefault":this.isDefaultEmail
}

  this.AdminApi.InsertUserDetails(user)
      .subscribe((res:any)=>{
        this.closeModal();
        this.openSnackBar(res.Data.Message, "alert-message");
        this.resetEmailForm();
        //this.getUserDetailsList(res.Data.Data.UserId,1);
      },(err)=>{

      })

console.log(user);
    }
    catch(ex){

    }
  }

  resetEmailForm(){
    this.selectedOrganisation = [];
    this.assignedEmail="";
    this.isDefaultEmail = false;
  }
}



class UserData {
  Id: string;
  UserName: string;
  UserObjectGuid: string;
  Email: string;
  Roles: Array<string>;
  CreatedBy: string|Object;
  UpdatedBy:string|Object;
}

function minSelectedCheckboxes(min = 1) {

  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
