import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplies-requests-update',
  standalone: false,
  templateUrl: './supplies-requests-update.component.html',
  styleUrl: './supplies-requests-update.component.scss'
})
export class SuppliesRequestsUpdateComponent {
  //to hold id
  id: number;

  //form-group
  requestSuppliesForm ! : FormGroup;

   //file
  file : File |null = null;
  attachment: any = null;
   existingFileName: string = '';
  hasExistingFile : boolean = false;
  downloadExistingFile : string | null = null;
  existingFileType: string = 'application/pdf';


  //fast look up
  subDivMap = new Map<number, any>();

  //sub-div list
  subdivsList : any = [];

  constructor(
    private fb: FormBuilder,
    private suppliesService : SuppliesService,
    private snackbar : MatSnackBar,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ){this.id = activatedRoute.snapshot.params["id"];}

  ngOnInit(){
    //load form lists
    this.loadSubdivs();

    //load form values
    this.requestSuppliesForm = this.fb.group({
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

      //load request data to form
      this.getRequsetById();
      //get attachment
      this.getRequestAttachment();
    }

    loadSubdivs(){
      this.suppliesService.getGroupedSubdivList().subscribe(res=>{
        this.subdivsList = res;
        this.buildSubdivMap();
      });
    }

    //creating a map with subdiv id -> subdiv object
    buildSubdivMap(){
      this.subdivsList.forEach((group:any)  => {
        group.subdivDtoList.forEach((sub:any) =>{
          this.subDivMap.set(sub.id, sub);
        });
      });
    }

    //used to find the code of each subdiv by subdiv-id
    getSubdivById(id:number){
      return this.subDivMap.get(id);
    }

    //method called to remove selected subdivs as chips
    removeSubdiv(id:number){
      const control = this.requestSuppliesForm.get('subdivIdList');
      //filter id values which is not the id of the selected
      control?.setValue(
        control.value.filter((x:number) => x !== id)
      );
    }


    getRequsetById(){
      this.suppliesService.getRequestById(this.id).subscribe(res =>{
        this.requestSuppliesForm.patchValue(res);
      });
    }

    //get request attachment
    getRequestAttachment(){
      this.suppliesService.getRequestAttachment(this.id).subscribe(res =>{
        //save to the class variable
        if(res != null){
        this.attachment = res;
        this.hasExistingFile= true;
        this.existingFileName = this.attachment.originalName;
        this.suppliesService.downloadAttachment(this.attachment.id).subscribe((blob: Blob)=>{
          //create download link
          this.downloadExistingFile = window.URL.createObjectURL(blob);
        })
        }
      });
    }

    //submit method
    updateRequest(){
      this.suppliesService.updateRequest(this.id, this.requestSuppliesForm.value).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open(`Request ID: ${this.id} updated successfully.`,"Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/suppliesuser/home/requests/list");
        }
      });
    }


  removeFile(){
    this.file = null;
    this.hasExistingFile = false;

     this.suppliesService.deleteRequestAttachment(this.attachment.id).subscribe(res => {

          //show success message
          this.snackbar.open("Document deleted successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            // this.router.navigateByUrl("/suppliesuser/home/requests/list");

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

    this.suppliesService.uploadRequestAttachment(this.id, formData).subscribe(res => {
         if( res.id != null){
          //show success message
          this.snackbar.open("Document uploaded successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            // this.router.navigateByUrl("/suppliesuser/home/requests/list");
        }
      });
  }
}
