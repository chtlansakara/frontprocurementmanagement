import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivListComponent } from './subdiv-list.component';

describe('SubdivListComponent', () => {
  let component: SubdivListComponent;
  let fixture: ComponentFixture<SubdivListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
