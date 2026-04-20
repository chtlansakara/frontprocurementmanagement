import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordSubdivComponent } from './change-password-subdiv.component';

describe('ChangePasswordSubdivComponent', () => {
  let component: ChangePasswordSubdivComponent;
  let fixture: ComponentFixture<ChangePasswordSubdivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordSubdivComponent]
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
