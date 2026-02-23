import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmindivService } from '../../../../services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admindiv-reject',
  standalone: false,
  templateUrl: './admindiv-reject.component.html',
  styleUrl: './admindiv-reject.component.scss'
})
export class AdmindivRejectComponent {
 //to hold request id
  requestId: number;

  rejectForm !: FormGroup;

  constructor(private fb: FormBuilder,
    private admindivService: AdmindivService,
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
    this.admindivService.rejectRequestCreateComment(this.requestId, this.rejectForm.value)
      .subscribe(res => {
        if(res.id != null){
          // console.log(res);
           //show success message
          this.snackbar.open("Declined request successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/admindivuser/home/requests/list");
        }
      })
  }
}
