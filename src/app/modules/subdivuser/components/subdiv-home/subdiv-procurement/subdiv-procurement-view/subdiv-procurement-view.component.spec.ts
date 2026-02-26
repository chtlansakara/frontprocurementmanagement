import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementViewComponent } from './subdiv-procurement-view.component';

describe('SubdivProcurementViewComponent', () => {
  let component: SubdivProcurementViewComponent;
  let fixture: ComponentFixture<SubdivProcurementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivProcurementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
