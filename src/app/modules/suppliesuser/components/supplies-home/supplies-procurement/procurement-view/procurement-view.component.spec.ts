import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementViewComponent } from './procurement-view.component';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageService } from '../../../../../../auth/services/storage.service';
import { ProcurementResponseDto } from '../../../../../../interfaces/ProcurementResponseDto';
import { SuppliesService } from '../../../../services/supplies.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const mockProcurement : ProcurementResponseDto = {
    id: 1,
    name: 'Laptop Purchase',
    requestTitle: 'IT Equipment',
    requestAdmindivCode: 'ADM01',
    requestAdmindivName: 'Admin Division',
    requestSubdivCodeList: ['SUB01', 'SUB02'],
    requestEstimation: '50000',
    quantity: 10,
    estimatedAmount: 500000,
    procurementStage: 'PROCUREMENT_PROCESS_NOT_COMMENCED',
    statusName: 'Active',
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


} as ProcurementResponseDto ;

const mockRequestList = [
  {id: 1, title: 'Request A', subdivIdLIst: [1,2]},
  {id: 2, title: 'Request B', subdivIdLIst: [2]},
];
const mockStatusUpdatesList = [
  {id: 1, procurementStage: 'PURCHASE_ORDERS_ISSUED"', procurementStatusId: 1, statusChangedOn: '2025-01-01', comment: 'delayed than expected'},
  {id: 2, procurementStage: 'PROCUREMENT_PROCESS_NOT_COMMENCED', procurementStatusId: null, statusChangedOn: '2025-05-21', comment: null},
];

