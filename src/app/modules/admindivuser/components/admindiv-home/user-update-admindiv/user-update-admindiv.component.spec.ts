import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateAdmindivComponent } from './user-update-admindiv.component';

describe('UserUpdateAdmindivComponent', () => {
  let component: UserUpdateAdmindivComponent;
  let fixture: ComponentFixture<UserUpdateAdmindivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateAdmindivComponent]
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
