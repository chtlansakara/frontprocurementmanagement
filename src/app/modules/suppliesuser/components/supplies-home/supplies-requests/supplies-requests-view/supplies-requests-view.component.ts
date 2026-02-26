import { Component } from '@angular/core';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmindivService } from '../../../../../admindivuser/services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../../../../../utils/util.service';
import { SuppliesService } from '../../../../services/supplies.service';

@Component({
  selector: 'app-supplies-requests-view',
  standalone: false,
  templateUrl: './supplies-requests-view.component.html',
  styleUrl: './supplies-requests-view.component.scss'
})
export class SuppliesRequestsViewComponent {
  //to hold id
  id: number;

   //fast look up for subdiv info
  subDivMap = new Map<number, any>();
   //sub-div list grouped by admin div
  subdivsList : any = [];

  //to hold selected request object
  currentRequest :any ;

  //to hold comments & approvals lists for the request
  comments: any = [];
  approvals: any = [];

  //initialize id from activated route
  constructor(
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private suppliesService : SuppliesService,
    private snackbar: MatSnackBar,
    private router: Router,
    public utilService: UtilService
  ){
    this.id = activatedRoute.snapshot.params["id"];
  }


  ngOnInit(){
    //load subdivs
    this.loadSubdivs();
    //load request details to class variable
    this.getRequestById();
    //load comments & approvals lists
    this.getCommentsByRequestId();
    this.getApprovalsByRequestId();
  }

  //creating a map with subdiv id -> subdiv object (to show its admin div in html)
    buildSubdivMap(){
      this.subdivsList.forEach((group:any)  => {
        group.subdivDtoList.forEach((sub:any) =>{
          this.subDivMap.set(sub.id, sub);
        });
      });
    }

//get grouped subdiv list

    loadSubdivs(){
      this.suppliesService.getGroupedSubdivList().subscribe(res=>{
        this.subdivsList = res;
        this.buildSubdivMap();
      });
    }


//get Request
getRequestById(){
  this.suppliesService.getRequestById(this.id).subscribe(res =>{
    //save to class variable
    this.currentRequest = res;
  })
}

//get comments of request
getCommentsByRequestId(){
  this.suppliesService.getCommentsByRequestId(this.id).subscribe(res => {
    //save to class array
    this.comments = res;
    // console.log(this.comments);
  });
}

//get approvals of request
getApprovalsByRequestId(){
  this.suppliesService.getApprovalsByRequestId(this.id).subscribe(res => {
    //save to class array
    this.approvals = res;
  });
}


  //delete request method
  deleteRequest(id: number){
    this.suppliesService.deleteRequestById(id).subscribe(res =>{
      //show message
      this.snackbar.open("Deleted successfully","Close",{duration:5000, panelClass:"snackbar-success"});
      //navigate back to list
      this.router.navigateByUrl("/suppliesuser/home/requests/list");
    })
  }


  mapUserRole(userrole: string): string{
    if(userrole == "SUBDIVUSER") return this.currentRequest.subdivCreatedBy;
    if(userrole == "ADMINDIVUSER") return this.currentRequest.admindivCreatedBy;
    else return "Supplies Division";
  }


}
