import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AvailabitityService } from '../availabitity.service';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private _Api:AvailabitityService) {}

    canActivate() {
        return this._Api.LoginUser().pipe(
            map(data=> {
            if(data.IsAuthenticated){
                return true;
            }
            else{
                this.router.navigate(['/unauthorised']);
                return false;
            }
            })
        )
    }
}
