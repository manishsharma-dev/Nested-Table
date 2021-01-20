import { AvailabitityService } from './../../../availabitity.service';
import { Component, OnInit} from '@angular/core';
import { AdminService } from '../../admin.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {

 
  constructor(private adminApi:AdminService
  , private SpinnerService: NgxSpinnerService) { }
  
  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.SpinnerService.show();
    this.getAllUserHistory()
  }
  
  getAllUserHistory(){
    try{
        this.adminApi.getAllUserHistory()
                      .subscribe((res: ResponseType)=>{
                        if(res.Errors.length>0){
                          this.adminApi.RouteToUnauthorised();
                          return;
                        }
                          let UserHistory = res.Data;
                          this.adminApi.RefreshUserDataTable(UserHistory);
                          this.SpinnerService.hide();
                      },(err)=>{
                          this.SpinnerService.hide();
                      })
    }
    catch(ex){

    }
  }
}

export interface ResponseType {
  Data: any;
  Errors: any;
  Success: boolean;
}