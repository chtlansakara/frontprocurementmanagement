import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubdivService } from '../../../../services/subdiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../../../../../utils/util.service';

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
    public utilService: UtilService
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
      // console.log(this.comments);
    });
  }

  getApprovalsByRequestId(){
    this.subdivService.getApprovalsByRequestId(this.id).subscribe(res =>{
      this.approvals = res;
      // console.log(this.approvals);
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

    mapUserRole(userrole: string): string{
    if(userrole == "SUBDIVUSER") return this.currentRequest.subdivCreatedBy;
    if(userrole == "ADMINDIVUSER") return this.currentRequest.admindivCreatedBy;
    else return "Supplies Division";
  }











}
