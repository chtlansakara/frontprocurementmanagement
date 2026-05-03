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

    //file
  file : File |null = null;

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
      const formValue = this.requestAdmindivForm.value;

      const formData = new FormData();
      formData.append('request', new Blob([JSON.stringify(formValue)], {type: 'application/json'}));
      if(this.file){
        formData.append('file', this.file);
      }else{
        formData.append('file', new Blob([], {type: 'application/pdf'}));
      }

      this.admindivService.createRequest(formData).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
             this.router.navigateByUrl("/admindivuser/home/requests/list");
        }
      });

      // this.admindivService.createRequest(this.requestAdmindivForm.value).subscribe(res =>{
      //   if( res.id != null){
      //     //show success message
      //     this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
      //       //navigate by router
      //       this.router.navigateByUrl("/admindivuser/home/requests/list");
      //   }
      // });
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
