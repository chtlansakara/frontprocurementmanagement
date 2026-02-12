import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

//URL for admin
const URL_ADMIN = "api/admin/";

//URL for designation
const URL_DESIGNATIONS = "designations/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //injecting dependencies
  constructor(private http: HttpClient) {}

//users ----------------------------------------------------------------------------

  //get users list
  getUsers():Observable<any>{
    return this.http.get(environment.API_URL+URL_ADMIN+"users");
  }

  //get user by id
  getUserById(id: number):Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN+ "users/"+id);
  }

  //post user
  createUser(userDto:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"users", userDto);
  }

  //update user
  updateUser(id: number, userDto:any):Observable<any>{
    return this.http.put(environment.API_URL+ URL_ADMIN +"users/"+id, userDto);
  }

  //delete user
  deleteUser(id: number):Observable<any>{
    return this.http.delete(environment.API_URL+ URL_ADMIN+"users/"+id);
  }

//designations ----------------------------------------------------------------------------

  //get designations list
  getDesignations():Observable<any>{
    return this.http.get(environment.API_URL+URL_ADMIN+"designations");
  }

  //get designation by id
  getDesignationById(id: number):Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN+ "designations/"+id);
  }

  //post designation
  createDesignation(designationDto:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"designations", designationDto);
  }

  //update designation
  updateDesignation(id: number, designationDto:any):Observable<any>{
    return this.http.put(environment.API_URL+ URL_ADMIN +"designations/"+id, designationDto);
  }

  //delete designation
  deleteDesignation(id: number):Observable<any>{
    return this.http.delete(environment.API_URL+ URL_ADMIN+"designations/"+id);
  }

//admin divs ----------------------------------------------------------------------------

  //get admindivs list
  getAdmindivs():Observable<any>{
    return this.http.get(environment.API_URL+URL_ADMIN+"admindivs");
  }

  //get admindiv by id
  getAdmindivById(id: number):Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN+ "admindivs/"+id);
  }

  //post admindiv
  createAdmindiv(admindivDto:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"admindivs", admindivDto);
  }

  //update admindiv
  updateAdmindiv(id: number, admindivDto:any):Observable<any>{
    return this.http.put(environment.API_URL+ URL_ADMIN +"admindivs/"+id, admindivDto);
  }

  //delete admindivs
  deleteAdmindiv(id: number):Observable<any>{
    return this.http.delete(environment.API_URL+ URL_ADMIN+"admindivs/"+id);
  }

//sub divs ----------------------------------------------------------------------------

  //get subdivs list
  getSubdivs():Observable<any>{
    return this.http.get(environment.API_URL+URL_ADMIN+"subdivs");
  }

  //get subdiv by id
  getSubdivById(id: number):Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN+ "subdivs/"+id);
  }

  //get subdivs by admin div
  getSubdivsByAdmindivId(id: number): Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN + "subdivs/admindiv/"+id);
  }

  //post subdiv
  createSubdiv(subdivDto:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"subdivs", subdivDto);
  }

  //update subdiv
  updateSubdiv(id: number, subdivDto:any):Observable<any>{
    return this.http.put(environment.API_URL+ URL_ADMIN +"subdivs/"+id, subdivDto);
  }

  //delete subdivs
  deleteSubdiv(id: number):Observable<any>{
    return this.http.delete(environment.API_URL+ URL_ADMIN+"subdivs/"+id);
  }


}
