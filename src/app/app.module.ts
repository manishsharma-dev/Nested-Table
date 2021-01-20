import { AuthGuard } from './Resources/auth.guard';
import { AvailabitityService, CustomInterceptor } from './availabitity.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './layout/dashboard/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,FormsModule,
     ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor ,
    multi: true
    },
    AvailabitityService,
    AuthGuard
  ]
})
export class AppModule { }
