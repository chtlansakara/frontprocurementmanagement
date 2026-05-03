import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmindivService } from '../../../../services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { UtilService } from '../../../../../../utils/util.service';
import { ApprovalDto } from '../../../../../../interfaces/ApprovalDto';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBoxComponent } from '../../../../../../common/delete-box/delete-box.component';

@Component({
  selector: 'app-admindiv-requests-view',
  standalone: false,
  templateUrl: './admindiv-requests-view.component.html',
  styleUrl: './admindiv-requests-view.component.scss'
})
export class AdmindivRequestsViewComponent {
   readonly dialog = inject(MatDialog);

  openDeleteDialog(requestId: number):void{
    const dialogRef =  this.dialog.open(DeleteBoxComponent,{
      data:{
        entity: 'request'
      }
    });

    dialogRef.afterClosed().subscribe(res =>{
      if(res  === true){
       this.deleteRequest(requestId);
      }
    });
  }

  //to hold id
  id: number;

  //to hold selected request object
  currentRequest :any ;

  //to hold comments & approvals lists for the request
  comments: any = [];
  approvals: any = [];

    //to hold request attachment
  requestAttachment: any = null;

    //to hold -approval id - approval map
  approvalMap = new Map<number, any>();

  //initialize id from activated route
  constructor(
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private admindivService: AdmindivService,
    private snackbar: MatSnackBar,
    private router: Router,
    public utilService: UtilService
  ){
    this.id = activatedRoute.snapshot.params["id"];
  }


  ngOnInit(){
    //load request details to class variable
    this.getRequestById();
    //load comments & approvals lists
    this.getCommentsByRequestId();
    this.getApprovalsByRequestId();
    //load attachment
    this.getRequestAttachment();
  }

//get Request
getRequestById(){
  this.admindivService.getRequestById(this.id).subscribe(res =>{
    //save to class variable
    this.currentRequest = res;
  })
}

//get comments of request
getCommentsByRequestId(){
  this.admindivService.getCommentsByRequestId(this.id).subscribe(res => {
    //save to class array
    this.comments = res;
    // console.log(this.comments);
  });
}

//get request attachment
getRequestAttachment(){
  this.admindivService.getRequestAttachment(this.id).subscribe(res =>{
    //save to the class variable
    if(res != null){
    this.requestAttachment = res;
    }
  });
}


//get approvals of request
getApprovalsByRequestId(){
  this.admindivService.getApprovalsByRequestId(this.id).subscribe(res => {
    //save to class array
    this.approvals = res;
    //get attachments
    this.getApprovalAttachments();
  });
}


//get approval attachment
getApprovalAttachments(){
  this.approvals.forEach((approval : ApprovalDto) => {
    this.admindivService.getApprovalAttachment(approval.id).subscribe(res =>{
    //save to the class variable
    this.approvalMap.set(approval.id, res);
  });
  });

}

  //delete request method
  deleteRequest(id: number){
    this.admindivService.deleteRequestById(id).subscribe(res =>{
      //show message
      this.snackbar.open(`Request ID:${id } deleted successfully`,"Close",{duration:5000, panelClass:"snackbar-success"});
      //navigate back to list
      this.router.navigateByUrl("/admindivuser/home/requests/list");
    })
  }


  mapUserRole(userrole: string): string{
    if(userrole == "SUBDIVUSER") return this.currentRequest.subdivCreatedBy;
    if(userrole == "ADMINDIVUSER") return this.currentRequest.admindivCreatedBy;
    else return "Supplies Division";
  }



  private triggerDownload(blob: Blob):void{
    const filename = `request${this.id}.pdf`;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href= url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }


  printRequest(){
    this.admindivService.downloadPrintRequest(this.id).subscribe((blob: Blob) =>{
      this.triggerDownload(blob);
      this.snackbar.open("Report downloded successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
    });
  }


    downloadAttachment(fileId:number, fileName: string){
      this.admindivService.downloadAttachment(fileId).subscribe((blob: Blob)=>{
        this.triggerDownloadAttachment(blob, fileName);
      });
    }

    private triggerDownloadAttachment(blob: Blob, fileName: string):void{
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

}
