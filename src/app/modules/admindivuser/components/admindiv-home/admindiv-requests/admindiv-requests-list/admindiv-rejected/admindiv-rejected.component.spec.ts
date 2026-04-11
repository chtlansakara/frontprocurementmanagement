import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRejectedComponent } from './admindiv-rejected.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivRejectedComponent', () => {
  let component: AdmindivRejectedComponent;
  let fixture: ComponentFixture<AdmindivRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRejectedComponent],
       providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
