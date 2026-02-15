import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubdivService } from '../../../../services/subdiv.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subdiv-requests-form',
  standalone: false,
  templateUrl: './subdiv-requests-form.component.html',
  styleUrl: './subdiv-requests-form.component.scss'
})
export class SubdivRequestsFormComponent {
  //form-group
  requestSubdivForm ! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private subdivService: SubdivService,
    private snackbar : MatSnackBar,
    private router: Router,
  ){}

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
  }


  //submit method
  submitRequest(){
    // console.log(this.requestSubdivForm.value);
    this.subdivService.createRequestForSubdiv(this.requestSubdivForm.value).subscribe( res =>{
      if(res.id != null){
        //show success message
          this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/subdivuser/home/requests/list");
        //navigate to list
      }
   } );
  }

}
