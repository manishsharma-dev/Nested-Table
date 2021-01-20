import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<AlertComponent>, @Inject (MAT_SNACK_BAR_DATA) public data:any) { }
  ngOnInit() {
  }

 

}
