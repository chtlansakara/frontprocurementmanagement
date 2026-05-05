import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutBoxComponent } from './signout-box.component';

describe('SignoutBoxComponent', () => {
  let component: SignoutBoxComponent;
  let fixture: ComponentFixture<SignoutBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignoutBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignoutBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
