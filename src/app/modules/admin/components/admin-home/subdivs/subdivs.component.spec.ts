import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivsComponent } from './subdivs.component';

describe('SubdivsComponent', () => {
  let component: SubdivsComponent;
  let fixture: ComponentFixture<SubdivsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
