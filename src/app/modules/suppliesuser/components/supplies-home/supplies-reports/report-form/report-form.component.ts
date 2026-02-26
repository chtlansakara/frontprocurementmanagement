import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../../../../../utils/util.service';

@Component({
  selector: 'app-report-form',
  standalone: false,
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.scss'
})
export class ReportFormComponent {

  //form-group
  createReportForm !: FormGroup;


  constructor(

    private fb: FormBuilder,
    private suppliesService: SuppliesService,
    private snackbar: MatSnackBar,
    private router: Router,

  ){

  }

  ngOnInit(){
    this.createReportForm = this.fb.group({
      startingDate: [null, [Validators.required]],
      endingDate : [null, [Validators.required]],
    });

  }

  submitReportForm(){
    console.log(this.createReportForm.value);
    // this.suppliesService.updateStatus(this.id, this.createReportForm.value).subscribe(res=>{
    //   if( res.id != null){
    //       //show success message
    //       this.snackbar.open("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
    //       //navigate by router & refresh at the same time
    //         // this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+ this.id);
    //         this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=> {
    //           this.router.navigate(['/suppliesuser/home/procurement/view/'+ this.id])
    //         });
    //     }
    // })
  }
}
