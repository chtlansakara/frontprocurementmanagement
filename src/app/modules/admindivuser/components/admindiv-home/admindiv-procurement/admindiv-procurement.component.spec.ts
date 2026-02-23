import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivProcurementComponent } from './admindiv-procurement.component';

describe('AdmindivProcurementComponent', () => {
  let component: AdmindivProcurementComponent;
  let fixture: ComponentFixture<AdmindivProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivProcurementComponent]
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
