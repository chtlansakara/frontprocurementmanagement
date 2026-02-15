import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsViewComponent } from './subdiv-requests-view.component';

describe('SubdivRequestsViewComponent', () => {
  let component: SubdivRequestsViewComponent;
  let fixture: ComponentFixture<SubdivRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
