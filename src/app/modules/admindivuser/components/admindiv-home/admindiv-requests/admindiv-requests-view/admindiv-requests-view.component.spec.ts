import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsViewComponent } from './admindiv-requests-view.component';

describe('AdmindivRequestsViewComponent', () => {
  let component: AdmindivRequestsViewComponent;
  let fixture: ComponentFixture<AdmindivRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
