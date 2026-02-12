import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesProcurementComponent } from './supplies-procurement.component';

describe('SuppliesProcurementComponent', () => {
  let component: SuppliesProcurementComponent;
  let fixture: ComponentFixture<SuppliesProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesProcurementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
