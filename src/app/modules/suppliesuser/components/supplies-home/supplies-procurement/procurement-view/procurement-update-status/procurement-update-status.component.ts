import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliesService } from '../../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../../../../../utils/util.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-procurement-update-status',
  standalone: false,
  templateUrl: './procurement-update-status.component.html',
  styleUrl: './procurement-update-status.component.scss'
})
export class ProcurementUpdateStatusComponent {
  //to hold id
  id: number ;
  //form-group
  changeStatusForm !: FormGroup;
  //to load status
  statusList: any[] = [];
  //load stages list
  procurementStagesList : any[] = [];
  currentProcurement: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private suppliesService: SuppliesService,
    private snackbar: MatSnackBar,
    private router: Router,
    public utilsService: UtilService
  ){
    this.id = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(){
    this.changeStatusForm = this.fb.group({
      procurementStage: [null, [Validators.required]],
      procurementStatusId : [null],
      statusChangedOn : [null],
      comment: [null]
    });

    //to filter out the current status from the list - loading parallel
    forkJoin({
      statuses : this.suppliesService.getProcurementStatus(),
      stages: this.suppliesService.getStages(),
      current: this.suppliesService.getProcurementById(this.id)
    }).subscribe(({statuses, stages, current})=> {

      this.currentProcurement = current;
      this.procurementStagesList = stages;

      //filter current status
      this.statusList = statuses.filter( (s:any) => s.id !== current.statusId);

       //patch current values to form
      this.changeStatusForm.patchValue({
      procurementStage: current.procurementStage
      });
    });



  }


  submitStatus(){
    if(this.changeStatusForm.invalid) return;

    this.suppliesService.updateStatus(this.id, this.changeStatusForm.value).subscribe(res=>{
      if( res.id != null){
          //show success message
          this.snackbar.open("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
          //navigate by router & refresh at the same time
          // this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+ this.id);
          this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=> {
            this.router.navigate(['/suppliesuser/home/procurement/view/'+ this.id])
          });
        }
    })
  }

}
