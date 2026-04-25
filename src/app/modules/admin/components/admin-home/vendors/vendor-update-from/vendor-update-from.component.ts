import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-update-from',
  standalone: false,
  templateUrl: './vendor-update-from.component.html',
  styleUrl: './vendor-update-from.component.scss'
})
export class VendorUpdateFromComponent {
  //to hold id
  id: number;

  //form-group
  vendorForm !:FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.id = this.activatedRoute.snapshot.params['id'];
    //load current details to form
    this.getVendorById();
  }


  ngOnInit(){
    this.vendorForm = this.fb.group({
      name: [null, [Validators.required]],
      registeredDate: [null, [Validators.required]],
      comments: [null]
    });
  }

  getVendorById(){
    this.adminService.getVendorById(this.id).subscribe(res => {
      //load details to form
      this.vendorForm.patchValue(res);
    })
  }

  updateVendor(){
    this.adminService.updateVendor(this.id, this.vendorForm.value)
      .subscribe(res =>{
        if(res.id != null){
          this.snackbar.open("Updated successfully.", "Close", {duration: 5000, panelClass:"snackbar-success"});
          this.router.navigateByUrl("/adminuser/home/vendors/list");
        }
      })
  }


}
