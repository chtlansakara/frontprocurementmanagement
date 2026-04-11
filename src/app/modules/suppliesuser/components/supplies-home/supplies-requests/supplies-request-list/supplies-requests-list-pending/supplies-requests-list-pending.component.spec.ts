import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsListPendingComponent } from './supplies-requests-list-pending.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesRequestsListPendingComponent', () => {
  let component: SuppliesRequestsListPendingComponent;
  let fixture: ComponentFixture<SuppliesRequestsListPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsListPendingComponent],
      providers: [provideHttpClient()],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
