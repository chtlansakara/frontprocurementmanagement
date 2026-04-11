import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivUpdateComponent } from './admindiv-update.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdmindivUpdateComponent', () => {
  let component: AdmindivUpdateComponent;
  let fixture: ComponentFixture<AdmindivUpdateComponent>;

  const mockId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivUpdateComponent],
          providers: [
          provideHttpClient(),
          {provide: ActivatedRoute, useValue: {snapshot:{params: {id: mockId}}}}
        ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
