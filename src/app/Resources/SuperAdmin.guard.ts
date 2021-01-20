import { AvailabitityService } from 'src/app/availabitity.service';
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(private router: Router,private Api:AvailabitityService) {}
  canActivate() {
    return true;
  }  
}