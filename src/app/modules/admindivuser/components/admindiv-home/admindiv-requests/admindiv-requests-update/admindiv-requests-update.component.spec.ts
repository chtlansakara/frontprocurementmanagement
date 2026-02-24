import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindivRequestsUpdateComponent } from './admindiv-requests-update.component';

describe('AdmindivRequestsUpdateComponent', () => {
  let component: AdmindivRequestsUpdateComponent;
  let fixture: ComponentFixture<AdmindivRequestsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindivRequestsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindivRequestsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
