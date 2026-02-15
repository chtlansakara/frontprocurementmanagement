import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivRequestsUpdateComponent } from './subdiv-requests-update.component';

describe('SubdivRequestsUpdateComponent', () => {
  let component: SubdivRequestsUpdateComponent;
  let fixture: ComponentFixture<SubdivRequestsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivRequestsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivRequestsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
