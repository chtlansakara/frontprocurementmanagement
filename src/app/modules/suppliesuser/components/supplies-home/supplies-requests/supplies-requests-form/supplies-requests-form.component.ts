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
    this.loadGroupedSubdivs();

    //load form values
    this.requestSuppliesForm = this.fb.group({
      title :[null, [Validators.required]],
      description: [null, [Validators.required]],
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


    }

    loadGroupedSubdivs(){
      this.suppliesService.getSubdivList().subscribe(res=>{
        this.subdivsList = res;
        this.buildSubdivMap();
      });
    }

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

      if(!Array.isArray(this.subdivsList)){
        return [];
      }

      const ids: number[] = [];
      this.subdivsList.forEach((group:any)=>{
        if(Array.isArray(group.subdivDtoList)){
          group.subdivDtoList.forEach((sub:any)=>{
            ids.push(sub.id);
          });
        }
      });

      return ids;
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
