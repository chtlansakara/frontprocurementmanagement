import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from './../../../../../../common/services/spinner.service';
import { Component, inject } from '@angular/core';
import { AdmindivService } from '../../../../services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBoxComponent } from '../../../../../../common/delete-box/delete-box.component';

@Component({
  selector: 'app-admindiv-requests-update',
  standalone: false,
  templateUrl: './admindiv-requests-update.component.html',
  styleUrl: './admindiv-requests-update.component.scss'
})
export class AdmindivRequestsUpdateComponent {
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

  //to hold the request id
  id: number;

    //form-group
  requestAdmindivForm ! : FormGroup;

   //file
  file : File |null = null;
  attachment: any = null;
   existingFileName: string = '';
  hasExistingFile : boolean = false;
  downloadExistingFile : string | null = null;
  existingFileType: string = 'application/pdf';


  //sub-div list
  subdivsList : any = [];


  constructor(
    public spinnerService: SpinnerService,
    private fb: FormBuilder,
    private admindivService : AdmindivService,
    private snackbar : MatSnackBar,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ){
    this.id = activatedRoute.snapshot.params["id"];
  }

    ngOnInit(){
    //load form lists
    this.loadSubdivs();

    //load form values
    this.requestAdmindivForm = this.fb.group({
      title :[null, [Validators.required]],
      description: [null, [Validators.required]],
      subdivIdList: [[],[Validators.required]],
      quantity: [null, [Validators.required]],
      fund: [null],
      estimation: [null, [Validators.required]],
      authorizedBy: [null, [Validators.required]],
      approvedDate:[null, [Validators.required]],
      previouslyPurchased:[false],
      previousPurchaseYear:[null],
      reasonForRequirement:[null]
      });

      //load request details
      this.getRequestById();

        //get attachment
      this.getRequestAttachment();
    }

    loadSubdivs(){
      this.admindivService.getSubdivList().subscribe(res=>{
        this.subdivsList = res;
      })
    }

    getRequestById(){
      this.admindivService.getRequestById(this.id).subscribe(res =>{
        this.requestAdmindivForm.patchValue(res);
      });
    }

     //get request attachment
    getRequestAttachment(){
      this.admindivService.getRequestAttachment(this.id).subscribe(res =>{
        //save to the class variable
        if(res != null){
        this.attachment = res;
        this.hasExistingFile= true;
        this.existingFileName = this.attachment.originalName;
        this.admindivService.downloadAttachment(this.attachment.id).subscribe((blob: Blob)=>{
          //create download link
          this.downloadExistingFile = window.URL.createObjectURL(blob);
        })
        }
      });
    }

  updateRequest(){
    this.admindivService.updateRequest(this.id, this.requestAdmindivForm.value).subscribe(res =>{
      if(res.id != null){
         //show success message
            this.snackbar.open(`Request ID: ${this.id} updated successfully.`,"Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/admindivuser/home/requests/list");
      }
    })
  }

    removeFile(){
    this.file = null;
    this.hasExistingFile = false;

     this.admindivService.deleteRequestAttachment(this.attachment.id).subscribe(res => {

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

    this.admindivService.uploadRequestAttachment(this.id, formData).subscribe(res => {
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
