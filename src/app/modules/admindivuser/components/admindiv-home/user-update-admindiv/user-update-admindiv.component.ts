import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../common/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update-admindiv',
  standalone: false,
  templateUrl: './user-update-admindiv.component.html',
  styleUrl: './user-update-admindiv.component.scss'
})
export class UserUpdateAdmindivComponent {
   //form-group
  userUpdateForm! : FormGroup;

  //list of designations
  designationList: any = [];

     //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
  ){}

    //assigning values from form
  ngOnInit(){


    //load form values
    this.userUpdateForm = this.fb.group({
      name:[null, [Validators.required]],
      designationId: [null, [Validators.required]],
      birthdate: [null],
      telephone: [null,[Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

     //load object lists
    this.getDesignations();

    //load details to form
    this.loadUserDetails();
  }

  getDesignations(){
    this.userService.getDesignations().subscribe(res=>{
      this.designationList =res;
    });
  }

    loadUserDetails(){
    this.userService.getUserDetails().subscribe({
        next: (res) => {
          console.log(res);
          //assign to form
          this.userUpdateForm.patchValue(res);
        },
        error: (err) =>{
          console.log(err);
        }
      });
  }

  updateUserDetails(){
    this.userService.updateUser(this.userUpdateForm.value).subscribe(res=>{
      if(res.id != null){
          //show success message
            this.snackbar.open("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/admindivuser/home");
      }
    })
  }
}
