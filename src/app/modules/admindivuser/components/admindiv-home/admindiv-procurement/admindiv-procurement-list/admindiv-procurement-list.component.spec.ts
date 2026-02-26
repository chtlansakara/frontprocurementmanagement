import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivProcurementListComponent } from './admindiv-procurement-list.component';

describe('AdmindivProcurementListComponent', () => {
  let component: AdmindivProcurementListComponent;
  let fixture: ComponentFixture<AdmindivProcurementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivProcurementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivProcurementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
