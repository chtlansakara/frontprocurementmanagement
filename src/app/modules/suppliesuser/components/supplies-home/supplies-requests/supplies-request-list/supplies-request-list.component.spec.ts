import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestListComponent } from './supplies-request-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesRequestListComponent', () => {
  let component: SuppliesRequestListComponent;
  let fixture: ComponentFixture<SuppliesRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
