import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesRequestsFormComponent } from './supplies-requests-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SuppliesRequestsFormComponent', () => {
  let component: SuppliesRequestsFormComponent;
  let fixture: ComponentFixture<SuppliesRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliesRequestsFormComponent],
      providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
