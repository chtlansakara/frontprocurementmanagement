import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsUpdateComponent } from './supplies-requests-update.component';

describe('SuppliesRequestsUpdateComponent', () => {
  let component: SuppliesRequestsUpdateComponent;
  let fixture: ComponentFixture<SuppliesRequestsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
