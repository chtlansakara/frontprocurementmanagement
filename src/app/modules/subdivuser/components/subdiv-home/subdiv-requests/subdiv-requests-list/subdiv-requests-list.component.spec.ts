import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsListComponent } from './subdiv-requests-list.component';

describe('SubdivRequestsListComponent', () => {
  let component: SubdivRequestsListComponent;
  let fixture: ComponentFixture<SubdivRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
