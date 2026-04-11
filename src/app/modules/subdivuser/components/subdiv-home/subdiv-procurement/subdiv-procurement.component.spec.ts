import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementComponent } from './subdiv-procurement.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SubdivProcurementComponent', () => {
  let component: SubdivProcurementComponent;
  let fixture: ComponentFixture<SubdivProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
