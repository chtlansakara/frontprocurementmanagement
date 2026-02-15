import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-admindiv-form',
  standalone: false,
  templateUrl: './admindiv-form.component.html',
  styleUrl: './admindiv-form.component.scss'
})
export class AdmindivFormComponent {
  //from-group
  admindivForm!: FormGroup;

  //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}

  //assigning values from form
  ngOnInit(){
    this.admindivForm = this.fb.group({
      name:[null, [Validators.required]],
      code: [null, [Validators.required]],
      email: [null, [Validators.email]],
      telephone: [null,[Validators.pattern('^[0-9]{10}$')]],
      address: [null]
    });
  }

  //submit form event
  submitAdmindiv(){
    this.adminService.createAdmindiv(this.admindivForm.value)
      .subscribe({

        next: (res)=>{
          if(res.id!=null){
            //show success message
            this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/adminuser/home/admindivs/list");
            }
        },

        error: (err)=>{
          //show error message
          // this.snackbar.open("Error occurred!","Close",{duration:5000, panelClass:"snackbar-error"});
        }

      });
  }




}
