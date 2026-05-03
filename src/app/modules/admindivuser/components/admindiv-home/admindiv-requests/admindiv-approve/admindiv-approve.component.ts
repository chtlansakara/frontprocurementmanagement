import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmindivService } from '../../../../services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admindiv-approve',
  standalone: false,
  templateUrl: './admindiv-approve.component.html',
  styleUrl: './admindiv-approve.component.scss'
})
export class AdmindivApproveComponent {
  //to hold request id
  requestId: number;
  approvalForm !: FormGroup;

  //file
  file: File | null = null;

  constructor(private fb: FormBuilder,
    private admindivService: AdmindivService,
    private snackbar : MatSnackBar,
    private router:  Router,
    private activatedRoute: ActivatedRoute

  ){this.requestId = activatedRoute.snapshot.params["id"];}

  ngOnInit(){
     this.approvalForm = this.fb.group({
        allocatedAmount: ['', Validators.required],
        amountInWords: [''],
        fund: [''],
        planNo: [''],
        authorizedBy: ['', Validators.required],
        approvedDate: ['', Validators.required],
        comment: ['']
  });
  }


  submitApproval(){
       const formValue = this.approvalForm.value;
    const formData = new FormData();

    formData.append('approval', new Blob([JSON.stringify(formValue)], {type: 'application/json'}));

    if(this.file){
      formData.append('file', this.file);
    }else{
      formData.append('file', new Blob([], {type: 'application/pdf'}));
    }

    //backend call
    this.admindivService.approveRequestCreateApproval(this.requestId, formData)
    .subscribe(res => {
      if(res.id != null){
        // console.log(res);
          //show success message
        this.snackbar.open("Approved request successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
          //navigate by router
           this.router.navigateByUrl("/admindivuser/home/requests/list");
      }
    });

    // this.admindivService.approveRequestCreateApproval(this.requestId, this.approvalForm.value)
    //   .subscribe(res => {
    //     if(res.id != null){
    //       // console.log(res);
    //        //show success message
    //       this.snackbar.open("Approved request successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
    //         //navigate by router
    //         this.router.navigateByUrl("/admindivuser/home/requests/list");
    //     }
    //   })
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
