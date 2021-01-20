
import { Injectable, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from "../environments/environment";
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as  SecureLS  from 'secure-ls';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AvailabitityService {  
 StorageData = new SecureLS({encodingType: 'aes'});
 ApiUrl = environment.Url;
 userDetails;
 LogUser = new  BehaviorSubject<string>("");
 LoggedInUser = this.LogUser.asObservable();

 HistoryData = new BehaviorSubject<any>([]);
 HistoryTableData = this.HistoryData.asObservable();

constructor(private http:HttpClient, private router: Router) {            
}

 LoginUser(){
  try{
     return this.http.get(this.ApiUrl+"api/Account/Authenticate")
                     .pipe(
                       map((res:any)=>{
                         let userDetails = res;
                         let isAuthenticated:boolean;
                         this.setLoggedinUser(userDetails.ADData.DisplayName);
                         this.StorageData.set("UserId",userDetails.User.Id);
                         this.StorageData.set("Role",userDetails.User.Roles.join("|"));
                         return userDetails;
                        })
                     )
     } 
  catch(ex){
  } 
}

SignInUser(userData): Observable<any>{
  try{

    return this.http.post(this.ApiUrl+"api/SignInHistory",userData,{
      headers:new HttpHeaders({
        'Content-Type':  'application/json'
      })
    })
    .pipe(
      map((res) => res))
  }
  catch(ex){

  }
}

SignOutUser(userData) : Observable<any>{
  try{
    return this.http.post(this.ApiUrl+"api/SignInHistory/Update",userData,{
      headers:new HttpHeaders({
        'Content-Type':  'application/json'
      })
    })
    .pipe(
      map((res) => res))
  }
  catch(ex){

  }
}

getUserHistory(userId: string|Object){
  try{
    return this.http.get(this.ApiUrl+"api/SignInHistory/" + userId)
    .pipe(
      map((res) => res))
  }
  catch(ex){

  }
}

getWeeklySigninHistory(userData: string|Object){
  try{
    return this.http.post(this.ApiUrl+"api/SignInHistory/WeeklySigninHistory",JSON.stringify(userData),{
      headers:new HttpHeaders({
        'Content-Type':  'application/json'
      })
    })
    .pipe(
      map((res) => res))
  }
  catch(ex){

  }
}

getWeeklyReporteeHistory(userData){
  try{
  return this.http.post(this.ApiUrl+"api/SignInHistory/reportingmanager/GetReportingManagerWeeklySignInHistory",
                        JSON.stringify(userData),{
    headers:new HttpHeaders({
      'Content-Type':  'application/json'
    })
  })
  .pipe(
    map((res) => res))
}
catch(ex){

}}

setLoggedinUser(userName){
    try{
      this.LogUser.next(userName);
    }
    catch(ex){

    }
}

RefreshDataTable(newData){
  try{
    this.HistoryData.next(newData);
  }
  catch(ex){

  }
}

secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? (h < 10 ?  "0" : "") + h + ":"  : "00:";
  var mDisplay = m > 0 ? (m < 10 ? "0" : "")+ m + ":" : "00:";
  var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
  return hDisplay + mDisplay + sDisplay; 
}

HmsToSeconds(Hms){
var timeInSeconds = Hms.split(':');
return (+timeInSeconds[0]) * 60 * 60 + (+timeInSeconds[1]) * 60 + (+timeInSeconds[2]); 
}

RouteToUnauthorised(){
  try{
   this.router.navigate(['../../unauthorised']);
  }
  catch(ex){

  }
}

getSheet(){
  try
  {
    return this.http.get(this.ApiUrl+"api/sheet",{headers:new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }).pipe(map((res) => res))
}
  catch(ex){
    return ex;
  }
}

getWorkItems(){
  return this.http.get(this.ApiUrl+"api/WorkItem/GetAllWorkItems",{headers:new HttpHeaders({
    'content-type' : 'application/json'
  })
}).pipe(map((res)=>res))
}

getTimelog(){
  return this.http.get(this.ApiUrl+"api/TimeLog/getalltimelogs",{headers:new HttpHeaders({
    'content-type' : 'application/json'
  })
}).pipe(map((res)=>res))
}

getUserWorkItems(element)
{
  return this.http.post(this.ApiUrl+"api/WorkItem/GetUserWorkItemList",element,{
    headers:new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }).pipe(map((res)=>res));
}

getReporteeData(userId){
  return this.http.get(this.ApiUrl+"api/SignInHistory/reportingmanager/"+userId,
  {headers:new HttpHeaders({
    'content-type' : 'application/json'
  })
}).pipe(map((res)=>res));
}
}
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const copiedReq = request.clone({
        withCredentials: true
    });
    return next.handle(copiedReq );
}
}