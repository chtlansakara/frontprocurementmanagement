import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsListComponent } from './admindiv-requests-list.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivRequestsListComponent', () => {
  let component: AdmindivRequestsListComponent;
  let fixture: ComponentFixture<AdmindivRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsListComponent],
       providers: [
        provideHttpClient()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
