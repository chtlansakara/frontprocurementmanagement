import { TestBed } from '@angular/core/testing';

import { SubdivService } from '../services/subdiv.service';
import { provideHttpClient } from '@angular/common/http';

describe('SubdivService', () => {
  let service: SubdivService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(SubdivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
