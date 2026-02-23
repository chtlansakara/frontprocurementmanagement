import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmindivService } from '../../../../services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindiv-requests-form',
  standalone: false,
  templateUrl: './admindiv-requests-form.component.html',
  styleUrl: './admindiv-requests-form.component.scss'
})
export class AdmindivRequestsFormComponent {
   //form-group
  requestAdmindivForm ! : FormGroup;

  //sub-div list
  subdivsList : any = [];

  constructor(
    private fb: FormBuilder,
    private admindivService : AdmindivService,
    private snackbar : MatSnackBar,
    private router : Router
  ){}

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
    }

    loadSubdivs(){
      this.admindivService.getSubdivList().subscribe(res=>{
        this.subdivsList = res;
      })
    }

    //submit method
    submitRequest(){
      this.admindivService.createRequest(this.requestAdmindivForm.value).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/admindivuser/home/requests/list");
        }
      });
    }

}
