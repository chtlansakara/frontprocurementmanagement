import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateFormComponent } from './user-update-form.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserUpdateFormComponent', () => {
  let component: UserUpdateFormComponent;
  let fixture: ComponentFixture<UserUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateFormComponent],
       providers: [
        provideHttpClient(),

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
