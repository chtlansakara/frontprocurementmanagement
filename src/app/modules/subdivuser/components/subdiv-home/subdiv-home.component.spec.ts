import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivHomeComponent } from './subdiv-home.component';

describe('SubdivHomeComponent', () => {
  let component: SubdivHomeComponent;
  let fixture: ComponentFixture<SubdivHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
