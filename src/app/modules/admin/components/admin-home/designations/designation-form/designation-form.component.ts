import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-designation-form',
  standalone: false,
  templateUrl: './designation-form.component.html',
  styleUrl: './designation-form.component.scss'
})
export class DesignationFormComponent {

  //form-group
  designationForm!: FormGroup;

  //array of grades
  listOfGrades: any = ["I", "II", "III"];

  //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router : Router
  ){}

  //assigning form values to variables
  ngOnInit(){
    this.designationForm = this.fb.group({
      title: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      code: [null, [Validators.required]]
    });


//to auto generate code name from initals & grade
    // this.designationForm.valueChanges.subscribe(v => {
    //   if(!v.title || !v.grade) return;
    //   const initials = v.title
    //     .trim().split(/\s+/).map((w:string)=> w.charAt(0).toUpperCase()).join('');

    //   this.designationForm.patchValue(
    //     {code: `${initials}-${v.grade}`},
    //     {emitEvent:false}
    //   );
    // });
  }

  //submit form event
  submitDesignation(){

      this.adminService.createDesignation(this.designationForm.value)
        .subscribe(
          {next: (res) => {

            if(res.id!= null){
            //show success message
            this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/adminuser/home/designations/list");
            }
          },
          error: (err) => {
          //show error message
          // this.snackbar.open("Error occurred!","Close",{duration:5000, panelClass:"snackbar-error"});
          }
          });
      }


    }








