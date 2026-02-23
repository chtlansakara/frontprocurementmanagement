import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivAllComponent } from './admindiv-all.component';

describe('AdmindivAllComponent', () => {
  let component: AdmindivAllComponent;
  let fixture: ComponentFixture<AdmindivAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
