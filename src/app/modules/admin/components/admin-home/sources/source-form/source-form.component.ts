import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-source-form',
  standalone: false,
  templateUrl: './source-form.component.html',
  styleUrl: './source-form.component.scss'
})
export class SourceFormComponent {
   //form-group
  sourceForm !:FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ){}


  ngOnInit(){
    this.sourceForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null]
    });
  }

  submitSource(){
    this.adminService.createSource(this.sourceForm.value)
      .subscribe(res =>{
        if(res.id != null){
          this.snackbar.open("Created successfully.", "Close", {duration: 5000, panelClass:"snackbar-success"});
          this.router.navigateByUrl("/adminuser/home/sources/list");
        }
      })
  }
}
