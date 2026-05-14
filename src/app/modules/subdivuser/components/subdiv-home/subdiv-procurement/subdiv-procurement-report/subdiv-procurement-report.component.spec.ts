import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementReportComponent } from './subdiv-procurement-report.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivProcurementReportComponent', () => {
  let component: SubdivProcurementReportComponent;
  let fixture: ComponentFixture<SubdivProcurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementReportComponent],
            providers: [
        provideHttpClient(),

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivProcurementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
