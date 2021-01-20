import { AvailabitityService } from 'src/app/availabitity.service';
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,private Api:AvailabitityService,
    private SpinnerService: NgxSpinnerService) {}
  canActivate() {
    this.SpinnerService.show()

    return this.Api
    .LoginUser().pipe(
      map(data=> {
        this.SpinnerService.hide()
      if(data.IsAuthenticated){
        var roleStr = this.Api.StorageData.get('Role');
        var roleArr = (roleStr + "").split("|"); 
        if(roleArr.includes("0") || roleArr.includes("1")){
              return true;
            }
            else{
              this.router.navigate(['/']);
              return false;
            }  
      }
      else{
          this.router.navigate(['/']);
          return false;
      }
      })
  )
   
  //   //var roleStr =   localStorage.getItem('Role');
  //   var roleStr = this.Api.StorageData.get('Role');
  //   var roleArr = (roleStr + "").split("|"); 
  //   if(roleArr.includes("0") || roleArr.includes("1")){
  //     return true;
  //   }   
  // this.router.navigate(['/']);
  // return false;
  }
  
}
