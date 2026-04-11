import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivProcurementViewComponent } from './admindiv-procurement-view.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('AdmindivProcurementViewComponent', () => {
  let component: AdmindivProcurementViewComponent;
  let fixture: ComponentFixture<AdmindivProcurementViewComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivProcurementViewComponent],
       providers: [
        provideHttpClient(),
        {provide: ActivatedRoute, useValue: {snapshot: {params: {id: mockId}}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivProcurementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
