import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';
import { StorageService } from '../auth/services/storage.service';

describe('UtilService', () => {
  //the class to be tested
  let service: UtilService;

  beforeEach(() => {
    //isolating the class to be tested with TestBed
    TestBed.configureTestingModule({
      //Has a dependency for StorageService - mock value will be created later
      providers:[ UtilService, {provide: StorageService, useValue: {} }]
    });
      //creating the instance of the class with TestBed
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  //formatProcurementStage() - as nested test-suite
  describe('formatProcurementStage', () => {

    it('should return "Not Commenced yet" when PROCUREMENT_PROCESS_NOT_COMMENCED', () =>{
      expect(service.formatProcurementStage('PROCUREMENT_PROCESS_NOT_COMMENCED'))
      .toBe('Not Commenced yet');
    })

      it('should return "In Purchase Process" for PURCHASE_PROCESS_COMMENCED', () => {
      expect(service.formatProcurementStage('PURCHASE_PROCESS_COMMENCED'))
        .toBe('In Purchase Process');
    });

    it('should return "PO Issued" for PURCHASE_ORDERS_ISSUED', () => {
      expect(service.formatProcurementStage('PURCHASE_ORDERS_ISSUED'))
        .toBe('PO Issued');
    });

    it('should return "Goods Received" for GOODS_RECEIVED', () => {
      expect(service.formatProcurementStage('GOODS_RECEIVED'))
        .toBe('Goods Received');
    });

    it('should return "Paid & Completed" for PAID_AND_COMPLETED', () => {
      expect(service.formatProcurementStage('PAID_AND_COMPLETED'))
        .toBe('Paid & Completed');
    });

    //default case
       it('should return "Not defined" for an unknown stage', () => {
      expect(service.formatProcurementStage('SOME_UNKNOWN_STAGE'))
        .toBe('Not defined');
    });

  })

  //formatProcurementStage()
  describe('formatStatus', () => {
    it('should return "PENDING ADMIN" for PENDING_ADMIN_APPROVAL', () => {
      expect(service.formatStatus('PENDING_ADMIN_APPROVAL'))
      .toBe('PENDING ADMIN');
    });

      it('should return "In Purchase Process" for PURCHASE_PROCESS_COMMENCED', () => {
      expect(service.formatProcurementStage('PURCHASE_PROCESS_COMMENCED'))
        .toBe('In Purchase Process');
    });

    it('should return "PO Issued" for PURCHASE_ORDERS_ISSUED', () => {
      expect(service.formatProcurementStage('PURCHASE_ORDERS_ISSUED'))
        .toBe('PO Issued');
    });

    it('should return "Goods Received" for GOODS_RECEIVED', () => {
      expect(service.formatProcurementStage('GOODS_RECEIVED'))
        .toBe('Goods Received');
    });

    it('should return "Paid & Completed" for PAID_AND_COMPLETED', () => {
      expect(service.formatProcurementStage('PAID_AND_COMPLETED'))
        .toBe('Paid & Completed');
    });

   //default -case
    it('should return "Not defined" for an unknown stage', () => {
      expect(service.formatProcurementStage('SOME_UNKNOWN_STAGE'))
        .toBe('Not defined');
    });
  });

  // ─── formatStatus ─────────────────────────────────────────────────────────

  describe('formatStatus', () => {

    it('should return "PENDING ADMIN" for PENDING_ADMIN_APPROVAL', () => {
      expect(service.formatStatus('PENDING_ADMIN_APPROVAL')).toBe('PENDING ADMIN');
    });

    it('should return "X ADMIN" for REJECTED_ADMIN_APPROVAL', () => {
      expect(service.formatStatus('REJECTED_ADMIN_APPROVAL')).toBe('X ADMIN');
    });

    it('should return "Pending SUPPLIES" for PENDING_SUPPLIES_APPROVAL', () => {
      expect(service.formatStatus('PENDING_SUPPLIES_APPROVAL')).toBe('Pending SUPPLIES');
    });

    it('should return "X SUPPLIES" for REJECTED_SUPPLIES_APPROVAL', () => {
      expect(service.formatStatus('REJECTED_SUPPLIES_APPROVAL')).toBe('X SUPPLIES');
    });

    it('should return "✔ SUPPLIES" for PENDING_PROCUREMENT', () => {
      expect(service.formatStatus('PENDING_PROCUREMENT')).toBe('✔ SUPPLIES');
    });

    it('should return "In Procurement" for PROCUREMENT_CREATED', () => {
      expect(service.formatStatus('PROCUREMENT_CREATED')).toBe('In Procurement');
    });

    it('should return "Postponed" for PROCUREMENT_POSTPONED', () => {
      expect(service.formatStatus('PROCUREMENT_POSTPONED')).toBe('Postponed');
    });

    it('should return "Cancelled" for PROCUREMENT_CANCELLED', () => {
      expect(service.formatStatus('PROCUREMENT_CANCELLED')).toBe('Cancelled');
    });

    it('should return "Not defined" for an unknown status', () => {
      expect(service.formatStatus('INVALID_STATUS')).toBe('Not defined');
    });
  });


  //getStatusClass
  describe('getStatusClass', () => {
     it('should return "status-admin-pending" for PENDING_ADMIN_APPROVAL', () => {
      expect(service.getStatusClass('PENDING_ADMIN_APPROVAL')).toBe('status-admin-pending');
    });

    it('should return "status-admin-rejected" for REJECTED_ADMIN_APPROVAL', () => {
      expect(service.getStatusClass('REJECTED_ADMIN_APPROVAL')).toBe('status-admin-rejected');
    });

    it('should return "status-supplies-pending" for PENDING_SUPPLIES_APPROVAL', () => {
      expect(service.getStatusClass('PENDING_SUPPLIES_APPROVAL')).toBe('status-supplies-pending');
    });

    it('should return "status-supplies-rejected" for REJECTED_SUPPLIES_APPROVAL', () => {
      expect(service.getStatusClass('REJECTED_SUPPLIES_APPROVAL')).toBe('status-supplies-rejected');
    });

    it('should return "status-pending-procurement" for PENDING_PROCUREMENT', () => {
      expect(service.getStatusClass('PENDING_PROCUREMENT')).toBe('status-pending-procurement');
    });

    it('should return "status-procurement-created" for PROCUREMENT_CREATED', () => {
      expect(service.getStatusClass('PROCUREMENT_CREATED')).toBe('status-procurement-created');
    });

    it('should return "status-default" for an unknown status', () => {
      expect(service.getStatusClass('UNKNOWN')).toBe('status-default');
    });

  })


  //formatBoolean()

  describe('formatBoolean', () =>{
     it("should return 'Yes' when true", () =>{
    //ACT:
    const result  = service.formatBoolean(true);
    //ASSERT:
    expect(result).toBe('Yes');
    })

   it("should return 'No' when false", () =>{
    //ACT:
    const result  = service.formatBoolean(false);
    //ASSERT:
    expect(result).toBe('No');
    })

  });






describe('getUserInfo', () =>{

  it("should return account & email for SUBDIVUSER", () =>{
    //ARRANGE:
      //creating the mock
      const mockUser = {
        email: 'subdivuser@test.com',
        userRole: 'SUBDIVUSER',
        subdivName: 'Department of Mathematics'
      };

      spyOn(StorageService, 'getUser').and.returnValue(mockUser);

    //ACT:
    const result  = service.getUserInfo();
    //ASSERT:
    expect(result.email).toBe(mockUser.email);
    expect(result.account).toBe(mockUser.subdivName +' User');
  });

   it("should return account & email for ADMINDIVUSER", () =>{
    //ARRANGE:
      //creating the mock
      const mockUser = {
        email: 'admindivuser@test.com',
        userRole: 'ADMINDIVUSER',
        admindivName: 'Faculty of Science'
      };

      spyOn(StorageService, 'getUser').and.returnValue(mockUser);

    //ACT:
    const result  = service.getUserInfo();
    //ASSERT:
    expect(result.email).toBe(mockUser.email);
    expect(result.account).toBe(mockUser.admindivName +' User');
  });

  it("should return account & email for SUPPLIESUSER", () =>{
    //ARRANGE:
      //creating the mock
      const mockUser = {
        email: 'suppliesuser@test.com',
        userRole: 'SUPPLIESUSER'
      };

      spyOn(StorageService, 'getUser').and.returnValue(mockUser);

    //ACT:
    const result  = service.getUserInfo();
    //ASSERT:
    expect(result.email).toBe(mockUser.email);
    expect(result.account).toBe('Supplies User');
  });

   it("should return account & email for ADMIN", () =>{
    //ARRANGE:
      //creating the mock
      const mockUser = {
        email: 'adminuser@test.com',
        userRole: 'ADMIN'
      };

      spyOn(StorageService, 'getUser').and.returnValue(mockUser);

    //ACT:
    const result  = service.getUserInfo();
    //ASSERT:
    expect(result.email).toBe(mockUser.email);
    expect(result.account).toBe('Admin User');
  });


 });


 describe('gotDotClass', () => {


    //using a data-driven loop
    const cases: [string, string][] = [
      ['REQUEST_SUBMITTED',            'dot-yellow'],
      ['REQUEST_APPROVED_BY_ADMIN',    'dot-green'],
      ['REQUEST_REJECTED_BY_ADMIN',    'dot-red'],
      ['REQUEST_APPROVED_BY_SUPPLIES', 'dot-green'],
      ['REQUEST_REJECTED_BY_SUPPLIES', 'dot-red'],
      ['PROCUREMENT_CREATED',          'dot-blue'],
      ['PROCUREMENT_STATUS_UPDATE',    'dot-purple']
    ];


    cases.forEach(([type, expectedClass]) => {
      it(`should return "${expectedClass}" for ${type}` , () =>{
        //ACT & ASSERT:
        expect(service.getDotClass(type)).toBe(expectedClass);
      });
    });

    //for other inputs
    it('should return "hot-gray" for other', () => {
      expect(service.getDotClass('Other')).toBe('dot-gray');
    });

 });


 describe('getToastIcon', () => {
  //using a data-driven loop
    const cases: [string, string][] = [
       ['success', 'check_circle'],
      ['error' , 'error'],
      ['warning', 'warning'],
      ['info'  , 'info']
    ];


    cases.forEach(([status, expectedIcon]) => {
      it(`should return "${expectedIcon}" for ${status}` , () =>{
        //ACT & ASSERT:
        expect(service.getToastIcon(status)).toBe(expectedIcon);
      });
    });

    //for other inputs
    it('should return "info" for other', () => {
      expect(service.getToastIcon('Other')).toBe('info');
    });
 })



});
