import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AvailabitityService } from './availabitity.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BFSAvailabilityUI';
  userDetails;
  ApiUrl = environment.Url;
   constructor(private Api: AvailabitityService,private router:Router){
   }
   ngOnInit(){
  // this.Api.LoginUser().subscribe((res)=>{
  //   this.userDetails= res;
  //   if(this.userDetails.Errors!=undefined && this.userDetails.Errors.length>0){
  //     this.Api.RouteToUnauthorised();
  //     return;
  //   }
  //   this.Api.setLoggedinUser(this.userDetails.ADData.DisplayName);
  //   //localStorage.setItem("UserId",this.userDetails.User.Id);
  //   this.Api.StorageData.set("UserId",this.userDetails.User.Id);
  //   console.log(" Set User Id" + this.Api.StorageData.get("UserId"));
  //   //localStorage.setItem("Role",this.userDetails.User.Roles.join("|"));        
  //   this.Api.StorageData.set("Role",this.userDetails.User.Roles.join("|"));   
  
  }
}
