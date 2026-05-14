import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordAdmindivComponent } from './change-password-admindiv.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChangePasswordAdmindivComponent', () => {
  let component: ChangePasswordAdmindivComponent;
  let fixture: ComponentFixture<ChangePasswordAdmindivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordAdmindivComponent],
             providers: [
          provideHttpClient(),

        ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordAdmindivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
