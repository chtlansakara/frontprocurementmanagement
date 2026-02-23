import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivApproveComponent } from './admindiv-approve.component';

describe('AdmindivApproveComponent', () => {
  let component: AdmindivApproveComponent;
  let fixture: ComponentFixture<AdmindivApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivApproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
