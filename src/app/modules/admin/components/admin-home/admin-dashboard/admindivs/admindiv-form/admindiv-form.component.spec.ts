import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivFormComponent } from './admindiv-form.component';

describe('AdmindivFormComponent', () => {
  let component: AdmindivFormComponent;
  let fixture: ComponentFixture<AdmindivFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
