import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubdivService } from '../../../../services/subdiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subdiv-requests-view',
  standalone: false,
  templateUrl: './subdiv-requests-view.component.html',
  styleUrl: './subdiv-requests-view.component.scss'
})
export class SubdivRequestsViewComponent {
  //to hold id
  id: number;

  //to hold sub-div info
  subdiv: any =[];

  //to hold selected request object
  currentRequest : any = [];
  //to hold reject comments and approvals
  comments: any = [];
  approvals: any = [];


  //initialize id from activated route
  constructor(
    private activatedRoute: ActivatedRoute,
    private subdivService: SubdivService,
    private snackbar : MatSnackBar,
    private router : Router,
  ){
    this.id = activatedRoute.snapshot.params["id"];
  }

  ngOnInit(){
    this.getSubdiv();
    this.getRequestById();
    this.getRejectCommentsByRequestId();
    this.getApprovalsByRequestId();
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

  getSubdiv(){
    this.subdivService.getSubdiv().subscribe(res =>{
      this.subdiv = res;
      // console.log(this.subdiv);
    });
  }

  getRejectCommentsByRequestId(){
    this.subdivService.getCommentsByRequestId(this.id).subscribe(res =>{
      this.comments = res;
      console.log(this.comments);
    });
  }

  getApprovalsByRequestId(){
    this.subdivService.getApprovalsByRequestId(this.id).subscribe(res =>{
      this.approvals = res;
      console.log(this.approvals);
    });
  }

  //delete request method
  deleteRequest(id: number){
    this.subdivService.deleteRequest(id).subscribe(res =>{
      //show message
      this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
      //navigate back to list
      this.router.navigateByUrl("/subdivuser/home/requests/list");
    })
  }



  //FOR HTML Formatting
    //status formatting
  getStatusClass(status: string): string{
    switch(status) {
      case 'PENDING_ADMIN_APPROVAL':
        return 'status-admin-pending';

      case 'REJECTED_ADMIN_APPROVAL':
        return 'status-admin-rejected';

      case 'PENDING_SUPPLIES_APPROVAL':
        return 'status-supplies-pending';

      case 'REJECTED_SUPPLIES_APPROVAL':
        return 'status-supplies-rejected';

      case 'PENDING_PROCUREMENT':
        return 'status-pending-procurement';

      case 'PROCUREMENT_CREATED':
        return 'status-procuremnt-created';

          //postponed request - after approved by supplies
      // case 'PROCUREMENT_POSTPONED':
      //   return 'status-procuremnt-created';

      //   //cancelled request - after approved by supplies
      // case 'PROCUREMENT_CANCELLED':
      //   return 'status-procuremnt-created';

      default:
        return 'status-default';
    }
  }

  //format status on html
  formatStatus(status: string): string{
    switch(status) {
      case 'PENDING_ADMIN_APPROVAL':
        return 'PENDING ADMIN';

      case 'REJECTED_ADMIN_APPROVAL':
        return 'REJECTED ADMIN';

        //when directed to supplies approval
      case 'PENDING_SUPPLIES_APPROVAL':
        return 'PENDING Supplies';

      case 'REJECTED_SUPPLIES_APPROVAL':
        return 'REJECTED Supplies';

        //when approved by supplies
      case 'PENDING_PROCUREMENT':
        return 'APPROVED Supplies';

        //when a procurement is created for the request
      case 'PROCUREMENT_CREATED':
        return 'In Procurment';

        //postponed request - after approved by supplies
      case 'PROCUREMENT_POSTPONED':
        return 'Postponed';

        //cancelled request - after approved by supplies
      case 'PROCUREMENT_CANCELLED':
        return 'Cancelled';

      default:
        return 'Not defined';
  }
}

//format previously purchased column

formatBoolean(value: boolean): string{
  if(value == true) return 'Yes';
  if(value == false) return 'No';
  return ' ';
}


}
