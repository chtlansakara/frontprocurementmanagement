import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivFormComponent } from './subdiv-form.component';

describe('SubdivFormComponent', () => {
  let component: SubdivFormComponent;
  let fixture: ComponentFixture<SubdivFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
