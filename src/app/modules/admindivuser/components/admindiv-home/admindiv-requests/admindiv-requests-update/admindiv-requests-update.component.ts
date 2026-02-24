import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from './../../../../../../common/services/spinner.service';
import { Component } from '@angular/core';
import { AdmindivService } from '../../../../services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admindiv-requests-update',
  standalone: false,
  templateUrl: './admindiv-requests-update.component.html',
  styleUrl: './admindiv-requests-update.component.scss'
})
export class AdmindivRequestsUpdateComponent {
  //to hold the request id
  id: number;

    //form-group
  requestAdmindivForm ! : FormGroup;

  //sub-div list
  subdivsList : any = [];


  constructor(
    public spinnerService: SpinnerService,
    private fb: FormBuilder,
    private admindivService : AdmindivService,
    private snackbar : MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ){
    this.id = activatedRoute.snapshot.params["id"];
  }

    ngOnInit(){
    //load form lists
    this.loadSubdivs();

    //load form values
    this.requestAdmindivForm = this.fb.group({
      title :[null, [Validators.required]],
      description: [null, [Validators.required]],
      subdivIdList: [[],[Validators.required]],
      quantity: [null, [Validators.required]],
      fund: [null],
      estimation: [null, [Validators.required]],
      authorizedBy: [null, [Validators.required]],
      approvedDate:[null, [Validators.required]],
      previouslyPurchased:[false],
      previousPurchaseYear:[null],
      reasonForRequirement:[null]
      });

      //load request details
      this.getRequestById();
    }

    loadSubdivs(){
      this.admindivService.getSubdivList().subscribe(res=>{
        this.subdivsList = res;
      })
    }

    getRequestById(){
      this.admindivService.getRequestById(this.id).subscribe(res =>{
        this.requestAdmindivForm.patchValue(res);
      });
    }

  updateRequest(){
    this.admindivService.updateRequest(this.id, this.requestAdmindivForm.value).subscribe(res =>{
      if(res.id != null){
         //show success message
            this.snackbar.open(`Request ID: ${this.id} updated successfully.`,"Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/admindivuser/home/requests/list");
      }
    })
  }



}
