import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsListRejectedComponent } from './supplies-requests-list-rejected.component';

describe('SuppliesRequestsListRejectedComponent', () => {
  let component: SuppliesRequestsListRejectedComponent;
  let fixture: ComponentFixture<SuppliesRequestsListRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsListRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsListRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
