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

    //file
  file : File |null = null;


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
      const formValue = this.requestSubdivForm.value;

      const formData = new FormData();
      formData.append('request', new Blob([JSON.stringify(formValue)], {type: 'application/json'}));
      if(this.file){
        formData.append('file', this.file);
      }else{
        formData.append('file', new Blob([], {type: 'application/pdf'}));
      }

    this.subdivService.createRequestForSubdiv(formData).subscribe( res =>{
      if(res.id != null){
        //show success message
          this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/subdivuser/home/requests/list");
        //navigate to list
      }
   } );

  //   this.subdivService.createRequestForSubdiv(this.requestSubdivForm.value).subscribe( res =>{
  //     if(res.id != null){
  //       //show success message
  //         this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
  //           //navigate by router
  //           this.router.navigateByUrl("/subdivuser/home/requests/list");
  //       //navigate to list
  //     }
  //  } );
  }

          //handling file changes
  onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      if(file.type !== 'application/pdf'){
      this.snackbar.open("Only PDF files are allowed!", "Close", {
        duration: 3000,
        panelClass: "snackbar-error"
      });
      event.target.value = '';
      this.file = null;
      return;
    }

    if(file.size > 5 * 1024 * 1024){
      this.snackbar.open("File size must be less than 5MB!", "Close", {
        duration: 3000,
        panelClass: "snackbar-error"
      });
      event.target.value = '';
      this.file = null;
      return;
    }

      this.file = file;
    }
  }

}
