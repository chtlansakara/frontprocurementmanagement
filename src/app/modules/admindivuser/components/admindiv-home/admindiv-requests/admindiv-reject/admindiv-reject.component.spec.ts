import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRejectComponent } from './admindiv-reject.component';

describe('AdmindivRejectComponent', () => {
  let component: AdmindivRejectComponent;
  let fixture: ComponentFixture<AdmindivRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRejectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
