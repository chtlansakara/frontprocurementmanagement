import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RequestDto } from '../../../interfaces/RequestDto';
import { CommentDto } from '../../../interfaces/CommentDto';
import { ApprovalDto } from '../../../interfaces/ApprovalDto';

 URL_ADMINDIVUSER: "api/admindiv/";

@Injectable({
  providedIn: 'root'
})
export class AdmindivService {

  constructor(
    private http: HttpClient
  ) { }

  //procurement related


    downloadAdmindivProcurementReport(
      startDate: string,
      endDate:string,
      format: string): Observable<Blob>{
      const params = new HttpParams()
                        .set('startDate', startDate)
                        .set('endDate', endDate)
                        .set('format',format);

      return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "procurement-report/",{
        params,
        responseType: 'blob'
    });
  }

  getProcurement(): Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "procurement");
  }

  getProcurementById(id: number): Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "procurement/"+id);
  }

  getStatusUpdates(id: number): Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "procurement-status/"+id);
  }

  getProcurementStatus():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "procurement-status");
  }

  getRequestsForProcurement():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "procurement-requests");
  }

  getStages():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "procurement-stages");
  }

  // requests related

getRequestsToApprove(): Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER+ "requests/review");
}

getAllRequests():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER+ "requests");
}
getApprovedRequests():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER+ "requests/approved");
}
getRejectedRequests():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER+ "requests/rejected");
}

getSubdivList():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "subdivs");
}

createRequest(requestDto: FormData):Observable<any>{
  return this.http.post(environment.API_URL + environment.URL_ADMINDIVUSER + "requests", requestDto);
}
// createRequest(requestDto: RequestDto):Observable<any>{
//   return this.http.post(environment.API_URL + environment.URL_ADMINDIVUSER + "requests", requestDto);
// }

getRequestById(id: number): Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER+ "requests/"+id);
}

deleteRequestById(id: number):Observable<any>{
  return this.http.delete(environment.API_URL + environment.URL_ADMINDIVUSER + "requests/"+id);
}

getCommentsByRequestId(id:number):Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER+"requests/comments/"+id);
}

getApprovalsByRequestId(id:number):Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER+"requests/approvals/"+id);
}

approveRequestCreateApproval(id: number, approvalDto: FormData):Observable<any>{
  return this.http.post(environment.API_URL +  environment.URL_ADMINDIVUSER+ "requests/approve/"+id, approvalDto);
}
// approveRequestCreateApproval(id: number, approvalDto: ApprovalDto):Observable<any>{
//   return this.http.post(environment.API_URL + environment.URL_ADMINDIVUSER + "requests/approve/"+id, approvalDto);
// }

rejectRequestCreateComment(id:number, commentDto: CommentDto):Observable<any>{
    return this.http.post(environment.API_URL + environment.URL_ADMINDIVUSER + "requests/reject/"+id, commentDto);
}


updateRequest(id:number, requestDto: RequestDto):Observable<any>{
  return this.http.put(environment.API_URL + environment.URL_ADMINDIVUSER + "requests/"+id, requestDto);
}

//print request
 downloadPrintRequest(requestId: number): Observable<Blob>{
    return this.http.get(environment.API_URL + environment.URL_ADMINDIVUSER + "print-request/"+requestId, {
      responseType: 'blob'
    });
  }

//get request attachment
getRequestAttachment(id:number):Observable<any>{
  return this.http.get(environment.API_URL+ environment.URL_ADMINDIVUSER+"request-attachment/"+id);
}


//get approval attachment
getApprovalAttachment(id:number):Observable<any>{
  return this.http.get(environment.API_URL+ environment.URL_ADMINDIVUSER+"approval-attachment/"+id);
}

//download request or approval attachment
downloadAttachment(fileId:number):Observable<Blob>{
  return this.http.get(environment.API_URL+ environment.URL_ADMINDIVUSER+"procurement-download/"+ fileId ,{
    responseType: 'blob'
  });
}

//upload attachment
uploadRequestAttachment(id:number, file: FormData):Observable<any>{
  return this.http.post(environment.API_URL + environment.URL_ADMINDIVUSER + "request-upload/" + id, file);
}

//delete attachment
deleteRequestAttachment(fileId: number):Observable<any>{
  return this.http.delete(environment.API_URL + environment.URL_ADMINDIVUSER + "request-attachment/"+ fileId );
}
}
