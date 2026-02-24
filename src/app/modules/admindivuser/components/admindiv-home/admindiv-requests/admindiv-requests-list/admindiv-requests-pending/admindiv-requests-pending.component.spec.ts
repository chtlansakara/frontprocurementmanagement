import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsPendingComponent } from './admindiv-requests-pending.component';

describe('AdmindivRequestsPendingComponent', () => {
  let component: AdmindivRequestsPendingComponent;
  let fixture: ComponentFixture<AdmindivRequestsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
