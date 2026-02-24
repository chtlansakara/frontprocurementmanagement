import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsListAllComponent } from './supplies-requests-list-all.component';

describe('SuppliesRequestsListAllComponent', () => {
  let component: SuppliesRequestsListAllComponent;
  let fixture: ComponentFixture<SuppliesRequestsListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsListAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
