import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivUpdateComponent } from './subdiv-update.component';

describe('SubdivUpdateComponent', () => {
  let component: SubdivUpdateComponent;
  let fixture: ComponentFixture<SubdivUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
