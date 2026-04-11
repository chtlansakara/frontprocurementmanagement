import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRejectComponent } from './admindiv-reject.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('AdmindivRejectComponent', () => {
  let component: AdmindivRejectComponent;
  let fixture: ComponentFixture<AdmindivRejectComponent>;

  const mockId = 1 ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRejectComponent],
      providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: mockId}}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
