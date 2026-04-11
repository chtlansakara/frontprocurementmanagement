import { TestBed } from '@angular/core/testing';

import { SuppliesService } from './supplies.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { ProcurementCreateDto } from '../../../interfaces/ProcurementCreateDto';
import { ProcurementChangeStatusDto } from '../../../interfaces/ProcurementChangeStatusDto';
import { ApprovalDto } from '../../../interfaces/ApprovalDto';
import { CommentDto } from '../../../interfaces/CommentDto';
import { RequestDto } from '../../../interfaces/RequestDto';

describe('SuppliesService', () => {
  let service: SuppliesService;
  let httpMock: HttpTestingController;
  //reused URL
  const suppliesURL = environment.API_URL + environment.URL_SUPPLIESUSER ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    //creating instances
    service = TestBed.inject(SuppliesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() =>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //getAllProcurement()===================================================================
  describe('getAllProcurement', () => {
    const getAllProcurementURL = suppliesURL + 'procurement';

    it('should send a GET request to get all procurement', () => {
      //ARRANGE:
       const procurement1 = {
        id: 2,
        name: 'Keyboards',
        quantity: 10,
        requestId: 1,
      };
      const procurement2 = {
        id: 4,
        name: 'Monitors',
        quantity: 2,
        requestId: 3,
      };
       const mockResponse  = [procurement1, procurement2];

      //ACT & ASSERT:
      service.getAllProcurement().subscribe( {
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
           fail("Expected a successs response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAllProcurementURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);

    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getAllProcurement().subscribe( {
        next: () => {
          fail("Expected an error, not a success response")
        },
        error: (error) => {
           expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAllProcurementURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request',{status: 400, statusText: 'Bad Request'});

    });


  });

  //getAuditLog()===================================================================
  describe('getAuditLog', () => {
    const getAuditLogURL = suppliesURL + 'procurement/auditLog';

    it('should send a GET request to get audit log', () => {
      //ARRANGE:
       const auditLog1 = {
        id: 2,
        description: 'Keyboards',
        date: "2025/2/21",
        entityId: 1,
      };
      const auditLog2 = {
        id: 4,
        description: 'Monitors',
        date: "2023/3/22",
        entityId: 3,
      };
       const mockResponse  = [auditLog1, auditLog2];

      //ACT & ASSERT:
      service.getAuditLog().subscribe( {
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
           fail("Expected a successs response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAuditLogURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);

    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getAuditLog().subscribe( {
        next: () => {
          fail("Expected an error, not a success response")
        },
        error: (error) => {
           expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAuditLogURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request',{status: 400, statusText: 'Bad Request'});

    });


  });

  //getProcurementById()===================================================================
  describe('getProcurementById', () => {
    const id = 2;
    const getProcurementByIdURL = suppliesURL + 'procurement/'+ id;

    it('should send a GET request to get procurement by id', () => {
      //ARRANGE:
       const procurement = {
        id: 2,
        name: 'Keyboards',
        quantity: 10,
        requestId: 1,
      };

       const mockResponse  = procurement;

      //ACT & ASSERT:
      service.getProcurementById(id).subscribe( {
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
           fail("Expected a successs response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getProcurementByIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);

    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getProcurementById(id).subscribe( {
        next: () => {
          fail("Expected an error, not a success response")
        },
        error: (error) => {
           expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getProcurementByIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request',{status: 400, statusText: 'Bad Request'});

    });


  });


  //createProcurement()===================================================================
  describe('createProcurement', () => {
    const createProcurementURL = suppliesURL + 'procurement';
    let procurementDto: ProcurementCreateDto;

    beforeEach(() =>{
         //ARRANGE:
      procurementDto = {
        name: 'Keyboards',
        quantity: 10,
        requestId: 1,
      } as ProcurementCreateDto;
    });

    it('should send a POST request to create a procurement', () => {
      //ARRANGE:
       const procurement = {
        id: 2,
        name: 'Keyboards',
        quantity: 10,
        requestId: 1,
      };

       const mockResponse  = procurement;

      //ACT & ASSERT:
      service.createProcurement(procurementDto).subscribe( {
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
           fail("Expected a successs response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(createProcurementURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(procurementDto);
      //mock response
      req.flush(mockResponse);

    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.createProcurement(procurementDto).subscribe( {
        next: () => {
          fail("Expected an error, not a success response")
        },
        error: (error) => {
           expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(createProcurementURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(procurementDto);
      //mock response
      req.flush('Bad request',{status: 400, statusText: 'Bad Request'});

    });


  });

  //updateProcurement()===================================================================
  describe('updateProcurement', () => {
    const id = 2;
    const updateProcurementURL = suppliesURL + 'procurement/'+id;
    let procurementDto: ProcurementCreateDto;


    beforeEach(() =>{
         //ARRANGE:
      procurementDto = {
        name: 'Keyboards',
        quantity: 10,
        requestId: 1,
      } as ProcurementCreateDto;
    });

    it('should send a PUT request to update procurement', () => {
      //ARRANGE:
       const procurement = {
        id: 2,
        name: 'Keyboards',
        quantity: 10,
        requestId: 1,
      };

       const mockResponse  = procurement;

      //ACT & ASSERT:
      service.updateProcurement(id, procurementDto).subscribe( {
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
           fail("Expected a successs response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(updateProcurementURL);
      //check request caught
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(procurementDto);
      //mock response
      req.flush(mockResponse);

    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.updateProcurement(id, procurementDto).subscribe( {
        next: () => {
          fail("Expected an error, not a success response")
        },
        error: (error) => {
           expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(updateProcurementURL);
      //check request caught
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(procurementDto);
      //mock response
      req.flush('Bad request',{status: 400, statusText: 'Bad Request'});

    });


  });


  //deleteProcurement()===================================================================
  describe('deleteProcurement', () => {
    const id = 2;
    const deleteProcurementURL = suppliesURL + 'procurement/'+ id;

    it('should send a DELETE request to delete procurement', () => {

      //ACT & ASSERT:
      service.deleteProcurement(id).subscribe( {
        next: (response) => {
          expect(response).toBeNull();
        },
        error: () => {
           fail("Expected a successs response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(deleteProcurementURL);
      //check request caught
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(null);

    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.deleteProcurement(id).subscribe( {
        next: () => {
          fail("Expected an error, not a success response")
        },
        error: (error) => {
           expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(deleteProcurementURL);
      //check request caught
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request',{status: 400, statusText: 'Bad Request'});

    });


  });

  //_______________________________________________________________________________________

 //getProcurementStatus()===================================================================
  describe('getProcurementStatus', () => {
    const getProcurementStatusURL = suppliesURL + 'procurement-status';

    it('should send a GET request to get procurement status', () => {
      //ARRANGE:
      const status1 = { id: 1, name: 'Pending' };
      const status2 = { id: 2, name: 'Approved' };
      const mockResponse = [status1, status2];

      //ACT & ASSERT:
      service.getProcurementStatus().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getProcurementStatusURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getProcurementStatus().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getProcurementStatusURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getVendors()===================================================================
  describe('getVendors', () => {
    const getVendorsURL = suppliesURL + 'procurement-vendors';

    it('should send a GET request to get vendors', () => {
      //ARRANGE:
      const vendor1 = { id: 1, name: 'Vendor A' };
      const vendor2 = { id: 2, name: 'Vendor B' };
      const mockResponse = [vendor1, vendor2];

      //ACT & ASSERT:
      service.getVendors().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getVendorsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getVendors().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getVendorsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getSources()===================================================================
  describe('getSources', () => {
    const getSourcesURL = suppliesURL + 'procurement-sources';

    it('should send a GET request to get sources', () => {
      //ARRANGE:
      const source1 = { id: 1, name: 'Source A' };
      const source2 = { id: 2, name: 'Source B' };
      const mockResponse = [source1, source2];

      //ACT & ASSERT:
      service.getSources().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSourcesURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getSources().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSourcesURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getStages()===================================================================
  describe('getStages', () => {
    const getStagesURL = suppliesURL + 'procurement-stages';

    it('should send a GET request to get stages', () => {
      //ARRANGE:
      const stage1 = { id: 1, name: 'Stage A' };
      const stage2 = { id: 2, name: 'Stage B' };
      const mockResponse = [stage1, stage2];

      //ACT & ASSERT:
      service.getStages().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getStagesURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getStages().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getStagesURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getProcurementUsers()===================================================================
  describe('getProcurementUsers', () => {
    const getProcurementUsersURL = suppliesURL + 'procurement-users';

    it('should send a GET request to get procurement users', () => {
      //ARRANGE:
      const user1 = { id: 1, name: 'John Doe' };
      const user2 = { id: 2, name: 'Jane Doe' };
      const mockResponse = [user1, user2];

      //ACT & ASSERT:
      service.getProcurementUsers().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getProcurementUsersURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getProcurementUsers().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getProcurementUsersURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //updateStatus()===================================================================
  describe('updateStatus', () => {
    const id = 2;
    const updateStatusURL = suppliesURL + 'procurement/status/' + id;
    let changeStatusDto: ProcurementChangeStatusDto;

    beforeEach(() => {
      //ARRANGE:
      changeStatusDto = {
        statusId: 3,
        remarks: 'Approved by admin',
      } as ProcurementChangeStatusDto;
    });

    it('should send a PUT request to update procurement status', () => {
      //ARRANGE:
      const mockResponse = { id: 2, statusId: 3 };

      //ACT & ASSERT:
      service.updateStatus(id, changeStatusDto).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(updateStatusURL);
      //check request caught
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(changeStatusDto);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.updateStatus(id, changeStatusDto).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(updateStatusURL);
      //check request caught
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(changeStatusDto);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getStatusUpdates()===================================================================
  describe('getStatusUpdates', () => {
    const id = 2;
    const getStatusUpdatesURL = suppliesURL + 'procurement/status/' + id;

    it('should send a GET request to get status updates', () => {
      //ARRANGE:
      const update1 = { id: 1, statusId: 2, comment: 'Under review' };
      const update2 = { id: 2, statusId: 3, comment: 'Approved' };
      const mockResponse = [update1, update2];

      //ACT & ASSERT:
      service.getStatusUpdates(id).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getStatusUpdatesURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getStatusUpdates(id).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getStatusUpdatesURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getRequestsForUpdateProcurement()===================================================================
  describe('getRequestsForUpdateProcurement', () => {
    const getRequestsForUpdateProcurementURL = suppliesURL + 'procurement/requests';

    it('should send a GET request to get requests for update procurement', () => {
      //ARRANGE:
      const request1 = { id: 1, name: 'Request A' };
      const request2 = { id: 2, name: 'Request B' };
      const mockResponse = [request1, request2];

      //ACT & ASSERT:
      service.getRequestsForUpdateProcurement().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getRequestsForUpdateProcurementURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getRequestsForUpdateProcurement().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getRequestsForUpdateProcurementURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });



  //Requests ------------------------------------------------------------------------
  //getSubdivsByAdmindivId()===================================================================
  describe('getSubdivsByAdmindivId', () => {
    const id = 2;
    const getSubdivsByAdmindivIdURL = suppliesURL + 'subdivs/admindiv/' + id;

    it('should send a GET request to get subdivs by admindiv id', () => {
      //ARRANGE:
      const subdiv1 = { id: 1, name: 'Subdiv A' };
      const subdiv2 = { id: 2, name: 'Subdiv B' };
      const mockResponse = [subdiv1, subdiv2];

      //ACT & ASSERT:
      service.getSubdivsByAdmindivId(id).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSubdivsByAdmindivIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getSubdivsByAdmindivId(id).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSubdivsByAdmindivIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getSubdivs()===================================================================
  describe('getSubdivs', () => {
    const getSubdivsURL = suppliesURL + 'subdivs';

    it('should send a GET request to get all subdivs', () => {
      //ARRANGE:
      const subdiv1 = { id: 1, name: 'Subdiv A' };
      const subdiv2 = { id: 2, name: 'Subdiv B' };
      const mockResponse = [subdiv1, subdiv2];

      //ACT & ASSERT:
      service.getSubdivs().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSubdivsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getSubdivs().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSubdivsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getAdmindivs()===================================================================
  describe('getAdmindivs', () => {
    const getAdmindivsURL = suppliesURL + 'admindivs';

    it('should send a GET request to get all admindivs', () => {
      //ARRANGE:
      const admindiv1 = { id: 1, name: 'Admindiv A' };
      const admindiv2 = { id: 2, name: 'Admindiv B' };
      const mockResponse = [admindiv1, admindiv2];

      //ACT & ASSERT:
      service.getAdmindivs().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAdmindivsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getAdmindivs().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAdmindivsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getGroupedSubdivList()===================================================================
  describe('getGroupedSubdivList', () => {
    const getGroupedSubdivListURL = suppliesURL + 'grouped-subdivs';

    it('should send a GET request to get grouped subdiv list', () => {
      //ARRANGE:
      const group1 = { admindivId: 1, admindivName: 'Admindiv A', subdivs: [{ id: 1, name: 'Subdiv A' }] };
      const group2 = { admindivId: 2, admindivName: 'Admindiv B', subdivs: [{ id: 2, name: 'Subdiv B' }] };
      const mockResponse = [group1, group2];

      //ACT & ASSERT:
      service.getGroupedSubdivList().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getGroupedSubdivListURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getGroupedSubdivList().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getGroupedSubdivListURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getAllRequests()===================================================================
  describe('getAllRequests', () => {
    const getAllRequestsURL = suppliesURL + 'requests';

    it('should send a GET request to get all requests', () => {
      //ARRANGE:
      const request1 = { id: 1, name: 'Request A' };
      const request2 = { id: 2, name: 'Request B' };
      const mockResponse = [request1, request2];

      //ACT & ASSERT:
      service.getAllRequests().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAllRequestsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getAllRequests().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getAllRequestsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getPendingRequests()===================================================================
  describe('getPendingRequests', () => {
    const getPendingRequestsURL = suppliesURL + 'requests/review';

    it('should send a GET request to get pending requests', () => {
      //ARRANGE:
      const request1 = { id: 1, name: 'Request A' };
      const request2 = { id: 2, name: 'Request B' };
      const mockResponse = [request1, request2];

      //ACT & ASSERT:
      service.getPendingRequests().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getPendingRequestsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getPendingRequests().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getPendingRequestsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getRequestById()===================================================================
  describe('getRequestById', () => {
    const id = 2;
    const getRequestByIdURL = suppliesURL + 'requests/' + id;

    it('should send a GET request to get request by id', () => {
      //ARRANGE:
      const mockResponse = { id: 2, name: 'Request A' };

      //ACT & ASSERT:
      service.getRequestById(id).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getRequestByIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getRequestById(id).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getRequestByIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getCommentsByRequestId()===================================================================
  describe('getCommentsByRequestId', () => {
    const id = 2;
    const getCommentsByRequestIdURL = suppliesURL + 'requests/comments/' + id;

    it('should send a GET request to get comments by request id', () => {
      //ARRANGE:
      const comment1 = { id: 1, comment: 'Comment A' };
      const comment2 = { id: 2, comment: 'Comment B' };
      const mockResponse = [comment1, comment2];

      //ACT & ASSERT:
      service.getCommentsByRequestId(id).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getCommentsByRequestIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getCommentsByRequestId(id).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getCommentsByRequestIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getApprovalsByRequestId()===================================================================
  describe('getApprovalsByRequestId', () => {
    const id = 2;
    const getApprovalsByRequestIdURL = suppliesURL + 'requests/approvals/' + id;

    it('should send a GET request to get approvals by request id', () => {
      //ARRANGE:
      const approval1 = { id: 1, approved: true };
      const approval2 = { id: 2, approved: false };
      const mockResponse = [approval1, approval2];

      //ACT & ASSERT:
      service.getApprovalsByRequestId(id).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getApprovalsByRequestIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getApprovalsByRequestId(id).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getApprovalsByRequestIdURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //deleteRequestById()===================================================================
  describe('deleteRequestById', () => {
    const id = 2;
    const deleteRequestByIdURL = suppliesURL + 'requests/' + id;

    it('should send a DELETE request to delete request by id', () => {

      //ACT & ASSERT:
      service.deleteRequestById(id).subscribe({
        next: (response) => {
          expect(response).toBeNull();
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(deleteRequestByIdURL);
      //check request caught
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(null);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.deleteRequestById(id).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(deleteRequestByIdURL);
      //check request caught
      expect(req.request.method).toBe('DELETE');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //approveRequestCreateApproval()===================================================================
  describe('approveRequestCreateApproval', () => {
    const id = 2;
    const approveRequestURL = suppliesURL + 'requests/approve/' + id;
    let approvalDto: ApprovalDto;

    beforeEach(() => {
      //ARRANGE:
      approvalDto = {
        comment: 'Approved',
      } as ApprovalDto;
    });

    it('should send a POST request to approve a request', () => {
      //ARRANGE:
      const mockResponse = { id: 1, approved: true, comment: 'Approved' };

      //ACT & ASSERT:
      service.approveRequestCreateApproval(id, approvalDto).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(approveRequestURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(approvalDto);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.approveRequestCreateApproval(id, approvalDto).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(approveRequestURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(approvalDto);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //rejectRequestCreateComment()===================================================================
  describe('rejectRequestCreateComment', () => {
    const id = 2;
    const rejectRequestURL = suppliesURL + 'requests/reject/' + id;
    let commentDto: CommentDto;

    beforeEach(() => {
      //ARRANGE:
      commentDto = {
        content: 'Rejected due to budget',
      } as CommentDto;
    });

    it('should send a POST request to reject a request', () => {
      //ARRANGE:
      const mockResponse = { id: 1, comment: 'Rejected due to budget' };

      //ACT & ASSERT:
      service.rejectRequestCreateComment(id, commentDto).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(rejectRequestURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(commentDto);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.rejectRequestCreateComment(id, commentDto).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(rejectRequestURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(commentDto);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getSubdivList()===================================================================
  describe('getSubdivList', () => {
    const getSubdivListURL = suppliesURL + 'subdivs';

    it('should send a GET request to get subdiv list', () => {
      //ARRANGE:
      const subdiv1 = { id: 1, name: 'Subdiv A' };
      const subdiv2 = { id: 2, name: 'Subdiv B' };
      const mockResponse = [subdiv1, subdiv2];

      //ACT & ASSERT:
      service.getSubdivList().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSubdivListURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getSubdivList().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getSubdivListURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //createRequest()===================================================================
  describe('createRequest', () => {
    const createRequestURL = suppliesURL + 'requests';
    let requestDto: RequestDto;

    beforeEach(() => {
      //ARRANGE:
      requestDto = {
        title: 'Request A',
        subdivIdList: [1],
      } as RequestDto;
    });

    it('should send a POST request to create a request', () => {
      //ARRANGE:
      const mockResponse = { id: 1, title: 'Request A', subdivId: 1 };

      //ACT & ASSERT:
      service.createRequest(requestDto).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(createRequestURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(requestDto);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.createRequest(requestDto).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(createRequestURL);
      //check request caught
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(requestDto);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //updateRequest()===================================================================
  describe('updateRequest', () => {
    const id = 2;
    const updateRequestURL = suppliesURL + 'requests/' + id;
    let requestDto: RequestDto;

    beforeEach(() => {
      //ARRANGE:
      requestDto = {
        title: 'Updated Request A',
        subdivIdList: [1],
      } as RequestDto;
    });

    it('should send a PUT request to update a request', () => {
      //ARRANGE:
      const mockResponse = { id: 2, title: 'Updated Request A', subdivId: 1 };

      //ACT & ASSERT:
      service.updateRequest(id, requestDto).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(updateRequestURL);
      //check request caught
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(requestDto);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.updateRequest(id, requestDto).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(updateRequestURL);
      //check request caught
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(requestDto);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });


  //getApprovedRequests()===================================================================
  describe('getApprovedRequests', () => {
    const getApprovedRequestsURL = suppliesURL + 'requests/approved';

    it('should send a GET request to get approved requests', () => {
      //ARRANGE:
      const request1 = { id: 1, name: 'Request A' };
      const request2 = { id: 2, name: 'Request B' };
      const mockResponse = [request1, request2];

      //ACT & ASSERT:
      service.getApprovedRequests().subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a success response, not an error");
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getApprovedRequestsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush(mockResponse);
    });

    it('should send error status when unsuccessful', () => {

      //ACT & ASSERT:
      service.getApprovedRequests().subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      //SETUP HTTP CALL MOCK:
      const req = httpMock.expectOne(getApprovedRequestsURL);
      //check request caught
      expect(req.request.method).toBe('GET');
      expect(req.request.body).toEqual(null);
      //mock response
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

});
