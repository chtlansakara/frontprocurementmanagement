import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivDashboardComponent } from './subdiv-dashboard.component';

describe('SubdivDashboardComponent', () => {
  let component: SubdivDashboardComponent;
  let fixture: ComponentFixture<SubdivDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
