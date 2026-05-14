import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateSubdivComponent } from './user-update-subdiv.component';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('UserUpdateSubdivComponent', () => {
  let component: UserUpdateSubdivComponent;
  let fixture: ComponentFixture<UserUpdateSubdivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateSubdivComponent],
            providers: [
        provideHttpClient(),

      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateSubdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
