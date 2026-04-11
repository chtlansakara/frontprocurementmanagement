import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmindivService } from '../../../../services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { UtilService } from '../../../../../../utils/util.service';

@Component({
  selector: 'app-admindiv-requests-view',
  standalone: false,
  templateUrl: './admindiv-requests-view.component.html',
  styleUrl: './admindiv-requests-view.component.scss'
})
export class AdmindivRequestsViewComponent {
  //to hold id
  id: number;

  //to hold selected request object
  currentRequest :any ;

  //to hold comments & approvals lists for the request
  comments: any = [];
  approvals: any = [];

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

//get approvals of request
getApprovalsByRequestId(){
  this.admindivService.getApprovalsByRequestId(this.id).subscribe(res => {
    //save to class array
    this.approvals = res;
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

}
