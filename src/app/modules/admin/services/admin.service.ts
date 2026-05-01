import { HttpClient, HttpParams } from '@angular/common/http';
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
   createUser(formData: FormData):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"users", formData);
  }
  // createUser(userDto:any):Observable<any>{
  //   return this.http.post(environment.API_URL+ URL_ADMIN+"users", userDto);
  // }

  updateUser( id: number, formData:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN +"users/"+id, formData);
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


  //vendors ----------------------------------------------------------------------------

  //get vendors list
  getVendors():Observable<any>{
    return this.http.get(environment.API_URL+URL_ADMIN+"vendors");
  }

  //get vendor by id
  getVendorById(id: number):Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN+ "vendors/"+id);
  }

  //post vendor
  createVendor(vendorDto:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"vendors", vendorDto);
  }

  //update vendor
  updateVendor(id: number, vendorDto:any):Observable<any>{
    return this.http.put(environment.API_URL+ URL_ADMIN +"vendors/"+id, vendorDto);
  }

  //delete vendor
  deleteVendor(id: number):Observable<any>{
    return this.http.delete(environment.API_URL+ URL_ADMIN+"vendors/"+id);
  }


  //sources ----------------------------------------------------------------------------

  //get sources list
  getSources():Observable<any>{
    return this.http.get(environment.API_URL+URL_ADMIN+"sources");
  }

  //get source by id
  getSourceById(id: number):Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN+ "sources/"+id);
  }

  //post source
  createSource(sourceDto:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"sources", sourceDto);
  }

  //update source
  updateSource(id: number, sourceDto:any):Observable<any>{
    return this.http.put(environment.API_URL+ URL_ADMIN +"sources/"+id, sourceDto);
  }

  //delete source
  deleteSource(id: number):Observable<any>{
    return this.http.delete(environment.API_URL+ URL_ADMIN+"sources/"+id);
  }



  //sources ----------------------------------------------------------------------------

  //get status list
  getStatus():Observable<any>{
    return this.http.get(environment.API_URL+URL_ADMIN+"status");
  }

  //get status by id
  getStatusById(id: number):Observable<any>{
    return this.http.get(environment.API_URL+ URL_ADMIN+ "status/"+id);
  }

  //post status
  createStatus(statusDto:any):Observable<any>{
    return this.http.post(environment.API_URL+ URL_ADMIN+"status", statusDto);
  }

  //update status
  updateStatus(id: number, statusDto:any):Observable<any>{
    return this.http.put(environment.API_URL+ URL_ADMIN +"status/"+id, statusDto);
  }

  //delete status
  deleteStatus(id: number):Observable<any>{
    return this.http.delete(environment.API_URL+ URL_ADMIN+"status/"+id);
  }





}
