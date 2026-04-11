import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProcurementUpdateStatusComponent } from './procurement-update-status.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SuppliesService } from '../../../../../services/supplies.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const mockProcurement = {
    id: 2,
    name: 'Laptop Purchase',
    requestId: 1,
    requestTitle: 'IT Equipment',
    requestAdmindivCode: 'ADM01',
    requestAdmindivName: 'Admin Division',
    requestSubdivCodeList: ['SUB01', 'SUB02'],
    requestEstimation: '50000',
    quantity: 10,
    estimatedAmount: 500000,
    procurementStage: 'PROCUREMENT_PROCESS_NOT_COMMENCED',
    statusId: null,
    commencedDate: '2025-01-01',
    completedDate: null,
    category: 'IT',
    sourceName: 'Local',
    method: 'Open Tender',
    authorityLevel: 'Level 1',
    priorityStatus: 'High',
    scheduledCommenceDate: '2025-02-01',
    expectedCompletionDate: '2025-06-01',
    vendorName: 'Tech Corp',
    vendorRegisteredDate: '2020-01-01',
    vendorComments: 'Reliable vendor',
    assignedToUserEmail: 'officer@example.com',
    assignedToUserDesignation: 'Procurement Officer',
    remarks: 'Urgent',
    donorName: 'UNICEF',
    createdOn: '2025-01-01',
    emailCreatedBy: 'admin@example.com',
    designationCreatedBy: 'Admin',

} ;

const mockStagesList = [
  {id: 1, name: 'PROCUREMENT_PROCESS_NOT_COMMENCED'},
  {id: 2, name: 'PURCHASE_PROCESS_COMMENCED'},
  {id: 3, name: 'PURCHASE_ORDERS_ISSUED'},
  {id: 4, name: 'GOODS_RECEIVED'},
  {id: 5, name: 'PAID_AND_COMPLETED'},
];

const mockStatusList = [
  {id: 1, name: 'Preparing Tender Documents'},
  {id: 2, name: 'Preparing Payment Voucher'},
  {id: 3, name: 'Allocating Funds'}
];

