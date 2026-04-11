import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesLogsComponent } from './supplies-logs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesLogsComponent', () => {
  let component: SuppliesLogsComponent;
  let fixture: ComponentFixture<SuppliesLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesLogsComponent],
         schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
