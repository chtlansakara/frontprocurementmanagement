import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesProcurementComponent } from './supplies-procurement.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesProcurementComponent', () => {
  let component: SuppliesProcurementComponent;
  let fixture: ComponentFixture<SuppliesProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesProcurementComponent],
         schemas: [NO_ERRORS_SCHEMA]
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
