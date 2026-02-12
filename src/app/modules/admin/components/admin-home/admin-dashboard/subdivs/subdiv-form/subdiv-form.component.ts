import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subdiv-form',
  standalone: false,
  templateUrl: './subdiv-form.component.html',
  styleUrl: './subdiv-form.component.scss'
})
export class SubdivFormComponent {

  //form-group
  subdivForm!: FormGroup;

  //list of admin divs
  admindivList :any =[];

    //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}

  //assigning values from form
  ngOnInit(){
    //load admin divs to array
    this.getAdmindivs();
    this.subdivForm = this.fb.group({
      name:[null, [Validators.required]],
      code: [null, [Validators.required]],
      admindivId: [null, [Validators.required]],
      email: [null, [Validators.email]],
      telephone: [null,[Validators.pattern('^[0-9]{10}$')]],
      address: [null]
    });
  }


  getAdmindivs(){
    this.adminService.getAdmindivs().subscribe(res=>{
      //assign to array
      this.admindivList= res;
    });
  }

  //submit form event
  submitSubdiv(){
    this.adminService.createSubdiv(this.subdivForm.value)
      .subscribe({

        next: (res)=>{
          if(res.id!=null){
            //show success message
            this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/adminuser/home/dashboard/subdivs/list");
            }
        },

        error: (err)=>{
          //show error message
          // this.snackbar.open("Error occurred!","Close",{duration:5000, panelClass:"snackbar-error"});
        }

      });
  }

}
