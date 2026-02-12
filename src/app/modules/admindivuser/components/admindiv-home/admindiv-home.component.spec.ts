import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivHomeComponent } from './admindiv-home.component';

describe('AdmindivHomeComponent', () => {
  let component: AdmindivHomeComponent;
  let fixture: ComponentFixture<AdmindivHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
