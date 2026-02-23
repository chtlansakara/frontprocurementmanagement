import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsListComponent } from './admindiv-requests-list.component';

describe('AdmindivRequestsListComponent', () => {
  let component: AdmindivRequestsListComponent;
  let fixture: ComponentFixture<AdmindivRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
