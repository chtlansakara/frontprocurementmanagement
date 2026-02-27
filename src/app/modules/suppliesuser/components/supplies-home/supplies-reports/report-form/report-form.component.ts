import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../../../../../utils/util.service';
import { ReportServiceService } from '../../../../services/report-service.service';

@Component({
  selector: 'app-report-form',
  standalone: false,
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.scss'
})
export class ReportFormComponent {

  //form-group
  createReportForm !: FormGroup;
  //spinner-submit button while loading
  isLoading  = false;


  constructor(

    private fb: FormBuilder,
    private suppliesService: SuppliesService,
    private snackbar: MatSnackBar,
    private router: Router,
    private reportService : ReportServiceService

  ){

  }

  ngOnInit(){
    this.createReportForm = this.fb.group({
      startDate: [null, [Validators.required]],
      endDate : [null, [Validators.required]],
      format: [null, [Validators.required]]
    });

  }


   private triggerDownload(blob: Blob, format: string):void{
    const extension = (format === 'excel')? 'xlsx' : 'pdf';
    const filename = `summary_report.${extension}`;

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
    console.log(this.createReportForm.value);

     const { startDate, endDate, format } = this.createReportForm.value;

     const formattedStart = this.formatDate(startDate);
     const formattedEnd = this.formatDate(endDate);

     this.isLoading= true;

    this.reportService.downloadSummaryReport(formattedStart, formattedEnd, format).subscribe((blob: Blob)=>{
          this.triggerDownload(blob, format);
          //show success message
          this.snackbar.open("Report downloded successfully.","Close",{duration:5000, panelClass:"snackbar-success"});

          this.isLoading= false;
          this.createReportForm.reset();
    });
  }




}





