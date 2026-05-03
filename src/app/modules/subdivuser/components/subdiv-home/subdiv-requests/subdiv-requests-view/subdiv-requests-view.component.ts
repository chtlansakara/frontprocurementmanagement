import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubdivService } from '../../../../services/subdiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../../../../../utils/util.service';
import { ReportServiceService } from '../../../../../suppliesuser/services/report-service.service';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { ApprovalDto } from '../../../../../../interfaces/ApprovalDto';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBoxComponent } from '../../../../../../common/delete-box/delete-box.component';

@Component({
  selector: 'app-subdiv-requests-view',
  standalone: false,
  templateUrl: './subdiv-requests-view.component.html',
  styleUrl: './subdiv-requests-view.component.scss'
})
export class SubdivRequestsViewComponent {
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

  //to hold sub-div info
  subdiv: any =[];

  //to hold selected request object
  currentRequest : any = [];
  //to hold reject comments and approvals
  comments: any = [];
  approvals: any = [];

  //to hold request attachment
  requestAttachment: any = null;

  //to hold -approval id - approval map
  approvalMap = new Map<number, any>();

  //initialize id from activated route
  constructor(
    private activatedRoute: ActivatedRoute,
    private subdivService: SubdivService,
    private snackbar : MatSnackBar,
    private router : Router,
    public utilService: UtilService,
    public spinnerService: SpinnerService
  ){
    this.id = activatedRoute.snapshot.params["id"];
  }

  ngOnInit(){
    this.getSubdiv();
    this.getRequestById();
    this.getRejectCommentsByRequestId();
    this.getApprovalsByRequestId();
     //load attachment
    this.getRequestAttachment();
  }

  //get request details from backend -& load to class variables
  getRequestById(){
    this.subdivService.getRequestById(this.id).subscribe(res =>{
      //save to class variable
      this.currentRequest = res;
      //check in console
      // console.log(this.currentRequest);
    })
  }

  //get request attachment
getRequestAttachment(){
  this.subdivService.getRequestAttachment(this.id).subscribe(res =>{
    //save to the class variable
    if(res != null){
    this.requestAttachment = res;
    }
  });
}

  getSubdiv(){
    this.subdivService.getSubdiv().subscribe(res =>{
      this.subdiv = res;
      // console.log(this.subdiv);
    });
  }

  getRejectCommentsByRequestId(){
    this.subdivService.getCommentsByRequestId(this.id).subscribe(res =>{
      this.comments = res;
      // console.log(this.comments);
    });
  }

  getApprovalsByRequestId(){
    this.subdivService.getApprovalsByRequestId(this.id).subscribe(res =>{
      this.approvals = res;
       //get attachments
    this.getApprovalAttachments();
    });
  }

  //get approval attachment
  getApprovalAttachments(){
    this.approvals.forEach((approval : ApprovalDto) => {
      this.subdivService.getApprovalAttachment(approval.id).subscribe(res =>{
      //save to the class variable
      this.approvalMap.set(approval.id, res);
    });
    });

  }

  //delete request method
  deleteRequest(id: number){
    this.subdivService.deleteRequest(id).subscribe(res =>{
      //show message
      this.snackbar.open(`Request ID:${id } deleted successfully`,"Close",{duration:5000, panelClass:"snackbar-success"});
      //navigate back to list
      this.router.navigateByUrl("/subdivuser/home/requests/list");
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
    this.subdivService.downloadPrintRequest(this.id).subscribe((blob: Blob) =>{
      this.triggerDownload(blob);
      this.snackbar.open("Report downloded successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
    });
  }


    downloadAttachment(fileId:number, fileName: string){
      this.subdivService.downloadAttachment(fileId).subscribe((blob: Blob)=>{
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
