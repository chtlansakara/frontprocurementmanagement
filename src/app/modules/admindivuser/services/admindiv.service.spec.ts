import { TestBed } from '@angular/core/testing';

import { AdmindivService } from './admindiv.service';
import { provideHttpClient } from '@angular/common/http';

describe('AdmindivService', () => {
  let service: AdmindivService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AdmindivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
