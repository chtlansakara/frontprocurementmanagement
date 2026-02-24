import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsListPendingComponent } from './supplies-requests-list-pending.component';

describe('SuppliesRequestsListPendingComponent', () => {
  let component: SuppliesRequestsListPendingComponent;
  let fixture: ComponentFixture<SuppliesRequestsListPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsListPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
