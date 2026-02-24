import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-admindiv-update',
  standalone: false,
  templateUrl: './admindiv-update.component.html',
  styleUrl: './admindiv-update.component.scss'
})
export class AdmindivUpdateComponent {
  //to hold id
  id: number;

      //list of designations
  designationList: any = [];

  //form-group
  admindivUpdateForm!: FormGroup;

  //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private router: Router,
  ){
    //initialize id from routed path
    this.id = this.activatedRoute.snapshot.params["id"];
    //load details to form
    this.getAdmindivById();
  }

    //get object from backend
    getAdmindivById(){
      this.adminService.getAdmindivById(this.id).subscribe({
        next: (res) => {
          console.log(res);
          //assign to form
          this.admindivUpdateForm.patchValue(res);
        },
        error: (err) =>{
          console.log(err);
        }
      });
    }

  //assigning values from form
  ngOnInit(){
    //load object lists
    this.getDesignations();


    this.admindivUpdateForm = this.fb.group({
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
  updateAdmindiv(){
    this.adminService.updateAdmindiv(this.id, this.admindivUpdateForm.value).subscribe({
      next: (res)=> {
      if(res.id!= null){
        //show success message
        this.snackbar.open("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
        //navigate by router
        this.router.navigateByUrl("/adminuser/home/admindivs/list");
      }},
      error: (err) => {
        console.log(err);
        //show error message
        // this.snackbar.open("Existing Admin Division or Code!","Close",{duration:5000, panelClass:"snackbar-error"});
      }
    })
  }

}
