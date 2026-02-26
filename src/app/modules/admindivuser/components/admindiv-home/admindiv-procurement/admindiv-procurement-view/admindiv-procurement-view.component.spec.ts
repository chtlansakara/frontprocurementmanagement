import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivProcurementViewComponent } from './admindiv-procurement-view.component';

describe('AdmindivProcurementViewComponent', () => {
  let component: AdmindivProcurementViewComponent;
  let fixture: ComponentFixture<AdmindivProcurementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivProcurementViewComponent]
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
