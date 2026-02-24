import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsListApprovedComponent } from './supplies-requests-list-approved.component';

describe('SuppliesRequestsListApprovedComponent', () => {
  let component: SuppliesRequestsListApprovedComponent;
  let fixture: ComponentFixture<SuppliesRequestsListApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsListApprovedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsListApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
