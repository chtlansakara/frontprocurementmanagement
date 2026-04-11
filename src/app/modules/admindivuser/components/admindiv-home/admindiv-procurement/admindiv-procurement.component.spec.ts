import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivProcurementComponent } from './admindiv-procurement.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivProcurementComponent', () => {
  let component: AdmindivProcurementComponent;
  let fixture: ComponentFixture<AdmindivProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivProcurementComponent],
         schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
