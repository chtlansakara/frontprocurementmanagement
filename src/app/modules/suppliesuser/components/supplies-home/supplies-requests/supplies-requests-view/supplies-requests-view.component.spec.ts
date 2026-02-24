import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsViewComponent } from './supplies-requests-view.component';

describe('SuppliesRequestsViewComponent', () => {
  let component: SuppliesRequestsViewComponent;
  let fixture: ComponentFixture<SuppliesRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
