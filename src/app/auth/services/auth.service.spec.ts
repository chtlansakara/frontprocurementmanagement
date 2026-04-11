import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController }
  from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock : HttpTestingController;


  beforeEach(() => {
    //uses HttpClient Dependency
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    //http dependency
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //verifying no more http calls after each
  afterEach(() =>{
    httpMock.verify();
  });

  describe('signup', () => {

    it('should send a POST request to signup', () => {
      //ARRANGE:
      const mockRequest = {
        name: 'cht',
        userrole: 'SUPPLIESUSER',
        designationId: 1,
        subdivId: 1,
        email: 'cht@test.com',
        password: 'cht'
      };
      const mockResponse = {
        id: 2,
        name: 'cht',
        userRole: 'SUPPLIESUSER',
        designationId: 1,
        subdivId: 1,
        email: 'cht@test.com',
      };

      const signupURL = `${environment.API_URL}api/auth/signup`;

      //ACT & ASSERT:
      service.signup(mockRequest).subscribe({
        next: response => {
        expect(response).toEqual(mockResponse);
        },
        error: () => {
          fail("Expected a successs response, not an error");
        }

      });

      //intercept http call & catch the request with relevant endpoint
      const request = httpMock.expectOne(signupURL);
      // check request first:
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(mockRequest);
      //set up returned mock data for the request
      request.flush(mockResponse);
    });


     it('should send an error when signup is unsuccessful', () => {
      //ARRANGE:
      const mockRequest = {
        name: 'cht',
        userrole: 'SUPPLIESUSER',
        designationId: 1,
        subdivId: 1,
        email: 'cht@test.com',
        password: 'cht'
      };

      const signupURL = `${environment.API_URL}api/auth/signup`;

      //ACT & ASSERT:
      //setup to fail
      service.signup(mockRequest).subscribe({
        next: () => {
          fail("Expected an error, not a success response");
        },
        error: error => {
        expect(error.status).toBe(400);
        }
      });

      //intercept http call & catch the request with relevant endpoint
      const request = httpMock.expectOne(signupURL);
      // check request first:
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(mockRequest);
      //set up return
      request.flush('Bad Request', {status: 400, statusText: 'Bad Request'});
    });

  });

  describe('login', () => {

    it('should send a POST request to login', () => {
      //ARRANGE:
      const mockLoginRequest = {
        email: 'cht@test.com',
        password: 'cht'
      };
      const mockLoginResponse = {
        id: 2,
        jwt: 'eeieiieieieie292929',
        name: 'cht',
        userRole: 'SUPPLIESUSER',
        subdivName: 'Supplies Division',
        email: 'cht@test.com',
      };

      const loginURL = `${environment.API_URL}api/auth/login`;

      //ACT & ASSERT:
      service.login(mockLoginRequest).subscribe({
        next: response => {
        expect(response).toEqual(mockLoginResponse);
        },
        error: () => {
          fail("Expected a successs response, not an error");
        }
      });

      //intercept http call & catch the request with relevant endpoint
      const request = httpMock.expectOne(loginURL);
      // check request first:
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(mockLoginRequest);
      //set up returned mock data for the request
      request.flush(mockLoginResponse);
    });


      it('should send an error when signup is unsuccessful', () => {
      //ARRANGE:
      const mockLoginRequest = {
        email: 'cht@test.com',
        password: 'cht'
      };

      const loginURL = `${environment.API_URL}api/auth/login`;

      //ACT & ASSERT:

      service.login(mockLoginRequest).subscribe({
        next: () => {
          //setup to fail
          fail("Expected an error, not a success response");
        },
        error: error => {
        //assert the error
        expect(error.status).toBe(400);
        }
      });

      //intercept http call & catch the request with relevant endpoint
      const request = httpMock.expectOne(loginURL);
      // check request first:
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(mockLoginRequest);
      //set up return
      request.flush('Bad Request', {status: 400, statusText: 'Bad Request'});
    });


  });


  describe('isLoggedIn', () => {

    it('should return true when token exists', () =>{

      //mock Token
      const mockToken = 'e99393030dldll2020';

      //mock StorageService.getToken() method call
      spyOn(StorageService, 'getToken').and
        .returnValue(mockToken);

      //ACT & ASSERT:
      expect(service.isLoggedIn()).toBeTrue();

    });

     it("should return false when token doesn't exist", () =>{
        //mock StorageService.getToken() method call
      spyOn(StorageService, 'getToken').and.returnValue('');

      //ACT & ASSERT:
      expect(service.isLoggedIn()).toBeFalse();
    });


  });




});
