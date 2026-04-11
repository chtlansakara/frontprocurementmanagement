import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementReportComponent } from './subdiv-procurement-report.component';

describe('SubdivProcurementReportComponent', () => {
  let component: SubdivProcurementReportComponent;
  let fixture: ComponentFixture<SubdivProcurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementReportComponent]
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
