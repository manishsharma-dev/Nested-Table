import { Router } from '@angular/router';
import { AvailabitityService } from './../../availabitity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private Api:AvailabitityService, private router: Router) { }
  loggedUser:string="";
  isAdmin:boolean= false;
  
  ngOnInit() {
    this.Api.LoggedInUser.subscribe(User =>{
      this.loggedUser = User;
    })
    //var roleStr = localStorage.getItem('Role');
    var roleStr = this.Api.StorageData.get('Role');
    var roleArr = (roleStr + "").split("|");
    this.isAdmin = (roleArr.includes("0") || roleArr.includes("1")) ? true : false;      
  }

  goToAdmin(){
    this.router.navigate(['../../admin']);
  }

}
