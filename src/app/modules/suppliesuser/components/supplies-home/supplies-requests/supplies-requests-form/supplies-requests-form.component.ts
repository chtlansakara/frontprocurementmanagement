import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmindivService } from '../../../../../admindivuser/services/admindiv.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SuppliesService } from '../../../../services/supplies.service';

@Component({
  selector: 'app-supplies-requests-form',
  standalone: false,
  templateUrl: './supplies-requests-form.component.html',
  styleUrl: './supplies-requests-form.component.scss'
})
export class SuppliesRequestsFormComponent {
 //form-group
  requestSuppliesForm ! : FormGroup;

  //fast look up - for grouping
  subDivMap = new Map<number, any>();

  //sub-div list
  subdivsList : any[]= [];

  //filtered sub-divs list
  filteredSubdivList : any =[];

  //list of admin - divisions
  admindivList : any = [];

  //boolean flag for select all
  allSelected = false;

  constructor(
    private fb: FormBuilder,
    private suppliesService : SuppliesService,
    private snackbar : MatSnackBar,
    private router : Router
  ){}

  ngOnInit(){
    //load form lists
    this.getAdmindivs();
    this.getSubdivs();

    //load form values
    this.requestSuppliesForm = this.fb.group({
      title :[null, [Validators.required]],
      description: [null],
      admindivId: [null, [Validators.required]],
      subdivIdList: [[],[Validators.required]],
      quantity: [null, [Validators.required]],
      fund: [null],
      estimation: [null, [Validators.required]],
      authorizedBy: [null, [Validators.required]],
      approvedDate:[null, [Validators.required]],
      previouslyPurchased:[false],
      previousPurchaseYear:[null],
      reasonForRequirement:[null]
      });

      //load sub-divs when admin div is selected
      this.handleAdmindivListChange();

    }

      handleAdmindivListChange(){
    this.requestSuppliesForm.get('admindivId')?.valueChanges.subscribe((admindivId :number)=>{

      //reset subdiv
      this.requestSuppliesForm.get('subdivIdList')?.reset();

      this.allSelected = false;

      if(this.requestSuppliesForm.get('admindivId')?.value){
        //get only the selected admindiv's subdivs by calling backend
        this.suppliesService.getSubdivsByAdmindivId(admindivId).subscribe(res =>{
          //assigning to the class array
          this.filteredSubdivList = res;
          //build the map from filtered list
          this.subDivMap.clear();
          this.filteredSubdivList.forEach((subdiv:any) =>{
            this.subDivMap.set(subdiv.id, subdiv);
          });
      });
      }else{
        this.filteredSubdivList = [];
        this.subDivMap.clear();
      }
    });
  }

    getSubdivs(){
    this.suppliesService.getSubdivs().subscribe(res=>{
      this.subdivsList =res;
      //not filtered yet
      this.filteredSubdivList = [];
      this.buildSubdivMap();
    });
  }

  getAdmindivs(){
    this.suppliesService.getAdmindivs().subscribe(res=>{
      //assign to array
      this.admindivList= res;
    });
  }



    // loadGroupedSubdivs(){
    //   this.suppliesService.getSubdivList().subscribe(res=>{
    //     this.subdivsList = res;
    //     this.buildSubdivMap();
    //   });
    // }

    //to get group name in subdiv list and for add/remove chips behavior
    //creating a map with subdiv id -> subdiv object
    buildSubdivMap(){
      this.subdivsList.forEach((group:any)  => {
        group.subdivDtoList.forEach((sub:any) =>{
          this.subDivMap.set(sub.id, sub);
        });
      });
    }

    //used to find the code of each subdiv by subdiv-id
    getSubdivById(id:number){
      return this.subDivMap.get(id);
    }

    //method called to remove selected subdivs as chips
    removeSubdiv(id:number){
      const control = this.requestSuppliesForm.get('subdivIdList');
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

    // for select all option in subdiv list
    //get ungrouped sub-div id list
    getAllSubdivIds(): number[]{

      if(!Array.isArray(this.filteredSubdivList)){
        return [];
      }
      return this.filteredSubdivList.map(subdiv => subdiv.id);
    }

    toggleSelectAll(): void{
      const control = this.requestSuppliesForm.get('subdivIdList');
      const allIds = this.getAllSubdivIds();

      if(this.allSelected){
        control?. setValue([]);
        this.allSelected=false;
      }else{
        control?.setValue(allIds);
        this.allSelected=true;
      }
    }


    //update the flag manually
    onSubdivChange():void{
       const control = this.requestSuppliesForm.get('subdivIdList');
      const allIds = this.getAllSubdivIds();

      this.allSelected = control?.value.length === allIds.length;

      console.log("on sub div change");
    }



    //submit method
    submitRequest(){
      // console.log(this.requestSuppliesForm.value);
      //filter out select all option value if present
      const formValue = this.requestSuppliesForm.value;
      //remove 0 if it is there & assign
      formValue.subdivIdList = formValue.subdivIdList.filter((id:number)=> id !== 0);

      this.suppliesService.createRequest(formValue).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open("Created successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/suppliesuser/home/requests/list");
        }
      });
    }



}
