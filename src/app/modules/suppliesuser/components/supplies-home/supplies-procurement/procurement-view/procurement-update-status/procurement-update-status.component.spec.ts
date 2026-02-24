import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementUpdateStatusComponent } from './procurement-update-status.component';

describe('ProcurementUpdateStatusComponent', () => {
  let component: ProcurementUpdateStatusComponent;
  let fixture: ComponentFixture<ProcurementUpdateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcurementUpdateStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
