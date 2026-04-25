import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-status-update-form',
  standalone: false,
  templateUrl: './status-update-form.component.html',
  styleUrl: './status-update-form.component.scss'
})
export class StatusUpdateFormComponent {
  //hold id
  id: number;
     //form-group
  statusForm !:FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ){
    this.id = activatedRoute.snapshot.params['id'];
    //load current details to form
    this.getStatusById();
  }


  ngOnInit(){
    this.statusForm = this.fb.group({
      name: [null, [Validators.required]]
    });
  }


  getStatusById(){
    this.adminService.getStatusById(this.id).subscribe(res => {
      //load details to form
      this.statusForm.patchValue(res);
    })
  }

  updateStatus(){
    this.adminService.updateStatus(this.id, this.statusForm.value)
      .subscribe(res =>{
        if(res.id != null){
          this.snackbar.open("Updated successfully.", "Close", {duration: 5000, panelClass:"snackbar-success"});
          this.router.navigateByUrl("/adminuser/home/status/list");
        }
      })
  }
}
