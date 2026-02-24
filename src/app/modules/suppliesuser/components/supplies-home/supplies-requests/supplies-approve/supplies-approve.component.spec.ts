import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesApproveComponent } from './supplies-approve.component';

describe('SuppliesApproveComponent', () => {
  let component: SuppliesApproveComponent;
  let fixture: ComponentFixture<SuppliesApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesApproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
