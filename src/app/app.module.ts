import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
//Angular Material modules
import { AngularmaterialModule } from './angularmaterial/angularmaterial.module';
import { SuppliesComponent } from './common/supplies/supplies.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';
import { DeleteBoxComponent } from './common/delete-box/delete-box.component';
import { SignoutBoxComponent } from './common/signout-box/signout-box.component';
import { HelpBoxComponent } from './auth/components/login/help-box/help-box.component';
import { NotificationBellComponent } from './auth/components/notification-bell/notification-bell.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SuppliesComponent,
    NavbarComponent,
    DeleteBoxComponent,
    SignoutBoxComponent,
    HelpBoxComponent,
    NotificationBellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor,httpErrorInterceptor, spinnerInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
