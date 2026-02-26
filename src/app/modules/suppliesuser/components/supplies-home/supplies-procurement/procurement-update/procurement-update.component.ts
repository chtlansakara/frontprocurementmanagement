import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-procurement-update',
  standalone: false,
  templateUrl: './procurement-update.component.html',
  styleUrl: './procurement-update.component.scss'
})
export class ProcurementUpdateComponent {
 //to hold id
  id: number;

   //form-group
  procurementForm !: FormGroup;

    //vendor list
  vendorsList : any[] = [];
  //users list
  usersList : any[] = [];
  //sources list
  sourcesList : any[] = [];
  //requests List
  updateRequestList : any[] = [];
  //fast look up for add/remove chips
  requestsMap = new Map<number, any>();
  //current procurement
  currentProcurement : any;

  //boolean flag to select all
  allSelected = false;

    constructor(
    private router: Router,
    private fb: FormBuilder,
    private suppliesService: SuppliesService,
    private snackbar : MatSnackBar,
    private activatedRoute : ActivatedRoute
  ){this.id = activatedRoute.snapshot.params["id"];}

    ngOnInit(){
         //load lists for form
      this.loadVendors();
      this.loadUsers();
      this.loadRequests();
      this.loadSources();


    //load form values
    this.procurementForm = this.fb.group({
      name: [null, [Validators.required]],
      quantity : [null, [Validators.required]],
      requestId : [null, [Validators.required]],
      estimatedAmount: [null, [Validators.required]],
      category : [null, [Validators.required]],
      sourceId : [null, [Validators.required]],
      // donorName : [null],
      method : [null, [Validators.required]],
      authorityLevel : [null, [Validators.required]],
      priorityStatus : [null, [Validators.required]],
      scheduledCommenceDate : [null],
      expectedCompletionDate : [null],
      assignedToUserId : [null, [Validators.required]],
      vendorId : [null],
      remarks: [null]
    });

    this.getProcurementById();



}

  loadVendors(){
    this.suppliesService.getVendors().subscribe(res =>{
      this.vendorsList = res;
    })
  }

  loadUsers(){
    this.suppliesService.getProcurementUsers().subscribe(res => {
      this.usersList = res;
    })
  }

  //pending procurement requests
  loadRequests(){
    this.suppliesService.getRequestsForUpdateProcurement().subscribe(res => {
      this.updateRequestList = res;

    // Only filter if currentProcurement is already loaded - filter to include only the request chosen
    //with the staus -'PROCUREMENT_CREATED'
    if (this.currentProcurement) {
      this.filterRequests();
    }
      //build the request map
      this.buildRequestMap();
    })
  }

   loadSources(){
    this.suppliesService.getSources().subscribe(res=>{
      this.sourcesList = res;
    })
  }

  filterRequests(){
    //get request ids of the current procurement
    if (!this.currentProcurement || !this.updateRequestList) return;
    const currentRequestId = this.currentProcurement.requestId;

    this.updateRequestList = this.updateRequestList.filter(request => {
      return request.status !== 'PROCUREMENT_CREATED' || request.id === currentRequestId;
    });


    //build rhte request map after filtering
    this.buildRequestMap();

  }

  getProcurementById(){
    this.suppliesService.getProcurementById(this.id).subscribe(res=>{
      this.currentProcurement = res;

      // Only filter if updateRequestList is already loaded
    if (this.updateRequestList.length > 0) {
      this.filterRequests();
    }

      this.procurementForm.patchValue(res);
    });
  }

   updateProcurement(){

      this.suppliesService.updateProcurement(this.id,this.procurementForm.value).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open(`Updated procuremenet with ID:${this.id} successfully.`,"Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/suppliesuser/home/procurement/view/"+this.id);
        }
      });
  }


     //method called to remove selected subdivs as chips
    removeRequest(id:number){
      const control = this.procurementForm.get('requestIdList');
      //filter id values which is not the id of the selected
      control?.setValue(
        control.value.filter((x:number) => x !== id  )
      );
      //also filter out 0 id
       control?.setValue(
        control.value.filter((x:number) => x !== 0  )
      );
      this.allSelected = false;
    }

    getAllRequestIds():number[]{
      const ids : number [] = [];
      this.updateRequestList.forEach((request:any)=>{
        ids.push(request.id);
      });
      console.log(ids);
      return ids;
    }



    toggleSelectAll(): void{
      const control = this.procurementForm.get('requestIdList');
      const allIds = this.getAllRequestIds();

      if(this.allSelected){
        control?. setValue([]);
        this.allSelected=false;
      }else{
        control?.setValue(allIds);
        this.allSelected=true;
      }
    }

    //creating a map with request id -> request object
    buildRequestMap(){
      this.updateRequestList.forEach((request:any)=>{
        this.requestsMap.set(request.id, request);
      });
    }

    //to find the title of each selected request
    getRequestById(id:number){
      return this.requestsMap.get(id);
    }







}
