import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-subdiv-update',
  standalone: false,
  templateUrl: './subdiv-update.component.html',
  styleUrl: './subdiv-update.component.scss'
})
export class SubdivUpdateComponent {
  //to hold id
  id: number;

  //form-group
  subdivUpdateForm!: FormGroup;

  //list of admin divs
  admindivList :any =[];

    //injecting dependencies
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){
    //initialize id from the routed path
    this.id = activatedRoute.snapshot.params["id"];
    //load details to form
    this.getSubdivById();
  }

   //get object from backend to form
    getSubdivById(){
      this.adminService.getSubdivById(this.id).subscribe({
        next: (res) => {
          console.log(res);
          //assign to form
          this.subdivUpdateForm.patchValue(res);
        },
        error: (err) =>{
          console.log(err);
        }
      });
    }


  //assigning new values from form
  ngOnInit(){
    //load admin divs to array
    this.getAdmindivs();
    this.subdivUpdateForm = this.fb.group({
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
  updateSubdiv(){
    this.adminService.updateSubdiv(this.id, this.subdivUpdateForm.value)
      .subscribe({

        next: (res)=>{
          if(res.id!=null){
            //show success message
            this.snackbar.open("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/adminuser/home/subdivs/list");
            }
        },

        error: (err)=>{
          //show error message
          // this.snackbar.open("Existing Sub division or Code!","Close",{duration:5000, panelClass:"snackbar-error"});
        }

      });
  }
}
