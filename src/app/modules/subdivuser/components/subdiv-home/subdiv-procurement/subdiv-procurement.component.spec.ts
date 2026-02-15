import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementComponent } from './subdiv-procurement.component';

describe('SubdivProcurementComponent', () => {
  let component: SubdivProcurementComponent;
  let fixture: ComponentFixture<SubdivProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
