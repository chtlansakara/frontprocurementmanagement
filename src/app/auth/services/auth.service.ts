import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //injecting Http Client service
  constructor(private http: HttpClient) { }

//sign up requests
  signup(signupRequest: any):Observable<any>{
    return this.http.post(environment.API_URL+"api/auth/signup", signupRequest);
  }

//login requests
  login(loginRequest: any):Observable<any>{
    return this.http.post(environment.API_URL+"api/auth/login", loginRequest);
  }


//checking if logged in
isLoggedIn(): boolean{
  return !!StorageService.getToken();
}

}
