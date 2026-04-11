import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementFormComponent } from './procurement-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SuppliesService } from '../../../../services/supplies.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter, Router } from '@angular/router';


const mockVendorsList = [
  {id: 1, name:'Abans pvt Ltd'},
  {id: 2, name: 'Softlogic pvt ltd'}
];
const mockUsersList = [
  {id: 1, name:'Sanny', email:'sunny@test.com', subdivId: 2},
  {id: 10, name:'Roshini', email:'roshini@test.com', subdivId: 22}
];
const mockSourcesList = [
  {id:1, name: '101'},
  {id: 2, name:'EEF'}
];
const mockRequestList = [
  {id: 1, title: 'Request A', subdivIdLIst: [1,2]},
  {id: 2, title: 'Request B', subdivIdLIst: [2]},
];



describe('ProcurementFormComponent', () => {
  let component: ProcurementFormComponent;
  let fixture: ComponentFixture<ProcurementFormComponent>;

  //dependencies as spies
  let mockSuppliesService : jasmine.SpyObj<SuppliesService>;
  let mockSnackbar : jasmine.SpyObj<MatSnackBar>;
  //dependencies as intances
  let router : Router;

  //helper function to select a request before with history.state
  // & then create component
  async function setupComponent(historyStage: any = {}){

    //check for history state value passed & setup as the return value for the spy already created
    (Object.getOwnPropertyDescriptor(history, 'state')?.get as jasmine.Spy)
      ?.and.returnValue(historyStage);

    await TestBed.configureTestingModule({
      declarations: [ProcurementFormComponent],
      providers: [
        FormBuilder,
        provideHttpClient(),
        {provide: SuppliesService, useValue: mockSuppliesService},
        {provide:MatSnackBar, useValue: mockSnackbar},
        provideRouter([])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();


    //router instance
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(ProcurementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async () => {

    //install a spy for history state
    spyOnProperty(history, 'state', 'get').and.returnValue({});

     //spy object for supplies service mock
    mockSuppliesService = jasmine.createSpyObj('Supplies Service',[
      'getVendors',
      'getProcurementUsers',
      'getApprovedRequests',
      'getSources',
      'createProcurement'
    ]);

    //setup return values for supplies service mock
    mockSuppliesService.getVendors.and.returnValue(of(mockVendorsList));
    mockSuppliesService.getProcurementUsers.and.returnValue(of(mockUsersList));
    mockSuppliesService.getApprovedRequests.and.returnValue(of(mockRequestList));
    mockSuppliesService.getSources.and.returnValue(of(mockSourcesList));

    const mockCreatedProcurement = {id: 21, name: 'new procurement', requestId: 1};
    mockSuppliesService.createProcurement.and.returnValue(of(mockCreatedProcurement));

    //spy object for matsnackbar mock
    mockSnackbar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await setupComponent();
  });



  describe('initialization of the component', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form controls', () => {
      //ARRANGE:
      const formControls = [
        'name', 'quantity', 'requestId', 'estimatedAmount', 'category',
        'sourceId', 'method', 'authorityLevel', 'priorityStatus',
        'scheduledCommenceDate', 'expectedCompletionDate', 'assignedToUserId',
        'vendorId', 'remarks'
      ];
      //ACT & ASSERT:
      formControls.forEach(control => {
        expect(component.procurementForm.contains(control))
        .withContext(`Expected form to contain control: ${control}`)
        .toBeTrue();
      })
    });

     it('should call load list methods', () => {
      //ASSERT:
      expect(mockSuppliesService.getVendors).toHaveBeenCalledTimes(1);
      expect(mockSuppliesService.getProcurementUsers).toHaveBeenCalledTimes(1);
      expect(mockSuppliesService.getApprovedRequests).toHaveBeenCalledTimes(1);
      expect(mockSuppliesService.getSources).toHaveBeenCalledTimes(1);
    });

  });

   describe('request pre-selection with history.state', () => {
      it('should patch request id to control if request selected', async () => {
        //ARRANGE:
        const mockRequest = {id: 4, title:'Cup boards', subdivId: 2};
        //ACT:
        //reset and re-configure with custome history state
        TestBed.resetTestingModule();
        await setupComponent({request: mockRequest});
        //ASSERT:
        expect(component.request).toEqual(mockRequest);
        expect(component.procurementForm.get('requestId')?.value).toBe(mockRequest.id);
      });


       it('should leave requestId null when no history.state', async () => {

        //reset and re-configure with no history state
        TestBed.resetTestingModule();
        await setupComponent({});
        //ASSERT:
        expect(component.request).toBeNull();
        expect(component.procurementForm.get('requestId')?.value).toBeNull();
      });
    });


    describe('loadLists', ()=> {
      it('should populate the class vendors list', () => {
        expect(component.vendorsList.length).toBe(2);
        expect(component.vendorsList[0].name).toBe(mockVendorsList[0].name);
      });

      it('should populate the class users list', () => {
        expect(component.usersList.length).toBe(2);
        expect(component.usersList[0].name).toBe(mockUsersList[0].name);
      });

      it('should populate the class sources list', () => {
        expect(component.sourcesList.length).toBe(2);
        expect(component.sourcesList[0].name).toBe(mockSourcesList[0].name);
      });


      describe('loadRequests', ()=> {
        it('should populate the class approved requests list', () => {
        expect(component.approvedRequestsList.length).toBe(2);
        expect(component.approvedRequestsList[0].title).toBe(mockRequestList[0].title);
        });

        it('should build request map', () => {
          expect(component.requestsMap.size).toBe(mockRequestList.length);
          expect(component.requestsMap.get(2)).toEqual(mockRequestList[1]);
        });
      });


    });

    describe('getRequestById', ()=> {
      it('should return correct request for the id', () => {
        //ACT:
        const result = component.getRequestById(2);
        expect(result).toEqual(mockRequestList[1]);
      });

      it('should return undefined for unknown id', () => {
        //ACT:
        const result = component.getRequestById(222);
        expect(result).toBeUndefined();
      });
    });


    describe('getAllRquestIds', () => {
      it('should return all ids from class request list', () => {
        //ACT:
        const ids = component.getAllRequestIds();
        //ASSERT:
        expect(ids).toEqual([1,2]);
      });

      it('should return empty array when class request list is empty', () => {
        //ARRANGE:
        component.approvedRequestsList = [];
        //ACT:
        const ids = component.getAllRequestIds();
        //ASSERT:
        expect(ids).toEqual([]);
      });
    });

    describe('form validation', () => {
      it('should be invalid when required fields are empty', () => {
        expect(component.procurementForm.valid).toBeFalse();
      });

      it('should be valid when required fields are filled', () => {
        //ARRANGE:
        component.procurementForm.patchValue({
        name: 'Test Procurement',
        quantity: 5,
        requestId: 201,
        estimatedAmount: 50000,
        category: 'IT',
        sourceId: 100,
        method: 'Open Tender',
        authorityLevel: 'Level 1',
        priorityStatus: 'High',
        assignedToUserId: 10,
      });
        //ASSERT:
        expect(component.procurementForm.valid).toBeTrue();
      });

      it('should mark required fields as required when empty', () => {
        const nameControl = component.procurementForm.get('name');
        nameControl?.setValue(null);
        //ASSERT
        expect(nameControl?.hasError('required')).toBeTrue();
      });

       it('should NOT mark optional fields as required when empty', () => {
        const remarksControl = component.procurementForm.get('remarks');
        remarksControl?.setValue(null);
        //ASSERT
        expect(remarksControl?.hasError('required')).toBeFalse();
      });
    });

    describe('removeRequest', () => {
      it('should set all selected to false when a request is removed', () => {
        //ARRANGE:
        component.allSelected= true;
        //ACT:
        component.removeRequest(1);
        //ASSERT:
        expect(component.allSelected).toBeFalse();
      });
    });

    describe('toggleSelectAll', () => {
      it('should set allSelected to true if it was false', () => {
        //ARRANGE:
        component.allSelected = false;
        //ACT:
        component.toggleSelectAll();
        //ASSERT:
        expect(component.allSelected).toBeTrue();
      });
      it('should set allSelected to false if it was true', () => {
        //ARRANGE:
        component.allSelected = true;
        //ACT:
        component.toggleSelectAll();
        //ASSERT:
        expect(component.allSelected).toBeFalse();
      });
    });

    describe('submitProcurement', () => {
      //helper function to patch form values
      function patchFormvalues(){
          component.procurementForm.patchValue({
          name: 'Test Procurement',
          quantity: 5,
          requestId: 201,
          estimatedAmount: 50000,
          category: 'IT',
          sourceId: 100,
          method: 'Open Tender',
          authorityLevel: 'Level 1',
          priorityStatus: 'High',
          assignedToUserId: 10,
          });
      }

      it('should call service method with form values', () => {
        //ARRANGE:
        patchFormvalues();
        //ACT:
        component.submitProcurement();
        //ASSERT:
        expect(mockSuppliesService.createProcurement).toHaveBeenCalledOnceWith(component.procurementForm.value);
      });
      it('should show a success snackbar when successful', () => {
        //ARRANGE:
        patchFormvalues();
        //ACT:
        component.submitProcurement();
        //ASSERT:
        expect(mockSnackbar.open).toHaveBeenCalledWith('Created successfully.', 'Close', jasmine.objectContaining({duration: 5000}));
      });

        it('should NOT show a success snackbar when unsuccessful', () => {
        //ARRANGE:
        patchFormvalues();
          //set to return as id value null
          mockSuppliesService.createProcurement.and.returnValue(of({id:null}));
        //ACT:
        component.submitProcurement();
        //ASSERT:
        expect(mockSnackbar.open).not.toHaveBeenCalled();
      });

      it('should navigate to list page when successful', () => {
        //ARRANGE:
        patchFormvalues();
          spyOn(router,'navigateByUrl');
        //ACT:
        component.submitProcurement();
        //ASSERT:
        expect(router.navigateByUrl).toHaveBeenCalledWith("/suppliesuser/home/procurement/list");
      });

       it('should NOT navigate to list page when unsuccessful', () => {
        //ARRANGE:
        patchFormvalues();
          //set to return as id value null
          mockSuppliesService.createProcurement.and.returnValue(of({id:null}));
          spyOn(router,'navigateByUrl');
        //ACT:
        component.submitProcurement();
        //ASSERT:
        expect(router.navigateByUrl).not.toHaveBeenCalled();
      });

      it('should not call service method when form is invalid', () => {
        component.submitProcurement();
        expect(mockSuppliesService.createProcurement).not.toHaveBeenCalled();
      });

    });



});
