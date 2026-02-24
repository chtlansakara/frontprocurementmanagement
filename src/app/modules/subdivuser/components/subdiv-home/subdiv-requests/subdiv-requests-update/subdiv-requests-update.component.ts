import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubdivService } from '../../../../services/subdiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subdiv-requests-update',
  standalone: false,
  templateUrl: './subdiv-requests-update.component.html',
  styleUrl: './subdiv-requests-update.component.scss'
})
export class SubdivRequestsUpdateComponent {
//to hold the id
id: number;

//form-group
  requestSubdivForm ! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private subdivService: SubdivService,
    private snackbar : MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){
    //initialize the id
    this.id = activatedRoute.snapshot.params["id"];
  }

  ngOnInit(){
    //load form values
    this.requestSubdivForm = this.fb.group({
      title :[null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      fund: [null],
      estimation: [null, [Validators.required]],
      authorizedBy: [null, [Validators.required]],
      approvedDate:[null, [Validators.required]],
      previouslyPurchased:[false],
      previousPurchaseYear:[null],
      reasonForRequirement:[null]
    });

    //load the request details
    this.getRequestById();

  }

   //get request details from backend -& load to class variables
  getRequestById(){
    this.subdivService.getRequestById(this.id).subscribe(res =>{
     //apply to the reactive form
    //  console.log(res);
     this.requestSubdivForm.patchValue(res);
    })
  }

  //submit method - update method
  updateRequest(){
    // console.log(this.requestSubdivForm.value);
    this.subdivService.updateRequest(this.id, this.requestSubdivForm.value).subscribe(res =>{
      if(res.id != null){
        //show success message
            this.snackbar.open(`Request ID: ${this.id} updated successfully.`,"Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/subdivuser/home/requests/list");
      }
      }

    );
  }
}
