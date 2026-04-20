import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //get user details
  getUserDetails():Observable<any>{
    return this.http.get(environment.API_URL+ environment.URL_USER+ "/details");
  }

  //change user password
  updatePassword(changePasswordDto:any):Observable<any>{
    return this.http.put(environment.API_URL + environment.URL_USER +"/password", changePasswordDto);
  }

    //get designations list
    getDesignations():Observable<any>{
      return this.http.get(environment.API_URL+ environment.URL_USER+"/designations");
    }

  //change user details
  updateUser(userDto:any):Observable<any>{
    return this.http.put(environment.API_URL + environment.URL_USER +"/details", userDto);
  }

  //send suppport request

}
