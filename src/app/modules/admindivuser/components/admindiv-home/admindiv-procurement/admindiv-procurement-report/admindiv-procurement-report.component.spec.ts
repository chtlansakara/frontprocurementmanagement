import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivProcurementReportComponent } from './admindiv-procurement-report.component';

describe('AdmindivProcurementReportComponent', () => {
  let component: AdmindivProcurementReportComponent;
  let fixture: ComponentFixture<AdmindivProcurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivProcurementReportComponent]
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
