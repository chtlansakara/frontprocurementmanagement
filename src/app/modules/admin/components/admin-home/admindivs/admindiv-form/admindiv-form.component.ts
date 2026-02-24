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

    //list of designations
  designationList: any = [];


  //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}

  //assigning values from form
  ngOnInit(){
    //load object lists
    this.getDesignations();

    this.admindivForm = this.fb.group({
      name:[null, [Validators.required]],
      code: [null, [Validators.required]],
      email: [null, [Validators.email]],
      telephone: [null,[Validators.pattern('^[0-9]{10}$')]],
      address: [null],
      responsibleDesignationId: [null, [Validators.required]]
    });
  }

    getDesignations(){
    this.adminService.getDesignations().subscribe(res=>{
      this.designationList =res;
    });
  }

  //submit form event
  submitAdmindiv(){
     console.log(this.admindivForm.value);
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
