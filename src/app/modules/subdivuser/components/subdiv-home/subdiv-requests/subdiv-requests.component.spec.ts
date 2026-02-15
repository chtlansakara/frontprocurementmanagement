import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsComponent } from './subdiv-requests.component';

describe('SubdivRequestsComponent', () => {
  let component: SubdivRequestsComponent;
  let fixture: ComponentFixture<SubdivRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
