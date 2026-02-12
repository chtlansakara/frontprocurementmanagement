import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  //form-group
  signupForm!: FormGroup;
  //show-hide password
  hidePassword = true;

  //constructor - injecting dependencies
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router : Router
  ){}

  //initializing form with input
  ngOnInit(){
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword :[null, [Validators.required]]
    });
  }
  //change password visibility
  togglePasswordVisibility(){
    //inverse the boolean value for click even
    this.hidePassword = !this.hidePassword;
  }

  //check password match
  checkPasswords(password: string, confirmPassword: string): string{
    if(password!== confirmPassword){
      return "Passwords do not match!";
    }
    return '';
  }


  //signup form submit method
  signupUser(){

    //check password
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    const errorMessage = this.checkPasswords(password,confirmPassword);
    //when don't match
    if(errorMessage){
      //show error message
      this.snackbar.open(errorMessage,"Close",{duration:5000, panelClass: "snackbar-error" });
    }
    //call API
    this.authService.signup(this.signupForm.value).subscribe(res =>{
      //results in console
      console.log(res);
      //check if successful
      if(res.id!= null){
        //show success message
        this.snackbar.open("Sign up successful!","Close",{duration:5000, panelClass:"snackbar-success"});
        //navigate to login page
        this.router.navigateByUrl("/login");
      }else{
        //show error message
        this.snackbar.open("Sign up failed! Try again.","Close",{duration:5000, panelClass:"snackbar-error"});
      }
    })

  }

}
