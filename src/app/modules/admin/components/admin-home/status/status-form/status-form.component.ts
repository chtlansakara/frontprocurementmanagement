import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-form',
  standalone: false,
  templateUrl: './status-form.component.html',
  styleUrl: './status-form.component.scss'
})
export class StatusFormComponent {
   //form-group
  statusForm !:FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}


  ngOnInit(){
    this.statusForm = this.fb.group({
      name: [null, [Validators.required]]
    });
  }

  submitStatus(){
    this.adminService.createStatus(this.statusForm.value)
      .subscribe(res =>{
        if(res.id != null){
          this.snackbar.open("Created successfully.", "Close", {duration: 5000, panelClass:"snackbar-success"});
          this.router.navigateByUrl("/adminuser/home/status/list");
        }
      })
  }
}
