import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApprovalDto } from '../../../interfaces/ApprovalDto';
import { CommentDto } from '../../../interfaces/CommentDto';
import { RequestDto } from '../../../interfaces/RequestDto';
import { ProcurementCreateDto } from '../../../interfaces/ProcurementCreateDto';
import { ProcurementChangeStatusDto } from '../../../interfaces/ProcurementChangeStatusDto';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(
    private http: HttpClient
  ) { }
// Procurement -----------------------------------------------------------
getAllProcurement():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement");
}
getAuditLog():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement/auditLog");
}

getProcurementById(id:number):Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement/"+id);
}

//get procurement attachment
getProcurementAttachments(id:number):Observable<any>{
  return this.http.get(environment.API_URL+ environment.URL_SUPPLIESUSER+"procurement-attachments/"+id);
}

//download attachment
downloadAttachment(fileId:number):Observable<Blob>{
  return this.http.get(environment.API_URL+ environment.URL_SUPPLIESUSER+"procurement-download/"+ fileId ,{
    responseType: 'blob'
  });
}

createProcurement(procurementCreateDto: ProcurementCreateDto):Observable<any>{
  return this.http.post(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement", procurementCreateDto);
}

updateProcurement(id:number, procurementCreateDto: ProcurementCreateDto):Observable<any>{
   return this.http.put(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement/"+id, procurementCreateDto);
}

//upload attachment
uploadProcurementAttachment(id:number, file: FormData):Observable<any>{
  return this.http.post(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-upload/" + id, file);
}

//delete attachment
deleteProcurementAttachment(fileId: number):Observable<any>{
  return this.http.delete(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-attachment/"+ fileId );
}

deleteProcurement(id:number):Observable<any>{
   return this.http.delete(environment.API_URL +  environment.URL_SUPPLIESUSER + "procurement/"+id);
}

getProcurementStatus():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-status");
}
getVendors():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-vendors");
}
getSources():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-sources");
}
getStages():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-stages");
}

getProcurementUsers():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-users");
}

updateStatus(id:number, changeStatusDto: ProcurementChangeStatusDto):Observable<any>{
   return this.http.put(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement/status/"+id, changeStatusDto);
}

getStatusUpdates(id:number):Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER +"procurement/status/"+id);
}

getRequestsForUpdateProcurement():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement/requests");
}



// Requests -----------------------------------------------------------


  //get subdivs of an admin div
  getSubdivsByAdmindivId(id: number): Observable<any>{
    return this.http.get(environment.API_URL+ environment.URL_SUPPLIESUSER + "subdivs/admindiv/"+id);
  }

  //get all subdivs
   //get subdivs list
    getSubdivs():Observable<any>{
      return this.http.get(environment.API_URL+environment.URL_SUPPLIESUSER+"subdivs");
    }


  //get all admindivs
      //get admindivs list
      getAdmindivs():Observable<any>{
        return this.http.get(environment.API_URL+environment.URL_SUPPLIESUSER+"admindivs");
      }

//get subdivs grouped by admin divs
getGroupedSubdivList():Observable<any>{
      return this.http.get(environment.API_URL+environment.URL_SUPPLIESUSER+"grouped-subdivs");
    }



//for all requests table
  getAllRequests():Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER +"requests");
  }

 //for all requests table
  getPendingRequests():Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER +"requests/review");
  }

//to view a single request
  getRequestById(id: number):Observable<any>{
    return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "requests/"+id);
  }

  //get request attachment
getRequestAttachment(id:number):Observable<any>{
  return this.http.get(environment.API_URL+ environment.URL_SUPPLIESUSER+"request-attachment/"+id);
}

  //get approval attachment
getApprovalAttachment(id:number):Observable<any>{
  return this.http.get(environment.API_URL+ environment.URL_SUPPLIESUSER+"approval-attachment/"+id);
}

 getCommentsByRequestId(id:number):Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER+"requests/comments/"+id);
}

getApprovalsByRequestId(id:number):Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER+"requests/approvals/"+id);
}

//delete request
deleteRequestById(id: number):Observable<any>{
  return this.http.delete(environment.API_URL +  environment.URL_SUPPLIESUSER + "requests/"+id);
}

// to create approval & reject comments for a request
approveRequestCreateApproval(id: number, approvalDto: ApprovalDto):Observable<any>{
  return this.http.post(environment.API_URL +  environment.URL_SUPPLIESUSER+ "requests/approve/"+id, approvalDto);
}

rejectRequestCreateComment(id:number, commentDto: CommentDto):Observable<any>{
    return this.http.post(environment.API_URL +  environment.URL_SUPPLIESUSER + "requests/reject/"+id, commentDto);
}

// to create a request
getSubdivList():Observable<any>{
  return this.http.get(environment.API_URL +environment.URL_SUPPLIESUSER + "subdivs");
}

createRequest(requestDto: FormData):Observable<any>{
  return this.http.post(environment.API_URL + environment.URL_SUPPLIESUSER + "requests", requestDto);
}
// createRequest(requestDto: RequestDto):Observable<any>{
//   return this.http.post(environment.API_URL + environment.URL_SUPPLIESUSER + "requests", requestDto);
// }


updateRequest(id: number, requestDto: RequestDto):Observable<any>{
   return this.http.put(environment.API_URL + environment.URL_SUPPLIESUSER + "requests/"+id, requestDto);
}

//upload attachment
uploadRequestAttachment(id:number, file: FormData):Observable<any>{
  return this.http.post(environment.API_URL + environment.URL_SUPPLIESUSER + "request-upload/" + id, file);
}

//delete attachment
deleteRequestAttachment(fileId: number):Observable<any>{
  return this.http.delete(environment.API_URL + environment.URL_SUPPLIESUSER + "request-attachment/"+ fileId );
}

//get approved for procurement list
getApprovedRequests():Observable<any>{
  return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER +"requests/approved");
}



}


