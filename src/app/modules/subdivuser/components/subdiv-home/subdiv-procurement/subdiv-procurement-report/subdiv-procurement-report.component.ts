import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReportServiceService } from '../../../../../suppliesuser/services/report-service.service';
import { SubdivService } from '../../../../services/subdiv.service';

@Component({
  selector: 'app-subdiv-procurement-report',
  standalone: false,
  templateUrl: './subdiv-procurement-report.component.html',
  styleUrl: './subdiv-procurement-report.component.scss'
})
export class SubdivProcurementReportComponent {

    //form-group
  createReportForm !: FormGroup;
  //spinner-submit button while loading
  isLoading  = false;


  constructor(

    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private subdivService: SubdivService
  ){
  }

  ngOnInit(){
    this.createReportForm = this.fb.group({
      startDate: [null, [Validators.required]],
      endDate : [null, [Validators.required]],
      format: [null, [Validators.required]]
    });
  }


  private triggerDownloadProcurementReport(blob: Blob, format: string):void{
    const extension = (format === 'excel')? 'xlsx' : 'pdf';
    const filename = `procurement_report.${extension}`;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href= url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  submitReportForm(){

     const { startDate, endDate, format } = this.createReportForm.value;
     const formattedStart = this.formatDate(startDate);
     const formattedEnd = this.formatDate(endDate);
     this.isLoading= true;

    this.subdivService.downloadSubdivProcurementReport(formattedStart, formattedEnd, format).subscribe((blob: Blob)=>{
      this.triggerDownloadProcurementReport(blob, format);
      //show success message
      this.snackbar.open("Report downloded successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
      this.isLoading= false;
      this.createReportForm.reset();
    });
  }






}
