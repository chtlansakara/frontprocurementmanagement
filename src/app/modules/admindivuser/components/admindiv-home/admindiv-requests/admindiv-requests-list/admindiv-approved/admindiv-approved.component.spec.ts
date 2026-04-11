import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivApprovedComponent } from './admindiv-approved.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivApprovedComponent', () => {
  let component: AdmindivApprovedComponent;
  let fixture: ComponentFixture<AdmindivApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivApprovedComponent],
       providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
