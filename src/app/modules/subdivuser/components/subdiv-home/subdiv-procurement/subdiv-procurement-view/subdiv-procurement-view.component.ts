import { Component } from '@angular/core';
import { SpinnerService } from '../../../../../../common/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubdivService } from '../../../../services/subdiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from '../../../../../../utils/util.service';

@Component({
  selector: 'app-subdiv-procurement-view',
  standalone: false,
  templateUrl: './subdiv-procurement-view.component.html',
  styleUrl: './subdiv-procurement-view.component.scss'
})
export class SubdivProcurementViewComponent {
   //to hold id
    id: number;

    //to hold current procurement details
    currentProcurement: any;

    //to hold status-updates of procurement
    statusUpdates: any[] = [];

  //to show subdiv codes of each request-
      //requests List
    procurementRequestList : any[] = [];
    //fast look up for add/remove chips
    requestsMap = new Map<number, any>();




    //initialize id
    constructor(
      public spinnerService: SpinnerService,
      private activatedRoute : ActivatedRoute,
      private subdivService : SubdivService,
      private snackbar : MatSnackBar,
      private router: Router,
      public utilService : UtilService

    ){
      this.id = activatedRoute.snapshot.params["id"];
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
      this.subdivService.getProcurementById(this.id).subscribe(res=>{
        //save to variable
        this.currentProcurement = res;
      });
    }

    getStatusUpdates(){
      this.subdivService.getStatusUpdates(this.id).subscribe(res=>{
        //save to variable
        this.statusUpdates = res;
        // console.log(this.statusUpdates);
      })
    }



     // to get request info - to show subdiv code list of each request

    //pending procurement requests
    loadRequests(){
      this.subdivService.getRequestsForProcurement().subscribe(res => {
        this.procurementRequestList = res;
        //build the request map
        this.buildRequestMap();
      })
    }


      //creating a map with request id -> request object
      buildRequestMap(){
        this.procurementRequestList.forEach((request:any)=>{
          this.requestsMap.set(request.id, request);
        });
      }

      //to find the title of each selected request
      getRequestById(id:number){
        return this.requestsMap.get(id);
      }
}
