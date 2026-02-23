import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsFormComponent } from './admindiv-requests-form.component';

describe('AdmindivRequestsFormComponent', () => {
  let component: AdmindivRequestsFormComponent;
  let fixture: ComponentFixture<AdmindivRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
