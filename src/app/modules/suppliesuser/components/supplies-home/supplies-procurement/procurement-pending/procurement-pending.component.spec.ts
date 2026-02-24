import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementPendingComponent } from './procurement-pending.component';

describe('ProcurementPendingComponent', () => {
  let component: ProcurementPendingComponent;
  let fixture: ComponentFixture<ProcurementPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcurementPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
