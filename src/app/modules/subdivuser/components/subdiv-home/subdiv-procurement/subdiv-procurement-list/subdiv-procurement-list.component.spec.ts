import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivProcurementListComponent } from './subdiv-procurement-list.component';

describe('SubdivProcurementListComponent', () => {
  let component: SubdivProcurementListComponent;
  let fixture: ComponentFixture<SubdivProcurementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivProcurementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivProcurementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
