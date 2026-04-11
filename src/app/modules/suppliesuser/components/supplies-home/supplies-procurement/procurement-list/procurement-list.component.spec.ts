import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementListComponent } from './procurement-list.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
//has to import this to avoid 'matMenu' not found error
import { MatMenuModule } from '@angular/material/menu';
import { ProcurementResponseDto } from '../../../../../../interfaces/ProcurementResponseDto';
import { SuppliesService } from '../../../../services/supplies.service';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { provideRouter, Router } from '@angular/router';

const procurement1 : ProcurementResponseDto = {
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


const procurement2 : ProcurementResponseDto = {
    id: 2,
    name: 'Office Chairs',
    requestTitle: 'Furniture',
    requestAdmindivCode: 'ADM02',
    requestAdmindivName: 'Logistics',
    requestSubdivCodeList: ['SUB03'],
    requestEstimation: '10000',
    quantity: 20,
    estimatedAmount: 200000,
    procurementStage: 'GOODS_RECEIVED',
    statusName: 'Pending',
    commencedDate: '2025-03-01',
    completedDate: null,
    category: 'Furniture',
    sourceName: 'Foreign',
    method: 'Direct',
    authorityLevel: 'Level 2',
    priorityStatus: 'Medium',
    scheduledCommenceDate: '2025-04-01',
    expectedCompletionDate: '2025-08-01',
    vendorName: 'Furniture Co',
    vendorRegisteredDate: '2019-05-01',
    vendorComments: '',
    assignedToUserEmail: 'user@example.com',
    assignedToUserDesignation: 'Officer',
    remarks: '',
    donorName: '',
    createdOn: '2025-03-01',
    emailCreatedBy: 'admin@example.com',
    designationCreatedBy: 'Admin',
  } as ProcurementResponseDto;

const mockProcurementList: ProcurementResponseDto[] = [procurement1, procurement2];

const mockStagesList = [
  {id: 1, name: 'PROCUREMENT_PROCESS_NOT_COMMENCED'},
  {id: 2, name: 'PURCHASE_PROCESS_COMMENCED'},
  {id: 3, name: 'PURCHASE_ORDERS_ISSUED'},
  {id: 4, name: 'GOODS_RECEIVED'},
  {id: 5, name: 'PAID_AND_COMPLETED'},
];

const mockRequestList = [
  {id: 1, title: 'Request A', subdivIdLIst: [1,2]},
  {id: 2, title: 'Request B', subdivIdLIst: [2]},
];



fdescribe('ProcurementListComponent', () => {
  let component: ProcurementListComponent;
  let fixture: ComponentFixture<ProcurementListComponent>;

  //dependencies as spies
  let mockSuppliesService : jasmine.SpyObj<SuppliesService>;
  //depencies as instances
  let router : Router;

  beforeEach(async () => {
    //spy object for supplies service mock
    mockSuppliesService = jasmine.createSpyObj('Supplies Service',[
      'getAllProcurement',
      'getStages',
      'getRequestsForUpdateProcurement'
    ]);

    //setup return values for method calls of suppliesService mock
    mockSuppliesService.getAllProcurement.and.returnValue(of(mockProcurementList));
     mockSuppliesService.getStages.and.returnValue(of(mockStagesList));
     mockSuppliesService.getRequestsForUpdateProcurement.and.returnValue(of(mockRequestList));


    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ProcurementListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {provide: SuppliesService, useValue: mockSuppliesService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    //router instance
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(ProcurementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });






  //takes place without calling any method of the component
  describe('initialization of component', () =>{

    it('should create', () => {
    expect(component).toBeTruthy();
    });

    it('should call lists of procurement, stages, & requests', () => {
      expect(mockSuppliesService.getAllProcurement).toHaveBeenCalledTimes(1);
      expect(mockSuppliesService.getStages).toHaveBeenCalledTimes(1);
      expect(mockSuppliesService.getRequestsForUpdateProcurement).toHaveBeenCalledTimes(1);
    });


    it('should have defined MatTable datasource', () => {
      expect(component.datasource).toBeInstanceOf(MatTableDataSource);
    });

     it('should register custome filterPredicate for datasource', () => {
      //verify the filterPredicate function was overridden
      expect(typeof component.datasource.filterPredicate).toBe('function');
    });

  });


  describe('loadList', ()=> {
    it('should populate the class procurement list', () => {
      expect(component.procurementList.length).toBe(2);
      expect(component.procurementList[0].name).toBe(procurement1.name);
    });

    it('should set datasource.data', () => {
      expect(component.datasource.data).toEqual(mockProcurementList);
    });
  });




  describe('loadStatusList', () => {
    it('should populate the class stages list', () => {
      expect(component.stagesList.length).toBe(mockStagesList.length);
      expect(component.stagesList[0].name).toBe(mockStagesList[0].name);
    });
  });

  describe('loadRequests', ()=> {
      it('should populate the class requests list', () => {
        expect(component.approvedRequestsList.length).toBe(mockRequestList.length);
        expect(component.approvedRequestsList[0].title).toBe(mockRequestList[0].title);
      });

      it('should build request map', () => {
        expect(component.requestsMap.size).toBe(mockRequestList.length);
        expect(component.requestsMap.get(2)).toEqual(mockRequestList[1]);
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


  describe('filter predicate functionality', () => {
    //ARRANGE: create a function to trigger the filter predicate setup in the component
    function applyPredicate(data: ProcurementResponseDto, text: string, stage: string): boolean{
      return component.datasource.filterPredicate(data, JSON.stringify({text, procurementStage: stage})
      );
    }

     it('should match when text & stage filters are empty', () => {
      expect(applyPredicate(mockProcurementList[0], '', '')).toBeTrue();
    });

    it('should match when procurement name in text filter', () => {
      expect(applyPredicate(mockProcurementList[0], 'laptop', '')).toBeTrue();
    });

    it('should be case-insensitive & match when procurement name in text filter', () => {
      expect(applyPredicate(mockProcurementList[0], 'LAPTOP', '')).toBeTrue();
    });

    it('should NOT match when text in text filter does not match', () => {
      expect(applyPredicate(mockProcurementList[0], 'laptops', '')).toBeFalse();
    });

    it('should match when stage filter match', () => {
      expect(applyPredicate(mockProcurementList[0], '', 'PROCUREMENT_PROCESS_NOT_COMMENCED')).toBeTrue();
    });

    it('should NOT match when stage filter does not match', () => {
      expect(applyPredicate(mockProcurementList[0], 'laptops', 'PAID_AND_COMPLETED')).toBeFalse();
    });

  });

  describe('applyFilter', () => {
    it('should update text filter and apply combined filter', () => {
      //ARRANGE:
      spyOn(component, 'applyCombinedFilter');
      //create event to trigger the applyFilter() method
      const event = {target: {value:' Laptop '}}as unknown as Event;
      //ACT:
      component.applyFilter(event);
      //ASSERT:
      expect(component.searchFilter).toBe('laptop');
      expect(component.applyCombinedFilter).toHaveBeenCalled();
    })
  });

   describe('applyStatusFilter', () => {
    it('should update status filter and apply combined filter', () => {
      //ARRANGE:
      spyOn(component, 'applyCombinedFilter');
      //ACT:
      component.applyStatusFilter('PROCUREMENT_PROCESS_NOT_COMMENCED');
      //ASSERT:
      expect(component.statusFilter).toBe('PROCUREMENT_PROCESS_NOT_COMMENCED');
      expect(component.applyCombinedFilter).toHaveBeenCalled();
    })
  });

  describe('applyCombinedFilter', () => {
    it('should serialize both text filter & stage filter as JSON', () => {
      //ARRANGE:
      component.searchFilter = 'laptop';
      component.statusFilter = 'PROCUREMENT_PROCESS_NOT_COMMENCED';
      //ACT:
      component.applyCombinedFilter();
      //ASSERT:
      const resultParsed = JSON.parse(component.datasource.filter);
      expect(resultParsed.text).toBe('laptop');
      expect(resultParsed.procurementStage).toBe('PROCUREMENT_PROCESS_NOT_COMMENCED');
    });

    it('should reset paiginator to first page', () => {
      //paginator can be null so need to guard
      if(component.datasource.paginator){
        spyOn(component.datasource.paginator, 'firstPage');
        //ACT:
        component.applyCombinedFilter();
        //ASSERT:
        expect(component.datasource.paginator.firstPage).toHaveBeenCalled();
      }else{
        //no error thrown when paginator is not rendered
        expect(()=> component.applyCombinedFilter()).not.toThrow();
      }
    });
  });

  describe('ViewProcurement', () => {
    it('should navigate to view procurement page with router', () => {
      //ACT:
      spyOn(router, 'navigateByUrl');
      component.ViewProcurement(mockProcurementList[1]);
      //ASSERT:
      expect(router.navigateByUrl).toHaveBeenCalledWith("/suppliesuser/home/procurement/view/"+mockProcurementList[1].id);
    });
  });


  describe('Export methods', () => {
    it('exportToExcel called when selected', () => {
      //ARRANGE:
      spyOn(component, 'exportToExcel');
      //ACT:
      component.executeExportExcel();
      //ASSERT:
      expect(component.exportToExcel).toHaveBeenCalledWith('procurement-table', 'procurement');
    });

    it('exportToExcel should not throw when table id is not found', () => {
      expect(() => component.exportToExcel('nosuch-tableId')).not.toThrow();
    });

     it('exportToCSV called when selected', () => {
      //ARRANGE:
      spyOn(component, 'exportToCsv');
      //ACT:
      component.executeExportCSV();
      //ASSERT:
      expect(component.exportToCsv).toHaveBeenCalledWith('procurement-table', 'procurement');
    });

    it('exportToCsv should not throw when table id is not found', () => {
      expect(() => component.exportToCsv('nosuch-tableId')).not.toThrow();
    });


  });



});
