import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubdivService } from '../../../../services/subdiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBoxComponent } from '../../../../../../common/delete-box/delete-box.component';

@Component({
  selector: 'app-subdiv-requests-update',
  standalone: false,
  templateUrl: './subdiv-requests-update.component.html',
  styleUrl: './subdiv-requests-update.component.scss'
})
export class SubdivRequestsUpdateComponent {
  readonly dialog = inject(MatDialog);

  openDeleteDialog():void{
    const dialogRef =  this.dialog.open(DeleteBoxComponent,{
      data:{
        entity: 'document'
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      if(res  === true){
       this.removeFile();
      }
    });
  }
//to hold the id
id: number;

//form-group
  requestSubdivForm ! : FormGroup;

 //file
  file : File |null = null;
  attachment: any = null;
   existingFileName: string = '';
  hasExistingFile : boolean = false;
  downloadExistingFile : string | null = null;
  existingFileType: string = 'application/pdf';

  constructor(
    private fb: FormBuilder,
    private subdivService: SubdivService,
    private snackbar : MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){
    //initialize the id
    this.id = activatedRoute.snapshot.params["id"];
  }

  ngOnInit(){
    //load form values
    this.requestSubdivForm = this.fb.group({
      title :[null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      fund: [null],
      estimation: [null, [Validators.required]],
      authorizedBy: [null, [Validators.required]],
      approvedDate:[null, [Validators.required]],
      previouslyPurchased:[false],
      previousPurchaseYear:[null],
      reasonForRequirement:[null]
    });

    //load the request details
    this.getRequestById();

     //get attachment
      this.getRequestAttachment();

  }

   //get request details from backend -& load to class variables
  getRequestById(){
    this.subdivService.getRequestById(this.id).subscribe(res =>{
     //apply to the reactive form
    //  console.log(res);
     this.requestSubdivForm.patchValue(res);
    })
  }


     //get request attachment
    getRequestAttachment(){
      this.subdivService.getRequestAttachment(this.id).subscribe(res =>{
        //save to the class variable
        if(res != null){
        this.attachment = res;
        this.hasExistingFile= true;
        this.existingFileName = this.attachment.originalName;
        this.subdivService.downloadAttachment(this.attachment.id).subscribe((blob: Blob)=>{
          //create download link
          this.downloadExistingFile = window.URL.createObjectURL(blob);
        })
        }
      });
    }

  //submit method - update method
  updateRequest(){
    this.subdivService.updateRequest(this.id, this.requestSubdivForm.value).subscribe(res =>{
      if(res.id != null){
        //show success message
            this.snackbar.open(`Request ID: ${this.id} updated successfully.`,"Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/subdivuser/home/requests/list");
      }
      }

    );
  }

  removeFile(){
    this.file = null;
    this.hasExistingFile = false;
     this.subdivService.deleteRequestAttachment(this.attachment.id).subscribe(res => {
          //show success message
          this.snackbar.open("Document deleted successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
      });
  }



         //handling file changes
  onFileChange(event: any){
    const file = event.target.files[0];
    if(this.hasExistingFile){
      //show success message
          this.snackbar.open("Delete existing document first!.","Close",{duration:5000, panelClass:"snackbar-error"});
          return;
    }else{
    this.hasExistingFile = false;
    }
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
      //backend call to add attachment change
      this.uploadFile();


    }
  }

  uploadFile(){
     const formData = new FormData();
      if(this.file){
      formData.append('file', this.file);
      }else {
        formData.append('file', new Blob([], { type: 'application/pdf' }), '');
      }

    this.subdivService.uploadRequestAttachment(this.id, formData).subscribe(res => {
         if( res.id != null){
          //show success message
          this.snackbar.open("Document uploaded successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
          this.getRequestAttachment();
          this.hasExistingFile = true;
          //navigate by router
            // this.router.navigateByUrl("/suppliesuser/home/requests/list");
        }
      });
  }

}
