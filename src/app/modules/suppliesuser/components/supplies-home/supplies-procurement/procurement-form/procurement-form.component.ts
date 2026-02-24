import { RequestDto } from './../../../../../../interfaces/RequestDto';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-procurement-form',
  standalone: false,
  templateUrl: './procurement-form.component.html',
  styleUrl: './procurement-form.component.scss'
})
export class ProcurementFormComponent {
  requests: any[] = [];

  //form-group
  procurementForm !: FormGroup;
  //vendor list
  vendorsList : any[] = [];
  //users list
  usersList : any[] = [];
  //requests List
  approvedRequestsList : any[] = [];
  //fast look up for add/remove chips
  requestsMap = new Map<number, any>();

  //boolean flag to select all
  allSelected = false;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private suppliesService: SuppliesService,
    private snackbar : MatSnackBar,
  ){}

  ngOnInit(){
    //load form values
    this.procurementForm = this.fb.group({
      name: [null, [Validators.required]],
      quantity : [null, [Validators.required]],
      requestIdList : [[], [Validators.required]],
      estimatedAmount: [null, [Validators.required]],
      category : [null, [Validators.required]],
      source : [null, [Validators.required]],
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


    //getting selected requests from table list
     this.requests = history.state?.requests ?? [];


      //patch selected requests to the form's select control
      if(this.requests.length > 0){
        const requestIds = this.requests.map(request => request.id);
        // console.log(requestIds);

        this.procurementForm.patchValue({
        requestIdList:requestIds
        });
      }


      //load lists for form
      this.loadVendors();
      this.loadUsers();
      this.loadRequests();

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
    this.suppliesService.getApprovedRequests().subscribe(res => {
      this.approvedRequestsList = res;
      //build the request map
      this.buildRequestMap();
    })
  }

  submitProcurement(){
   //remove 0 if it is there & assign (when selected all option selected)
   const formValue = this.procurementForm.value;
   formValue.requestIdList = formValue.requestIdList.filter((id:number)=> id !== 0);
    // console.log(formValue);
      this.suppliesService.createProcurement(formValue).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/suppliesuser/home/procurement/list");
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
      this.approvedRequestsList.forEach((request:any)=>{
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
      this.approvedRequestsList.forEach((request:any)=>{
        this.requestsMap.set(request.id, request);
      });
    }

    //to find the title of each selected request
    getRequestById(id:number){
      return this.requestsMap.get(id);
    }

}