describe('ProcurementViewComponent', () => {
  let component: ProcurementViewComponent;
  let fixture: ComponentFixture<ProcurementViewComponent>;

  //dependencies as spies
  let mockSuppliesService : jasmine.SpyObj<SuppliesService>;
  let mockMatSnackbar : jasmine.SpyObj<MatSnackBar>;
  let  mockRouter : jasmine.SpyObj<Router>;


  //initialized variables in the constructor
  const mockID = 2;
  const mockUserId = '3';

  beforeEach(async () => {
    //return userId from StorageService static class
    spyOn(StorageService, 'getUserId').and.returnValue(mockUserId);

    //spy object for supplies service
    mockSuppliesService = jasmine.createSpyObj('Supplies Service', [
      'getProcurementById',
      'getStatusUpdates',
      'deleteProcurement',
      'getRequestsForUpdateProcurement'
    ]);
    //setup return values for supplies service methods
    mockSuppliesService.getProcurementById.and.returnValue(of(mockProcurement));
    mockSuppliesService.getStatusUpdates.and.returnValue(of(mockStatusUpdatesList));
    mockSuppliesService.deleteProcurement.and.returnValue(of(null));
    mockSuppliesService.getRequestsForUpdateProcurement.and.returnValue(of(mockRequestList));


    //spy object for mat snack bar
    mockMatSnackbar = jasmine.createSpyObj('MatSnackbar', ['open']);

    //spy object for router
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);


    await TestBed.configureTestingModule({
      declarations: [ProcurementViewComponent],
      providers: [
        provideHttpClient(),
        //setup id in the activated route param
        {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockID}}}},
        {provide: SuppliesService, useValue: mockSuppliesService},
        {provide: MatSnackBar, useValue: mockMatSnackbar},
        {provide: Router, useValue: mockRouter}

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementViewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  describe('Constructor', () => {

    it('should create', () => {
    expect(component).toBeTruthy();
    });

    it('should set class id value to id from ActivatedRoute', () => {
      expect(component.id).toBe(mockID);
    });

    it('should set user id value to id from StorageService', () => {
      expect(StorageService.getUserId).toHaveBeenCalledTimes(1);
      expect(component.userId).toBe(Number.parseInt(mockUserId));
    });

  });


   describe('ngOnInit', () => {

    it('should call get Procurement method', () => {
      //ARRANGE:
      spyOn(component, 'getProcurementById');
      //ACT:
      component.ngOnInit();
      //ASSERT:
      expect(component.getProcurementById).toHaveBeenCalledTimes(1);
    });

     it('should call get Status UPdates method', () => {
      //ARRANGE:
      spyOn(component, 'getStatusUpdates');
      //ACT:
      component.ngOnInit();
      //ASSERT:
      expect(component.getStatusUpdates).toHaveBeenCalledTimes(1);
    });

     it('should call load Requests method', () => {
      //ARRANGE:
      spyOn(component, 'loadRequests');
      //ACT:
      component.ngOnInit();
      //ASSERT:
      expect(component.loadRequests).toHaveBeenCalledTimes(1);
    });

   });

   describe('getProcurementById', () => {
    it('should call service method with id', () => {
      //ACT:
      component.getProcurementById();
      //ASSERT:
      expect(mockSuppliesService.getProcurementById).toHaveBeenCalledWith(mockID);
    });

    it('should save procurement to class variable', () => {
      //ACT:
      component.getProcurementById();
      //ASSERT:
      expect(component.currentProcurement).toEqual(mockProcurement);
    });
   });

    describe('getStatusUpdates', () => {
      it('should call service method with id', () => {
        //ACT:
        component.getStatusUpdates();
        //ASSERT:
        expect(mockSuppliesService.getStatusUpdates).toHaveBeenCalledWith(mockID);
      });

      it('should save status-updates to class array', () => {
        //ACT:
        component.getStatusUpdates();
        //ASSERT:
        expect(component.statusUpdates).toEqual(mockStatusUpdatesList);
      });
   });


    describe('loadRequests', () => {
      it('should call service method', () => {
        //ACT:
        component.loadRequests();
        //ASSERT:
        expect(mockSuppliesService.getRequestsForUpdateProcurement).toHaveBeenCalledTimes(1);
      });

      it('should save requests to class array', () => {
        //ACT:
        component.loadRequests();
        //ASSERT:
        expect(component.approvedRequestsList).toEqual(mockRequestList);
      });

      it('should call to build request map', () => {
        //ARRANGE:
        spyOn(component, 'buildRequestMap');
        //ACT:
        component.loadRequests();
        //ASSERT:
        expect(component.buildRequestMap).toHaveBeenCalledTimes(1);
      });
   });

   describe('buildRequestMap', () => {
    it('should request map have all requests with id as the key', () => {
      //ARRANGE:
      component.loadRequests();
      //ACT:
      component.buildRequestMap();
      //ASSERT:
      expect(component.requestsMap.size).toBe(mockRequestList.length);
    });

    it('should map each request with correct id', () => {
      //ARRANGE:
      component.loadRequests();
      //ACT:
      component.buildRequestMap();
      //ASSERT:
      //go through each request object in the list
      mockRequestList.forEach((req)=> {
        expect(component.requestsMap.get(req.id)).toEqual(req);
      });

    });
   });

   describe('getRequestById', () => {
    it('should return correct request for the id', () => {
      //ARRANGE:
      component.loadRequests();
      //ACT:
      const result = component.getRequestById(1);
      //ASSERT:
      expect(result.id).toEqual(1);
    });
    it('should return undefined for unknown id', () => {
      //ARRANGE:
      component.loadRequests();
      //ACT:
      const result = component.getRequestById(100);
      //ASSERT:
      expect(result).toBeUndefined();
    });
   });

   describe('deleteProcurement', () => {
    it('should call service method', () => {
      //ACT:
      component.deleteProcurement();
      //ASSERT:
      expect(mockSuppliesService.deleteProcurement).toHaveBeenCalledOnceWith(mockID);
    });

    it('should call snackbar after deletion', () => {
      //ACT:
      component.deleteProcurement();
      //ASSERT:
      expect(mockMatSnackbar.open).toHaveBeenCalledWith('Deleted successfully', 'Close', jasmine.objectContaining({duration: 5000}));
    });


    it('should navigate to list page after deletion', () => {
      //ACT:
      component.deleteProcurement();
      //ASSERT:
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith("/suppliesuser/home/procurement/list");
    });
   });

   describe('ngOnInit loading class variables', ()=> {
    it('should populate all lists and variables', () => {
      //ACT:
      fixture.detectChanges();
      //ASSERT:
      expect(component.currentProcurement).toEqual(mockProcurement);
      expect(component.statusUpdates).toEqual(mockStatusUpdatesList);
      expect(component.approvedRequestsList).toEqual(mockRequestList);
      expect(component.requestsMap.size).toEqual(mockRequestList.length);
    });
   });


   describe('DOM tests to check button visibility', () => {
    describe('when logged user is the assigned employee', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should show the buttons when procurement stage is not completed', () => {
         component.currentProcurement = {...mockProcurement, assignedToUserId: 3, completedDate: null};
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.delete-button')).not.toBeNull();
        expect(fixture.nativeElement.querySelector('.update-details-button')).not.toBeNull();
        expect(fixture.nativeElement.querySelector('.change-status-button')).not.toBeNull();
      });

      it('should NOT show the buttons when procurement stage is completed', () => {
         component.currentProcurement = {...mockProcurement, assignedToUserId: 3, completedDate: '2025-2-23'};
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.delete-button')).toBeNull();
        expect(fixture.nativeElement.querySelector('.update-details-button')).toBeNull();
        expect(fixture.nativeElement.querySelector('.change-status-button')).toBeNull();
      });
    });

    describe('when logged user is NOT the assigned employee ', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should NOT show the buttons even when the stage is not completed', () => {
        component.currentProcurement = {...mockProcurement, assignedToUserId: 2, completedDate: null};
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.delete-button')).toBeNull();
        expect(fixture.nativeElement.querySelector('.update-details-button')).toBeNull();
        expect(fixture.nativeElement.querySelector('.change-status-button')).toBeNull();
      });

       it('should NOT show the buttons when the stage is completed', () => {
        component.currentProcurement = {...mockProcurement, assignedToUserId: 2, completedDate: '2025-3-31'};
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.delete-button')).toBeNull();
        expect(fixture.nativeElement.querySelector('.update-details-button')).toBeNull();
        expect(fixture.nativeElement.querySelector('.change-status-button')).toBeNull();
      });
    });

   });






});
