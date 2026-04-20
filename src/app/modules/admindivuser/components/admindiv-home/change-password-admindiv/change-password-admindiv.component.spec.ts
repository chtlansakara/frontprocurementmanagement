import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordAdmindivComponent } from './change-password-admindiv.component';

describe('ChangePasswordAdmindivComponent', () => {
  let component: ChangePasswordAdmindivComponent;
  let fixture: ComponentFixture<ChangePasswordAdmindivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordAdmindivComponent]
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
