import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  standalone: false,
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent {
  //to hold id
  id: number;

  //for password field visibility
  hidePassword = true;

   //form-group
  userUpdateForm! : FormGroup;

  //list of sub - divisions
  subdivList : any=[];

  //filtered sub-divs list
  filteredSubdivList : any =[];


  //list of designations
  designationList: any = [];

  //list of admin -divisions
  admindivList : any = [];

  //list of user roles
  userRolesList : any = ["SUPPLIESUSER", "SUBDIVUSER", "ADMINDIVUSER", "ADMIN"];

    //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){
    //initialize id
    this.id = activatedRoute.snapshot.params["id"];

  }

  getUserById(){
    this.adminService.getUserById(this.id).subscribe({
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


  //assigning values from form
  ngOnInit(){


    //load form values
    this.userUpdateForm = this.fb.group({
      name:[null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      nic: [null, [Validators.required]],
      password: [null],
      employeeId: [null, [Validators.required]],
      subdivId: [null, [Validators.required]],
      admindivId: [null, [Validators.required]],
      designationId: [null, [Validators.required]],
      userRole: [null, [Validators.required]],
      birthdate: [null],
      telephone: [null,[Validators.pattern('^[0-9]{10}$')]]
    });

    //load object lists
    this.getDesignations();
    // this.getSubdivs();
    this.getAdmindivs();

 this.adminService.getSubdivs().subscribe(subdivs => {
    this.subdivList = subdivs;

     //load details to form
    this.getUserById();

 });

    //to load filtered sub-divs when admin div list changes
    this.handleAdmindivListChange();
  }

  handleAdmindivListChange(){
    this.userUpdateForm.get('admindivId')?.valueChanges.subscribe((admindivId :number)=>{
      this.adminService.getSubdivsByAdmindivId(admindivId).subscribe(res =>{
        this.filteredSubdivList = res;
      });
      // this.filteredSubdivList = this.subdivList.filter(
      //   (s:any)  => s.admindivId === admindivId
      // );
    });
  }


  getDesignations(){
    this.adminService.getDesignations().subscribe(res=>{
      this.designationList =res;
    });
  }

  getSubdivs(){
    this.adminService.getSubdivs().subscribe(res=>{
      this.subdivList =res;
      //not filtered yet
      this.filteredSubdivList = [];
    });
  }

  getAdmindivs(){
    this.adminService.getAdmindivs().subscribe(res=>{
      //assign to array
      this.admindivList= res;
    });
  }

  //for password visibility
   togglePasswordVisibility(){
    //inverse the boolean value for hidePassword
    this.hidePassword = !this.hidePassword;
  }


    //submit form event
  updateUser(){
    this.adminService.updateUser(this.id, this.userUpdateForm.value)
      .subscribe({

        next: (res)=>{
          if(res.id!=null){
            //show success message
            this.snackbar.open("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/adminuser/home/dashboard/users/list");
            }
        },

        error: (err)=>{
          //show error message
          // this.snackbar.open("Existing email!","Close",{duration:5000, panelClass:"snackbar-error"});
        }

      });
  }


  formatDateOnly(date: any): string | null {
  if (!date) return null;

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
}
