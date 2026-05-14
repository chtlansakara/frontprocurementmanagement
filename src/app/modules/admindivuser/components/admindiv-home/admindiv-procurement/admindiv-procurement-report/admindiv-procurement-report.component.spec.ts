import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivProcurementReportComponent } from './admindiv-procurement-report.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivProcurementReportComponent', () => {
  let component: AdmindivProcurementReportComponent;
  let fixture: ComponentFixture<AdmindivProcurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivProcurementReportComponent],
                  providers: [
          provideHttpClient(),

        ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivProcurementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
