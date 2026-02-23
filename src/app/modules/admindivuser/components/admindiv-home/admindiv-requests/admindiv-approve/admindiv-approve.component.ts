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
    this.admindivService.approveRequestCreateApproval(this.requestId, this.approvalForm.value)
      .subscribe(res => {
        if(res.id != null){
          // console.log(res);
           //show success message
          this.snackbar.open("Approved request successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/admindivuser/home/requests/list");
        }
      })
  }
}
