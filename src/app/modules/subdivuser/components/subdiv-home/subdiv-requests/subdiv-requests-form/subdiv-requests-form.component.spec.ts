import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsFormComponent } from './subdiv-requests-form.component';

describe('SubdivRequestsFormComponent', () => {
  let component: SubdivRequestsFormComponent;
  let fixture: ComponentFixture<SubdivRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
