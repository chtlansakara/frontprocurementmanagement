import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateAdmindivComponent } from './user-update-admindiv.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('UserUpdateAdmindivComponent', () => {
  let component: UserUpdateAdmindivComponent;
  let fixture: ComponentFixture<UserUpdateAdmindivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateAdmindivComponent],
      providers: [
        provideHttpClient(),

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateAdmindivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
