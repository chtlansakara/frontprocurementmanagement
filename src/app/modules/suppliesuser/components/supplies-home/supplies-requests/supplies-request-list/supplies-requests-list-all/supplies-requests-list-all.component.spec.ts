import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsListAllComponent } from './supplies-requests-list-all.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesRequestsListAllComponent', () => {
  let component: SuppliesRequestsListAllComponent;
  let fixture: ComponentFixture<SuppliesRequestsListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsListAllComponent],
      providers: [provideHttpClient()],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
