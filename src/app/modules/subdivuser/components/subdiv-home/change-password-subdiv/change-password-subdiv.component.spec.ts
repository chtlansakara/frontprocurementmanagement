import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordSubdivComponent } from './change-password-subdiv.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChangePasswordSubdivComponent', () => {
  let component: ChangePasswordSubdivComponent;
  let fixture: ComponentFixture<ChangePasswordSubdivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordSubdivComponent],
      providers: [
          provideHttpClient(),

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordSubdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
