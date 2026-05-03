import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SuppliesService } from '../../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-file-form',
  standalone: false,
  templateUrl: './add-file-form.component.html',
  styleUrl: './add-file-form.component.scss'
})
export class AddFileFormComponent {
   data = inject(MAT_DIALOG_DATA);
   dialogRef = inject(MatDialogRef<AddFileFormComponent>);

   file: File | null = null;

   addFileForm !: FormGroup;

   constructor(
    private fb: FormBuilder,
    private suppliesService: SuppliesService,
    private snackbar: MatSnackBar){
      console.log(this.data.procurementId);
    }

    ngOnInit(){
      this.addFileForm = this.fb.group({
         name:[null, [Validators.required]]
      });
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
      this.file = null;
      return;
    }

    if(file.size > 5 * 1024 * 1024){
      this.snackbar.open("File size must be less than 5MB!", "Close", {
        duration: 3000,
        panelClass: "snackbar-error"
      });
      event.target.value = '';
      this.file = null;
      return;
    }

      this.file = file;
    }
  }


    //submit method
    submitFile(){
      if(this.file === null){
          this.snackbar.open("Add pdf file to save!.","Close",{duration:5000, panelClass:"snackbar-error"});
          return;
      }
      const val = this.addFileForm.value;

      const formData = new FormData();
      formData.append('name', val.name);
      if(this.file){
        formData.append('file', this.file);
      }else{
        formData.append('file', new Blob([], {type: 'application/pdf'}));
      }

      this.suppliesService.uploadProcurementAttachment(this.data.procurementId, formData).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open("File uploaded successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
          //close dialog with value true
          this.dialogRef.close(true);
        }
      });
    }
}
