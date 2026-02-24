import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliesService } from '../../../../services/supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplies-requests-update',
  standalone: false,
  templateUrl: './supplies-requests-update.component.html',
  styleUrl: './supplies-requests-update.component.scss'
})
export class SuppliesRequestsUpdateComponent {
  //to hold id
  id: number;

  //form-group
  requestSuppliesForm ! : FormGroup;

  //fast look up
  subDivMap = new Map<number, any>();

  //sub-div list
  subdivsList : any = [];

  constructor(
    private fb: FormBuilder,
    private suppliesService : SuppliesService,
    private snackbar : MatSnackBar,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ){this.id = activatedRoute.snapshot.params["id"];}

  ngOnInit(){
    //load form lists
    this.loadSubdivs();

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

      //load request data to form
      this.getRequsetById();
    }

    loadSubdivs(){
      this.suppliesService.getSubdivList().subscribe(res=>{
        this.subdivsList = res;
        this.buildSubdivMap();
      });
    }

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
        control.value.filter((x:number) => x !== id)
      );
    }


    getRequsetById(){
      this.suppliesService.getRequestById(this.id).subscribe(res =>{
        this.requestSuppliesForm.patchValue(res);
      });
    }

    //submit method
    updateRequest(){
      this.suppliesService.updateRequest(this.id, this.requestSuppliesForm.value).subscribe(res =>{
        if( res.id != null){
          //show success message
          this.snackbar.open(`Request ID: ${this.id} updated successfully.`,"Close",{duration:5000, panelClass:"snackbar-success"});
            //navigate by router
            this.router.navigateByUrl("/suppliesuser/home/requests/list");
        }
      });
    }

}
