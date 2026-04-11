import { TestBed } from '@angular/core/testing';

import { ReportServiceService } from './report-service.service';
import { provideHttpClient } from '@angular/common/http';

describe('ReportServiceService', () => {
  let service: ReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient()
      ]
    });
    service = TestBed.inject(ReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
