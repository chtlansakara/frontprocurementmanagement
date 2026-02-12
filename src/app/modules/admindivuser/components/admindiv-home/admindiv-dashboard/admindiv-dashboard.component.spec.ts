import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivDashboardComponent } from './admindiv-dashboard.component';

describe('AdmindivDashboardComponent', () => {
  let component: AdmindivDashboardComponent;
  let fixture: ComponentFixture<AdmindivDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
