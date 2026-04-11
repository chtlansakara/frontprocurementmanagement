import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsComponent } from './supplies-requests.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesRequestsComponent', () => {
  let component: SuppliesRequestsComponent;
  let fixture: ComponentFixture<SuppliesRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
