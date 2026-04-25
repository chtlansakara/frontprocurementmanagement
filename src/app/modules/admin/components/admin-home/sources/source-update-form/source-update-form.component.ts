import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-source-update-form',
  standalone: false,
  templateUrl: './source-update-form.component.html',
  styleUrl: './source-update-form.component.scss'
})
export class SourceUpdateFormComponent {
    //to hold id
  id: number;

  //form-group
  sourceForm !:FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.id = this.activatedRoute.snapshot.params['id'];
    //load current details to form
    this.getSourceById();
  }


  ngOnInit(){
    this.sourceForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null]
    });
  }

  getSourceById(){
    this.adminService.getSourceById(this.id).subscribe(res => {
      //load details to form
      this.sourceForm.patchValue(res);
    })
  }

  updateSource(){
    this.adminService.updateSource(this.id, this.sourceForm.value)
      .subscribe(res =>{
        if(res.id != null){
          this.snackbar.open("Updated successfully.", "Close", {duration: 5000, panelClass:"snackbar-success"});
          this.router.navigateByUrl("/adminuser/home/sources/list");
        }
      })
  }
}
