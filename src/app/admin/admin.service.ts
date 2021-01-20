import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { Observable, from, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
 ApiUrl = environment.Url;
 userHistoryData = new BehaviorSubject<any>([]);
 userHistoryTableData = this.userHistoryData.asObservable();

  constructor(private http:HttpClient,private router: Router) { }


  getAllUserHistory(){
    try{
      return this.http.get(this.ApiUrl+"api/dashboard")
      .pipe(
        map((res) => res))
    }
    catch(ex){
  
    }
  }


  getADUserList(){
    try{
      return this.http.get(this.ApiUrl+"api/UserManagement/user")
      .pipe(
        map((res) => res))
    }
    catch(ex){

    }
  }

 
//User Section Start

  addUser(obj){
   try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.post(this.ApiUrl+"api/UserManagement/user",obj,{headers})
      .pipe(
        map((res)=>res)
      )
      }
    catch(ex){

    }
  }

  updateUser(obj){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.post(this.ApiUrl+"api/UserManagement/update",obj,{headers})
      .pipe(
        map((res)=>res)
      )
    }
    catch(ex){

    }
  }

  syncAllUsers(obj){
    try{
      let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this.http.post(this.ApiUrl+"api/UserManagement/sync",obj,{headers})
        .pipe(
          map((res)=>res)
        )
      }
    catch(ex){

    }
  }

  RefreshUserDataTable(newData){
    try{
      this.userHistoryData.next(newData);
    }
    catch(ex){
  
    }
  }  

  getAllActiveusers(){
    try{
      return this.http.get(this.ApiUrl+"api/UserManagement/userlist")
      .pipe(
        map((res) => res))
    }
    catch(ex){

    }
  }  

  deleteUser(obj){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.post(this.ApiUrl+"api/UserManagement/delete",obj,{headers})
      .pipe(
        map((res)=>res)
      )
    }
    catch(ex){

    }
  }

  getRoles(){
    try{
      return this.http.get(this.ApiUrl+"api/Role")
      .pipe(
        map((res) => res))
    }
    catch(ex){

    }
  }
//User work Shift Start
  getUserShift(UserId){
    try{
      return this.http.get(this.ApiUrl+"api/UserWorkShift/UserShift/"+UserId)
      .pipe(
        map((res) => res))
    }
    catch(ex){

    }
  }

  addUserShift(obj){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.ApiUrl+"api/WorkShift/shift",obj,{headers})
    .pipe(
      map((res)=>res)
    )
  }

  //User work shift End

//User Section End

//Vpn Section Start

   getRangeData(){
    try{
      return this.http.get(this.ApiUrl+"api/VpnIpAdressRange/range")
      .pipe(
        map((res) => res))
    }
    catch(ex){

    }
  }

  InsertRangeData(obj){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.post(this.ApiUrl+"api/VpnIpAdressRange/range",obj,{headers})
      .pipe(
        map((res)=>res)
      )
    }
    catch(ex){

    }
  }

  deleteRange(obj){
    try{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return this.http.post(this.ApiUrl+"api/VpnIpAdressRange/delete",obj,{headers})
        .pipe(
          map((res)=>res)
        )
    }
    catch(ex){

    }
  }

  updateRange(obj){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.post(this.ApiUrl+"api/VpnIpAdressRange/update",obj,{headers})
      .pipe(
        map((res)=>res)
      )
    }
    catch(ex){

    }
  }

//Vpn Section End

//work shift Start
 getWorkShift(){
  try{
    return this.http.get(this.ApiUrl+"api/WorkShift/shift")
    .pipe(
      map((res) => res))
  }
   catch(ex){

   }
 }

 InsertWorkShift(obj){
  try{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.ApiUrl+"api/WorkShift/shift",obj,{headers})
    .pipe(
      map((res)=>res)
    )
  }
   catch(ex){

   }
 }

 updateWorkShift(obj){
  try{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.ApiUrl+"api/WorkShift/update",obj,{headers})
    .pipe(
      map((res)=>res)
    )
  }
  catch(ex){

  }
}

//work shift End

//User work shift

updateUserWorkShift(obj){
  try{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.ApiUrl+"api/UserWorkShift/UserShift",obj,{headers})
    .pipe(
      map((res)=>res)
    )
  }
  catch(ex){

  }
}

//User work shift


//helper methods
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
  //helper methods
  getAllOrganisationNames(){
    return this.http.get(this.ApiUrl+'api/organisation/getall',{headers:new HttpHeaders({
      'content-type':'application/json'
      })
    }).pipe(map(res=>res))
  }

  getUserDetailList(body){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.post(this.ApiUrl+"api/userdetails/GetUserDetail",body,{headers})
      .pipe(
        map((res)=>res)
      )
      }
    catch(ex){

    }
  }

InsertUserDetails(body){
  try{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.ApiUrl+"api/userdetails/InsertUserDetail",body,{headers})
    .pipe(
      map((res)=>res)
    )
  }
  catch(ex){

  }
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
