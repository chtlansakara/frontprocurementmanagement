import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }

  downloadSummaryReport(
    startDate: string,
    endDate:string,
    format: string
  ): Observable<Blob>{
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate)
    .set('format',format);

    return this.http.get(environment.API_URL + environment.URL_SUPPLIESUSER + "procurement-report/",{
      params,
      responseType: 'blob'
    });
  }
}
