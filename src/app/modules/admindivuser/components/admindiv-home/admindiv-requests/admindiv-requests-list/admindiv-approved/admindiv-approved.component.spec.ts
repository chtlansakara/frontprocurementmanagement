import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivApprovedComponent } from './admindiv-approved.component';

describe('AdmindivApprovedComponent', () => {
  let component: AdmindivApprovedComponent;
  let fixture: ComponentFixture<AdmindivApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivApprovedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
