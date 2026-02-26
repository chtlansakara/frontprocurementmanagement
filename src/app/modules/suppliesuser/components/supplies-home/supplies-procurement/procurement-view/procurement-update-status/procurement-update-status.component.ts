import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliesService } from '../../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../../../../../../utils/util.service';

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


     this.loadStatusList();
     this.loadStagesList();
     //to filter out current status from the list
     this.getProcurementById();
  }

  loadStatusList(){
    this.suppliesService.getProcurementStatus().subscribe(res=>{
      this.statusList = res;

      if(this.currentProcurement){
         //remove current status from the status list
          this.removeCurrentStatusList();
      }
    });

  }

    loadStagesList(){
    this.suppliesService.getStages().subscribe(res=>{
      this.procurementStagesList = res;

      if(this.currentProcurement){
         //remove current status from the status list
          this.removeCurrentStage();
      }
    });

  }


    getProcurementById(){
    this.suppliesService.getProcurementById(this.id).subscribe(res=>{
      //save to variable
      this.currentProcurement = res;

      if(this.statusList.length){
        this.removeCurrentStatusList();
      }
    });
  }

  removeCurrentStatusList(){

    this.statusList = this.statusList.filter((status:any)=> status.id !== this.currentProcurement.statusId);
  }

    removeCurrentStage(){

    this.procurementStagesList = this.procurementStagesList.filter((status:any)=> status !== this.currentProcurement.procurementStage);
    console.log(this.procurementStagesList);
  }


  submitStatus(){
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
