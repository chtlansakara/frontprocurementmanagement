import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsFormComponent } from './admindiv-requests-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivRequestsFormComponent', () => {
  let component: AdmindivRequestsFormComponent;
  let fixture: ComponentFixture<AdmindivRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsFormComponent],
         providers: [
        provideHttpClient(),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
