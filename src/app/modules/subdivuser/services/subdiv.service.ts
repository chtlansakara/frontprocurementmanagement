import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RequestDto } from '../../../interfaces/RequestDto';

//URL for subdiv user
const URL_SUBDIVUSER = "api/subdiv/";
@Injectable({
  providedIn: 'root'
})
export class SubdivService {

  //injecting dependencies
  constructor(private http: HttpClient) { }


  //procurement related

  getProcurement(): Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_SUBDIVUSER + "procurement");
  }

  getProcurementById(id: number): Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_SUBDIVUSER + "procurement/"+id);
  }

  // requests related

  getRequestsOfSubdiv(): Observable<any>{
    return this.http.get(environment.API_URL+ environment.URL_SUBDIVUSER+"requests");
  }

  createRequestForSubdiv(requestdto : RequestDto):Observable<any>{
    return this.http.post(environment.API_URL+ environment.URL_SUBDIVUSER + "requests", requestdto);
  }

  getRequestById(id: number):Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_SUBDIVUSER +"requests/"+id);
  }

  //get subdiv information from backend
  getSubdiv():Observable<any>{
    return this.http.get(environment.API_URL+URL_SUBDIVUSER+"subdiv-info");
  }

  //get comments for a request
  getCommentsByRequestId(id:number):Observable<any>{
    return this.http.get(environment.API_URL+URL_SUBDIVUSER+"requests/comments/"+ id);
  }

  //get approvals for a request
  getApprovalsByRequestId(id:number):Observable<any>{
    return this.http.get(environment.API_URL+URL_SUBDIVUSER+"requests/approvals/"+ id);
  }

  //delete request
  deleteRequest(id:number):Observable<any>{
    return this.http.delete(environment.API_URL+environment.URL_SUBDIVUSER+"requests/"+id);
  }

  //update request
  updateRequest(id:number, requestdto: RequestDto):Observable<any>{
    return this.http.put(environment.API_URL + environment.URL_SUBDIVUSER+"requests/"+id, requestdto);
  }
}
