import { Component } from '@angular/core';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../../../../../auth/services/storage.service';
import { UtilService } from '../../../../../../utils/util.service';

@Component({
  selector: 'app-procurement-view',
  standalone: false,
  templateUrl: './procurement-view.component.html',
  styleUrl: './procurement-view.component.scss'
})
export class ProcurementViewComponent {
  //to hold id
  id: number;

  //to hold current procurement details
  currentProcurement: any;

  //to hold status-updates of procurement
  statusUpdates: any[] = [];

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
    //to get subdiv code
    this.loadRequests();
  }

  getProcurementById(){
    this.suppliesService.getProcurementById(this.id).subscribe(res=>{
      //save to variable
      this.currentProcurement = res;
      console.log(this.currentProcurement);
    });
  }

  getStatusUpdates(){
    this.suppliesService.getStatusUpdates(this.id).subscribe(res=>{
      //save to variable
      this.statusUpdates = res;
      // console.log(this.statusUpdates);
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



}
