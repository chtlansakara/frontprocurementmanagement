import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateSubdivComponent } from './user-update-subdiv.component';

describe('UserUpdateSubdivComponent', () => {
  let component: UserUpdateSubdivComponent;
  let fixture: ComponentFixture<UserUpdateSubdivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateSubdivComponent]
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
