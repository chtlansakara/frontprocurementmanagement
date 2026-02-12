import { TestBed } from '@angular/core/testing';

import { AdmindivService } from './admindiv.service';

describe('AdmindivService', () => {
  let service: AdmindivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmindivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
