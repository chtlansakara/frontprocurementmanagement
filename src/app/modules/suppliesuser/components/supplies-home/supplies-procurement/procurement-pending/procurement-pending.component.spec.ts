import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementPendingComponent } from './procurement-pending.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProcurementPendingComponent', () => {
  let component: ProcurementPendingComponent;
  let fixture: ComponentFixture<ProcurementPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcurementPendingComponent],
      providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
