import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRejectedComponent } from './admindiv-rejected.component';

describe('AdmindivRejectedComponent', () => {
  let component: AdmindivRejectedComponent;
  let fixture: ComponentFixture<AdmindivRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
