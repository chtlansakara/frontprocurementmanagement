import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //form-group
  loginForm!: FormGroup;
  //show-hide password
  hidePassword = true;

  //constructor -injecting dependencies
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
  ){}

  //initializing form with inputs
  ngOnInit(){
    this.loginForm = this.fb.group({
      email:[null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

   //change password visibility
  togglePasswordVisibility(){
    //inverse the boolean value for click even
    this.hidePassword = !this.hidePassword;
  }

  //signup form submit method
  loginUser(){
    //calling API method
    this.authService.login(this.loginForm.value).subscribe({

      next: (res) =>{

      //check if successful
      if(res.id!= null){

        //creating user object from response details
        const user = {
          id: res.id,
          userRole: res.userRole,
          name: res.name
        };
        //saving user details to local storage
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);

        // navigating to the user role's dashboard
        const userRole = StorageService.getUserRole();
        if(userRole === "ADMIN"){
          this.router.navigateByUrl("/adminuser/home");
        }else if(userRole === "SUPPLIESUSER"){
          this.router.navigateByUrl("/suppliesuser/home");
        }else if(userRole === "ADMINDIVUSER"){
          this.router.navigateByUrl("/admindivuser/home");
        }else if(userRole ==="SUBDIVUSER"){
          this.router.navigateByUrl("/subdivuser/home");
        }

        //show success message
        this.snackbar.open("Login successful!","Close",{duration:5000, panelClass:"snackbar-success"});
      }},

      error: (err) => {
        //show error message
        // this.snackbar.open("Invalid credentials!","Close",{duration:5000, panelClass:"snackbar-error"});
      }});
  }

}