describe('ProcurementUpdateStatusComponent', () => {
  let component: ProcurementUpdateStatusComponent;
  let fixture: ComponentFixture<ProcurementUpdateStatusComponent>;

  //initialized variables in the constructor -> from activated router, thus string
  const mockID = '2';

  //dependencies as spies
  let mockSuppliesService: jasmine.SpyObj<SuppliesService>;
  let mockMatSnackbar : jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    //create spy object for supplies service
    mockSuppliesService = jasmine.createSpyObj('Supplies Service', [
      'getProcurementStatus',
      'getStages',
      'getProcurementById',
      'updateStatus'
    ]);
    //setup return values
    mockSuppliesService.getProcurementStatus.and.returnValue(of(mockStatusList));
    mockSuppliesService.getStages.and.returnValue(of(mockStagesList));
    mockSuppliesService.getProcurementById.and.returnValue(of(mockProcurement));
     const mockStatusUpdate = {id: 20, procurementStage:'PURCHASE_PROCESS_COMMENCED', procurementStatusId: 1,
      statusChangedOn: '2025-01-23', comment:'delayed' };
    mockSuppliesService.updateStatus.and.returnValue(of(mockStatusUpdate));

    //spy object for MatSnackbar
    mockMatSnackbar = jasmine.createSpyObj('MatSnackbar', ['open']);
    //spy object for Router (as we have activated router already)
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    //set return values for the first router method called
    mockRouter.navigateByUrl.and.returnValue(Promise.resolve(true));


    await TestBed.configureTestingModule({
      declarations: [ProcurementUpdateStatusComponent],
      providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockID}}}},
        FormBuilder,
        {provide: SuppliesService, useValue: mockSuppliesService},
        {provide: MatSnackBar, useValue: mockMatSnackbar},
        {provide: Router, useValue: mockRouter}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  describe('ngOnInit', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form controls', ()=>{
      //ARRANGE:
      const formControls = ['procurementStage', 'procurementStatusId',
        'statusChangedOn', 'comment'];
      //ACT & ASSERT:
      formControls.forEach(control => {
        expect(component.changeStatusForm.contains(control))
        .withContext(`Expected form to contain control: ${control}`)
        .toBeTrue();
      });

    });


     describe('forkJoin', () => {
        describe('should call service methods to populate class variables', () => {

          it('should get procurment stages & populate stages list', () =>{
            expect(mockSuppliesService.getStages).toHaveBeenCalledTimes(1);
            expect(component.procurementStagesList).toEqual(mockStagesList);
          });
          it('should get procurment with id & save to variable', () =>{
            expect(mockSuppliesService.getProcurementById).toHaveBeenCalledTimes(1);
            expect(component.currentProcurement).toEqual(mockProcurement);
          });

          it('should get procurment status & populate status list when no status id', () =>{
            expect(mockSuppliesService.getProcurementStatus).toHaveBeenCalledTimes(1);
            expect(component.statusList).toEqual(mockStatusList);
            expect(component.statusList.length).toBe(mockStatusList.length);
          });

        });

        describe('should filter out current procurement status', () => {
          beforeEach(async () => {
          // Override with statusId = 1 BEFORE detectChanges
            mockSuppliesService.getProcurementById.and.returnValue(
              of({ ...mockProcurement, statusId: 1 })
            );

            fixture = TestBed.createComponent(ProcurementUpdateStatusComponent);
            component = fixture.componentInstance;
            fixture.detectChanges(); // ngOnInit runs NOW with statusId = 1
          });

          it('should filter out current procurement status', () => {
            const filtered = component.statusList.find(s => s.id === 1);
            expect(filtered).toBeUndefined();
          });
        });

        it('patch current procurement stage to form control', () =>{
          expect(component.changeStatusForm.get('procurementStage')!.value).toBe(mockProcurement.procurementStage);
        })

      });
  });




  describe('submitStatus', () => {
    //helper function to add setup form values
    function patchFormvalues(){
        const mockCreateStatusUpdate = { procurementStage:'PURCHASE_PROCESS_COMMENCED', procurementStatusId: 1,
          statusChangedOn: "2025-01-23", comment:"delayed" };
        component.changeStatusForm.patchValue(mockCreateStatusUpdate);
    }

    it('should call service method with form values', () => {
      //ARRANGE:
      patchFormvalues();
      //ACT:
      component.submitStatus();
      //ASSERT:
      expect(mockSuppliesService.updateStatus).toHaveBeenCalledOnceWith(component.id, component.changeStatusForm.value);
    });

    it('should call snackbar when successful', () => {
      //ARRANGE:
      patchFormvalues();
      //ACT:
      component.submitStatus();
      //ASSERT:
      expect(mockMatSnackbar.open).toHaveBeenCalledOnceWith("Updated successfully.","Close",{duration:5000, panelClass:"snackbar-success"});
    });

     it('should NOT call snackbar when unuccessful', () => {
      //ARRANGE:
      patchFormvalues();
      mockSuppliesService.updateStatus.and.returnValue(of({id: null}));
      //ACT:
      component.submitStatus();
      //ASSERT:
      expect(mockMatSnackbar.open).not.toHaveBeenCalled();
    });

    it('should navigate to view page when succssful', fakeAsync( () => {
       //ARRANGE:
      patchFormvalues();

      //ACT:
      component.submitStatus();
      tick(); //to flush the Promise.resolve().then(..)
      //ASSERT:
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/', { skipLocationChange: true });
      expect(mockRouter.navigate).toHaveBeenCalledOnceWith(['/suppliesuser/home/procurement/view/'+ mockID]);
    }));

     it('should NOT navigate to view page when unsuccssful', fakeAsync( () => {
       //ARRANGE:
      patchFormvalues();
      mockSuppliesService.updateStatus.and.returnValue(of({id: null}));
      //ACT:
      component.submitStatus();
      tick(); //to flush the Promise.resolve().then(..)
      //ASSERT:
      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));


  });





});
