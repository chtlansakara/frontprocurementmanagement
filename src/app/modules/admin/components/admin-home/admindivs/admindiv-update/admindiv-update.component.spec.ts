import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivUpdateComponent } from './admindiv-update.component';

describe('AdmindivUpdateComponent', () => {
  let component: AdmindivUpdateComponent;
  let fixture: ComponentFixture<AdmindivUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
