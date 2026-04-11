import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesReportsComponent } from './supplies-reports.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesReportsComponent', () => {
  let component: SuppliesReportsComponent;
  let fixture: ComponentFixture<SuppliesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesReportsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
