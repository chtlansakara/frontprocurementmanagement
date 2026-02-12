import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-designation-update-form',
  standalone: false,
  templateUrl: './designation-update-form.component.html',
  styleUrl: './designation-update-form.component.scss'
})
export class DesignationUpdateFormComponent {
  //to hold id
  id:number;

//form-group
  designationUpdateForm!: FormGroup;
  //array of grades
  listOfGrades: any = ["I", "II", "III"];

  //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private router: Router,
  ){
    //initialize from router path
    this.id = this.activatedRoute.snapshot.params["id"];
    //load details from backend by id
    this.getDesignationById();
  }

  //assigning form values to variables
  ngOnInit(){
    this.designationUpdateForm = this.fb.group({
      title: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      code: [null, [Validators.required]]
    });
  }

  //method to get details from backend
  getDesignationById(){
    this.adminService.getDesignationById(this.id).subscribe(res =>{
      //update form
      this.designationUpdateForm.patchValue(res);
    })
  }


  //submit form
  updateDesignation(){
    this.adminService.updateDesignation(this.id, this.designationUpdateForm.value).subscribe({
      next: (res)=> {
      if(res.id!= null){
        //show success message
        this.snackbar.open("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
        //navigate by router
        this.router.navigateByUrl("/adminuser/home/dashboard/designations/list");
      }},
      error: (err) => {
        console.log(err);
        //show error message
        // this.snackbar.open("Existing designation or code!","Close",{duration:5000, panelClass:"snackbar-error"});
      }
    })
  }
}
