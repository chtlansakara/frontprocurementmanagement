import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../../../../common/services/user.service';

@Component({
  selector: 'app-change-password-admindiv',
  standalone: false,
  templateUrl: './change-password-admindiv.component.html',
  styleUrl: './change-password-admindiv.component.scss'
})
export class ChangePasswordAdmindivComponent {
   //for password field visibility
  hideCurrentPassword = true;
  hidePassword = true;
  hideConfirmPassword = true;

  updatePasswordForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(){
    this.updatePasswordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword : [null, [Validators.required]]
    });
  }

   //for current password visibility
   toggleCurrentPasswordVisibility(){
    //inverse the boolean value for hidePassword
    this.hideCurrentPassword = !this.hideCurrentPassword;
  }

  //for password visibility
   togglePasswordVisibility(){
    //inverse the boolean value for hidePassword
    this.hidePassword = !this.hidePassword;
  }
  //for confirm password visibility
   toggleConfirmPasswordVisibility(){
    //inverse the boolean value for hidePassword
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }


  submitForm(){

    const entry1 = this.updatePasswordForm.get('password')?.value;
    const entry2 = this.updatePasswordForm.get('confirmPassword')?.value;
    if(entry1 !== entry2){
       this.snackbar.open("Passwords do not match!","Close",{duration:5000, panelClass:"snackbar-error"});
       return;
    }
    console.log(this.updatePasswordForm.value);

    this.userService.updatePassword(this.updatePasswordForm.value).subscribe( res =>{

      if(res.id != null){
        //show success message
          this.snackbar.open("Password updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
        //navigate by router
          this.router.navigateByUrl("/admindivuser/home");
      }
    });


  }
}
