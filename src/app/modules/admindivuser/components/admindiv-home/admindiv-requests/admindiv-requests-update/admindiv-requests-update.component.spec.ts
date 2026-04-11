import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsUpdateComponent } from './admindiv-requests-update.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivRequestsUpdateComponent', () => {
  let component: AdmindivRequestsUpdateComponent;
  let fixture: ComponentFixture<AdmindivRequestsUpdateComponent>;
  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsUpdateComponent],
      providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
