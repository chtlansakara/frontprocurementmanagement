import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  //to hold the selected File
  selectedFile : File |null = null;

  //form-group
  userForm! : FormGroup;

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
  ){}

  //assigning values from form
  ngOnInit(){
    //load object lists
    this.getDesignations();
    this.getSubdivs();
    this.getAdmindivs();
    //load form values
    this.userForm = this.fb.group({
      name:[null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      nic: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
      subdivId: [null, [Validators.required]],
      admindivId: [null, [Validators.required]],
      designationId: [null, [Validators.required]],
      userRole: [null, [Validators.required]],
      birthdate: [null],
      telephone: [null,[Validators.pattern('^[0-9]{10}$')]],
      recommendationFile:[null]
    });

    //to load filtered sub-divs when admin div list changes
    this.handleAdmindivListChange();
  }

  handleAdmindivListChange(){
    this.userForm.get('admindivId')?.valueChanges.subscribe((admindivId :number)=>{

      //reset subdiv
      this.userForm.get('subdivId')?.reset();

      if(this.userForm.get('admindivId')?.value){
        //get only the selected admindiv's subdivs by calling backend
      this.adminService.getSubdivsByAdmindivId(admindivId).subscribe(res =>{
        //assigning to the array
        this.filteredSubdivList = res;
      });
      }

      //add filtered list
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

    //submit form event
  // submitUser(){
  //   this.adminService.createUser(this.userForm.value)
  //     .subscribe({

  //       next: (res)=>{
  //         if(res.id!=null){
  //           //show success message
  //           this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
  //           //navigate by router
  //           this.router.navigateByUrl("/adminuser/home/users/list");
  //           }
  //       },

  //       error: (err)=>{
  //         //show error message
  //         // this.snackbar.open("Error occurred!","Close",{duration:5000, panelClass:"snackbar-error"});
  //       }

  //     });
  // }

      //submit form event with file
  submitUser(){
    const formData : FormData = this.buildFormData();

    this.adminService.createUser(formData)
      .subscribe({

        next: (res)=>{
          if(res.id!=null){
            //show success message
            this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/adminuser/home/users/list");
            }
        },

        error: (err)=>{
          //show error message
          // this.snackbar.open("Error occurred!","Close",{duration:5000, panelClass:"snackbar-error"});
        }

      });
  }

  removeFile(){
    this.selectedFile = null;
  }

  buildFormData(): FormData{
    const formData = new FormData();
    const val = this.userForm.value;

    formData.append('name', val.name);
    formData.append('email', val.email);
    formData.append('nic', val.nic);
    formData.append('employeeId', val.employeeId);
    formData.append('subdivId', val.subdivId);
    formData.append('admindivId', val.admindivId);
    formData.append('designationId', val.designationId);
    formData.append('userRole', val.userRole);

    if(val.birthdate){
      formData.append('birthdate', val.birthdate);
    }
    if(val.telephone){
      formData.append('telephone', val.telephone);
    }
    if(this.selectedFile){
      formData.append('recommendationFile', this.selectedFile);
    }else {
      formData.append('recommendationFile', new Blob([], { type: 'application/pdf' }), '');
    }
    return formData;
  }



  //handling file changes
  onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      if(file.type !== 'application/pdf'){
      this.snackbar.open("Only PDF files are allowed!", "Close", {
        duration: 3000,
        panelClass: "snackbar-error"
      });
      event.target.value = '';
      this.selectedFile = null;
      return;
    }

    if(file.size > 5 * 1024 * 1024){
      this.snackbar.open("File size must be less than 5MB!", "Close", {
        duration: 3000,
        panelClass: "snackbar-error"
      });
      event.target.value = '';
      this.selectedFile = null;
      return;
    }

      this.selectedFile = file;
    }
  }

}
