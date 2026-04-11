import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsPendingComponent } from './admindiv-requests-pending.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivRequestsPendingComponent', () => {
  let component: AdmindivRequestsPendingComponent;
  let fixture: ComponentFixture<AdmindivRequestsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsPendingComponent],
      providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
