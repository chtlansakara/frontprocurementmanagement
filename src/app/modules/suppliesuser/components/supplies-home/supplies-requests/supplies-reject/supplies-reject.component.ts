import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplies-reject',
  standalone: false,
  templateUrl: './supplies-reject.component.html',
  styleUrl: './supplies-reject.component.scss'
})
export class SuppliesRejectComponent {
  //to hold request id
  requestId: number;

  rejectForm !: FormGroup;

  constructor(private fb: FormBuilder,
    private suppliesService : SuppliesService,
    private snackbar : MatSnackBar,
    private router:  Router,
    private activatedRoute: ActivatedRoute

  ){this.requestId = activatedRoute.snapshot.params["id"];}

  ngOnInit(){
     this.rejectForm = this.fb.group({

        authorizedBy: ['', Validators.required],
        content: ['']
  });
  }


  submitRejection(){
    this.suppliesService.rejectRequestCreateComment(this.requestId, this.rejectForm.value)
      .subscribe(res => {
        if(res.id != null){
          // console.log(res);
           //show success message
          this.snackbar.open("Declined request successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/suppliesuser/home/requests/list");
        }
      })
  }
}
