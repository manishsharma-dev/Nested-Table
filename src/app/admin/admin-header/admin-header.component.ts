import { AvailabitityService } from './../../availabitity.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private api:AvailabitityService,private router: Router) { }
  userDetails:any = [];
  loggedUser:string = "";
  IfSuperAdmin:boolean = true;
  ngOnInit() {
    //this.AuthenticateAdmin();
    this.api.LoggedInUser.subscribe(User => {
      this.loggedUser = User;
    })
  }

}
