import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceUpdateFormComponent } from './source-update-form.component';

describe('SourceUpdateFormComponent', () => {
  let component: SourceUpdateFormComponent;
  let fixture: ComponentFixture<SourceUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
