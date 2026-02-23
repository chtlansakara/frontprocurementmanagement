import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsComponent } from './admindiv-requests.component';

describe('AdmindivRequestsComponent', () => {
  let component: AdmindivRequestsComponent;
  let fixture: ComponentFixture<AdmindivRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
