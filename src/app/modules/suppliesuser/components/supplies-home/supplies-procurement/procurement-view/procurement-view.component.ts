import { Component, inject, model, signal } from '@angular/core';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../../../../../auth/services/storage.service';
import { UtilService } from '../../../../../../utils/util.service';
//Material dialog
import { MatDialog } from '@angular/material/dialog';
import { DeleteBoxComponent } from '../../../../../../common/delete-box/delete-box.component';
import { AddFileFormComponent } from './add-file-form/add-file-form.component';

@Component({
  selector: 'app-procurement-view',
  standalone: false,
  templateUrl: './procurement-view.component.html',
  styleUrl: './procurement-view.component.scss'
})
export class ProcurementViewComponent {
  readonly dialog = inject(MatDialog);

  openDeleteDialog():void{
    const dialogRef =  this.dialog.open(DeleteBoxComponent,{
      data:{
        entity: 'procurement'
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      if(res  === true){
       this.deleteProcurement();
      }
    });
  }

    openDeleteDocumentDialog(fileId:number):void{
      const dialogRef =  this.dialog.open(DeleteBoxComponent,{
        data:{
          entity: 'document'
        }
      });

      dialogRef.afterClosed().subscribe(res =>{
        if(res  === true){
          this.removeFile(fileId);
           this.router.navigateByUrl("/suppliesuser/home/", {skipLocationChange: true}).then(() =>{
             this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+this.id);
           });
        }
      });
    }

     openAddFileDialog():void{
      const dialogRef =  this.dialog.open(AddFileFormComponent,{
        data:{
         procurementId: this.id
        }
      });

      dialogRef.afterClosed().subscribe(res =>{
        if(res  === true){

          this.router.navigateByUrl("/suppliesuser/home/", {skipLocationChange: true}).then(() =>{
             this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+this.id);
           });
        }
      });
    }



  //to hold id
  id: number;

  //to hold current procurement details
  currentProcurement: any;

  //to hold status-updates of procurement
  statusUpdates: any[] = [];

  //to hold attachments of procurement
  pdfAttachmentList: any[] = [];



  //logged user id
  userId: number ;
//to show subdiv codes of each request-
    //requests List
  approvedRequestsList : any[] = [];
  //fast look up for add/remove chips
  requestsMap = new Map<number, any>();




  //initialize id
  constructor(
    public spinnerService: SpinnerService,
    private activatedRoute : ActivatedRoute,
    private suppliesService: SuppliesService,
    private snackbar : MatSnackBar,
    private router: Router,
    public utilService: UtilService

  ){
    this.id = activatedRoute.snapshot.params["id"];
    this.userId =Number.parseInt(StorageService.getUserId());
  }

  ngOnInit(){

    //load procurement details
    this.getProcurementById();
    //load status updates
    this.getStatusUpdates();
    //load pdf attachements
    this.getProcurementAttachments();
    //to get subdiv code
    this.loadRequests();
  }

  getProcurementById(){
    this.suppliesService.getProcurementById(this.id).subscribe(res=>{
      //save to variable
      this.currentProcurement = res;
    });
  }

  getProcurementAttachments(){
    this.suppliesService.getProcurementAttachments(this.id).subscribe(res=>{
      //save to class list
      this.pdfAttachmentList = res;
    })
  }

  getStatusUpdates(){
    this.suppliesService.getStatusUpdates(this.id).subscribe(res=>{
      //save to variable
      this.statusUpdates = res;
    })
  }


  deleteProcurement(){
    this.suppliesService.deleteProcurement(this.id).subscribe(res=>{
       //show message
      this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
      //navigate back to list
      this.router.navigateByUrl("/suppliesuser/home/procurement/list");
    })
  }

   // to get request info - to show subdiv code list of each request

  //pending procurement requests
  loadRequests(){
    this.suppliesService.getRequestsForUpdateProcurement().subscribe(res => {
      this.approvedRequestsList = res;
      //build the request map
      this.buildRequestMap();
    })
  }


    //creating a map with request id -> request object
    buildRequestMap(){
      this.approvedRequestsList.forEach((request:any)=>{
        this.requestsMap.set(request.id, request);
      });
    }

    //to find the title of each selected request
    getRequestById(id:number){
      return this.requestsMap.get(id);
    }


    downloadAttachment(fileId:number, fileName: string){
      this.suppliesService.downloadAttachment(fileId).subscribe((blob: Blob)=>{
        this.triggerDownload(blob, fileName);
      });
    }

    private triggerDownload(blob: Blob, fileName: string):void{
      const extension = 'pdf';
      const filename = fileName;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href= url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

    removeFile(fileId: number){
      this.suppliesService.deleteProcurementAttachment(fileId).subscribe(res => {
          //show success message
          this.snackbar.open("Document deleted successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
           this.router.navigateByUrl("/suppliesuser/home/", {skipLocationChange: true}).then(() =>{
             this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+this.id);
           });
      });
    }







}
